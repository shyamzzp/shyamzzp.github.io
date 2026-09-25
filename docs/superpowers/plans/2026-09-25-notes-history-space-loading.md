# Notes History and Space Loading Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add board-level Undo/Redo and a centered loading modal while changing notes spaces.

**Architecture:** A small browser/CommonJS history utility owns immutable snapshot stacks and platform shortcut classification. The existing `/notes` script records snapshots before persisted board mutations, applies restored snapshots without recording again, and shows a presentation-only modal during asynchronous space loads.

**Tech Stack:** Static HTML, browser DOM APIs, Node built-in test runner.

---

### Task 1: Add tested history primitives

**Files:**
- Create: `public/notes/history-utils.js`
- Create: `public/notes/history-utils.test.js`
- Modify: `package.json`

- [ ] **Step 1: Write failing tests**

```js
const history = createHistory({ notes: [{ text: 'before' }] });
history.record({ notes: [{ text: 'after' }] });
assert.deepEqual(history.undo(), { notes: [{ text: 'before' }] });
assert.deepEqual(history.redo(), { notes: [{ text: 'after' }] });
assert.equal(historyShortcut({ key: 'z', ctrlKey: true, metaKey: false, shiftKey: false }), 'undo');
assert.equal(historyShortcut({ key: 'y', ctrlKey: true, metaKey: false, shiftKey: false }), 'redo');
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test public/notes/history-utils.test.js`

Expected: FAIL because the utility module does not exist.

- [ ] **Step 3: Implement minimal snapshot history**

Implement `createHistory(initialState)`, `record(state)`, `undo()`, `redo()`, and `historyShortcut(event)`. Deep-clone snapshots with JSON serialization; recording after an undo clears the redo stack. Export CommonJS and attach `window.NotesHistoryUtils` for `/notes`.

- [ ] **Step 4: Verify and commit**

Run: `node --test public/notes/history-utils.test.js`

Expected: PASS.

```bash
git add package.json public/notes/history-utils.js public/notes/history-utils.test.js
git commit -m "test: cover notes history utilities"
```

### Task 2: Wire history into the notes board

**Files:**
- Modify: `public/notes/index.html`

- [ ] **Step 1: Load utilities and initialize per-space history**

Add `<script src="history-utils.js"></script>` before the inline script. Create board-history state, a restore guard, and a 600ms typing-burst timer. Initialize a fresh history from `currentState()` after a space loads.

- [ ] **Step 2: Record board mutations before persistence**

Use one `recordHistory()` helper before all state-changing calls that already trigger `autoSave()`: text/title input batches, color selection, strikethrough, split mode/size, reorder, per-section/global font controls, card height, theme/font family, and clear-all. The restore guard prevents `applyState()` from creating a history entry.

- [ ] **Step 3: Add global Undo/Redo shortcuts**

At document level, use `historyShortcut(event)`, prevent the browser default, apply the returned snapshot, and call `autoSave()`. Support Command and Ctrl paths; use Command/Ctrl+Shift+Z and Ctrl+Y for redo.

- [ ] **Step 4: Verify board history source paths**

Run: `node --test public/notes/history-utils.test.js && git diff --check`

Expected: PASS with no whitespace errors.

### Task 3: Show the space-switch loading modal

**Files:**
- Modify: `public/notes/index.html`

- [ ] **Step 1: Add overlay markup and styles**

Create a fixed centered modal with `role="status"`, spinner, and live loading message. It visually blocks interaction but does not affect saved state.

- [ ] **Step 2: Wrap asynchronous space loading**

In `openSpaceBySlug`, show the overlay only when changing from one loaded space to another, set its message to the selected title, and hide it in a `finally` block after state application or any failure.

- [ ] **Step 3: Reset history only after a successful new board load**

After `applyState()` and UI updates finish, seed history from the loaded board. Do not retain Undo/Redo entries across spaces.

- [ ] **Step 4: Launch local verification**

Run: `pnpm test:notes-history && pnpm build`, then start the local app and open `/notes`. Do not run `pnpm run deploy`.
