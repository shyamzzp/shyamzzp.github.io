import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

const env = loadEnv();
const projectRef = env.SUPABASE_PROJECT_REF || "lpehkeyhpwxljdylbhkc";
const dbPassword = env.SUPABASE_DB_PASSWORD;

if (!dbPassword && !env.SUPABASE_DB_URL) {
  throw new Error("Missing SUPABASE_DB_PASSWORD or SUPABASE_DB_URL in .env");
}

const dbUrl =
  env.SUPABASE_DB_URL ||
  `postgresql://postgres:${encodeURIComponent(dbPassword)}@db.${projectRef}.supabase.co:5432/postgres?sslmode=require`;

const [command = "list", slug = ""] = process.argv.slice(2);

function loadEnv() {
  const output = { ...process.env };
  if (!existsSync(".env")) return output;

  for (const line of readFileSync(".env", "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match) continue;
    const [, key, rawValue] = match;
    output[key] = rawValue.replace(/^['"]|['"]$/g, "");
  }

  return output;
}

function sqlString(value) {
  return `'${String(value ?? "").replace(/'/g, "''")}'`;
}

function runSql(sql) {
  const result = spawnSync("psql", [dbUrl, "-v", "ON_ERROR_STOP=1", "-c", sql], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  });

  if (result.status !== 0) {
    process.stderr.write(result.stderr);
    process.exit(result.status || 1);
  }

  process.stdout.write(result.stdout);
}

if (command === "list") {
  runSql(`
    select slug, name, category, command_style, complexity, source
    from public.installr_catalog_items
    where review = false
    order by updated_at desc
    limit 40;
  `);
} else if (command === "approve" && slug) {
  runSql(`
    update public.installr_catalog_items
    set review = true,
        reviewed_at = now(),
        review_notes = coalesce(review_notes, '') || E'\\nApproved locally.'
    where slug = ${sqlString(slug)}
    returning slug, name, review, reviewed_at;
  `);
} else if (command === "reject" && slug) {
  runSql(`
    delete from public.installr_catalog_items
    where slug = ${sqlString(slug)} and review = false
    returning slug, name;
  `);
} else if (command === "approve-all") {
  runSql(`
    update public.installr_catalog_items
    set review = true,
        reviewed_at = now(),
        review_notes = coalesce(review_notes, '') || E'\\nBulk approved locally.'
    where review = false
    returning slug, name, review, reviewed_at;
  `);
} else {
  console.log("Usage:");
  console.log("  npm run installr:review -- list");
  console.log("  npm run installr:review -- approve <slug>");
  console.log("  npm run installr:review -- reject <slug>");
  console.log("  npm run installr:review -- approve-all");
}
