# Notes Focus Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add cross-platform keyboard shortcuts that expand the focused `/notes` card to fullscreen or full-column height with animated, horizontally scrollable reflow.

**Architecture:** Keep note content and persistence unchanged. A small dependency-free layout utility will classify shortcuts and calculate CSS Grid placements; the existing static notes page will apply those placements as transient presentation state.

**Tech Stack:** Static HTML, CSS Grid, browser DOM APIs, Node built-in test runner.

---

### Task 1: Testable focus-layout utilities

**Files:**
- Create: `public/notes/layout-utils.js`
- Create: `public/notes/layout-utils.test.js`
- Modify: `package.json`

- [ ] **Step 1: Write failing utility tests**

```js
assert.equal(shortcutMode({ key: 'Enter', metaKey: true, ctrlKey: false, shiftKey: false, altKey: false }), 'fullscreen');
assert.equal(shortcutMode({ key: 'Enter', metaKey: false, ctrlKey: true, shiftKey: true, altKey: false }), 'column');
assert.equal(shortcutMode({ key: 'Enter', metaKey: false, ctrlKey: false, shiftKey: false, altKey: false }), null);
assert.deepEqual(columnPlacements(5, 0, 4)[0], { column: 1, row: 1, rowSpan: 4 });
assert.deepEqual(columnPlacements(5, 0, 4)[1], { column: 2, row: 1, rowSpan: 1 });
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test public/notes/layout-utils.test.js`

Expected: FAIL because the utility module does not exist.

- [ ] **Step 3: Implement the minimal CommonJS/browser utility**

```js
function shortcutMode(event) {
  if (event.key !== 'Enter' || event.altKey || !(event.metaKey || event.ctrlKey)) return null;
  return event.shiftKey ? 'column' : 'fullscreen';
}

function columnPlacements(total, focusedIndex, rows) {
  const placements = Array(total);
  placements[focusedIndex] = { column: 1, row: 1, rowSpan: rows };
  let position = 0;
  for (let index = 0; index < total; index += 1) {
    if (index === focusedIndex) continue;
    placements[index] = { column: 2 + Math.floor(position / rows), row: 1 + (position % rows), rowSpan: 1 };
    position += 1;
  }
  return placements;
}
```

Export through `module.exports` for Node and assign `window.NotesLayoutUtils` for the static page.

- [ ] **Step 4: Run the tests to verify they pass**

Run: `node --test public/notes/layout-utils.test.js`

Expected: PASS.

- [ ] **Step 5: Add `test:notes-layout` to `package.json` and commit**

```bash
git add package.json public/notes/layout-utils.js public/notes/layout-utils.test.js
git commit -m "test: cover notes focus layout utilities"
```

### Task 2: Apply focus layouts and shortcuts to the notes board

**Files:**
- Modify: `public/notes/index.html`

- [ ] **Step 1: Add layout CSS and the utility script**

Load `layout-utils.js` immediately before the inline notes script. Add styles for `.focus-fullscreen`, `.focus-column`, `.focus-selected`, and `.focus-hidden`. The full-column grid uses `--focus-column-width`, four `--card-h` rows, and `overflow-x: auto`; `prefers-reduced-motion` disables its animations.

- [ ] **Step 2: Add transient board-layout state**

Add `let focusLayout = null` with `setFocusLayout(index, mode, textarea)` and `clearFocusLayout()`. Fullscreen hides nonselected sections and changes the grid to one track. Column mode uses `columnPlacements(sections.length, index, COLS)` to set each card's `gridColumn`/`gridRow`, retains one normal card-column width, and spans the selected section across all four rows. Neither method updates the saved note state.

- [ ] **Step 3: Wire keyboard behavior and Escape restoration**

For every textarea, use `shortcutMode(event)`. Prevent the default newline only when it returns a mode; toggle that mode when the same card/mode is active, or switch to the requested mode otherwise. Refocus the originating textarea after layout changes. Escape exits either focus mode. Keep Tab and all existing shortcuts unchanged.

- [ ] **Step 4: Reapply transient layout after viewport resizing**

When a column-focus layout is active, recompute the CSS column width and placement after resize so the selected card still has one normal card width and the reflow remains horizontally scrollable.

- [ ] **Step 5: Verify the page source and commit**

Run: `node --test public/notes/layout-utils.test.js && git diff --check`

Expected: utility tests PASS and no whitespace errors.

```bash
git add public/notes/index.html
git commit -m "feat: add notes focus layouts"
```

### Task 3: Production verification and release

**Files:**
- Modify: `README.md` (only if the documented release command differs from the current package manager)

- [ ] **Step 1: Run focused and production checks**

Run: `pnpm test:notes-layout && pnpm build`

Expected: focus-layout tests PASS and the CRA production build completes.

- [ ] **Step 2: Manually verify `/notes` in a browser**

Confirm `Command+Enter` and `Command+Shift+Enter` on macOS and simulated `Ctrl+Enter` / `Ctrl+Shift+Enter` modifier paths toggle the correct mode; confirm Escape restores normal layout; confirm the column mode scrolls horizontally and keeps the selected card one normal column wide.

- [ ] **Step 3: Push and deploy**

```bash
git push origin main
pnpm deploy
```

Expected: `origin/main` contains the feature and `gh-pages` publishes the newly built site.
