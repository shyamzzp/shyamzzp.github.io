/* elfindr service worker — offline app shell + asset caching.
 *
 * Scope is whatever path this file is served from (/elfindr/sw.js → scope
 * /elfindr/), so the same file works for every deploy path without edits.
 *
 * Strategy:
 *   • navigations  → network-first, fall back to the cached app shell offline.
 *   • static build assets (_next/static, icons, manifest) → stale-while-revalidate.
 *   • everything else (Supabase API, HF media, cross-origin) → passthrough; the
 *     app already caches media via HTTP headers and API responses must stay live.
 */
const VERSION = "elfindr-v1";
const SHELL = VERSION + "-shell";
const ASSETS = VERSION + "-assets";
// Directory this SW is scoped to, e.g. "/elfindr/".
const BASE = new URL("./", self.location).pathname;
const SHELL_URL = BASE; // the SPA entry (serves index.html)

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(SHELL).then((c) => c.add(new Request(SHELL_URL, { cache: "reload" }))).catch(() => {}),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== SHELL && k !== ASSETS).map((k) => caches.delete(k))),
    ).then(() => self.clients.claim()),
  );
});

const isAsset = (url) =>
  url.pathname.includes("/_next/static/") ||
  /\.(?:js|css|woff2?|png|jpg|jpeg|gif|svg|webp|avif|ico|webmanifest)$/.test(url.pathname);

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // Only handle our own origin + scope; let API/media/cross-origin hit the network.
  if (url.origin !== self.location.origin || !url.pathname.startsWith(BASE)) return;

  // App navigations: network-first, fall back to cache (offline shell).
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(SHELL).then((c) => c.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match(SHELL_URL))),
    );
    return;
  }

  // Static assets: serve from cache, revalidate in the background.
  if (isAsset(url)) {
    event.respondWith(
      caches.open(ASSETS).then((cache) =>
        cache.match(req).then((cached) => {
          const network = fetch(req)
            .then((res) => { if (res && res.status === 200) cache.put(req, res.clone()); return res; })
            .catch(() => cached);
          return cached || network;
        }),
      ),
    );
  }
});

// Let the page trigger an immediate activation after an update.
self.addEventListener("message", (e) => { if (e.data === "skip-waiting") self.skipWaiting(); });
