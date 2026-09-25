# Notes Control Panel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the crowded notes toolbar with a high-contrast, collapsible left control panel.

**Architecture:** Preserve all existing element IDs and event bindings while changing only the surrounding layout and visual styles. A small utility will normalize persisted expanded/collapsed panel state; CSS handles desktop rail and mobile overlay behavior.

**Tech Stack:** Static HTML, CSS, browser DOM APIs, Node built-in test runner.

---

### Task 1: Test panel-state utility

**Files:**
- Create: `public/notes/control-panel-utils.js`
- Create: `public/notes/control-panel-utils.test.js`
- Modify: `package.json`

- [ ] **Step 1: Write failing tests**

```js
assert.equal(normalizePanelState('collapsed'), 'collapsed');
assert.equal(normalizePanelState('unknown'), 'expanded');
assert.equal(nextPanelState('expanded'), 'collapsed');
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test public/notes/control-panel-utils.test.js`

Expected: FAIL because the utility module does not exist.

- [ ] **Step 3: Implement and verify the utility**

Export `normalizePanelState()` and `nextPanelState()` for Node and attach them
as `window.NotesControlPanelUtils` for the page.

Run: `node --test public/notes/control-panel-utils.test.js`

Expected: PASS.

### Task 2: Restructure controls as a left panel

**Files:**
- Modify: `public/notes/index.html`

- [ ] **Step 1: Change the page shell and toolbar markup**

Wrap the toolbar and grid in an app shell. Keep every existing control ID and
its event handlers. Group controls with visible section labels: Space, Search,
View, Format, and File.

- [ ] **Step 2: Add high-contrast left-panel styles**

Use a 260px rail with vertical scrolling, stronger text/border contrast, and a
grid that fills the remaining page width. At 760px and below, change the rail
to an off-canvas panel with a compact toggle.

- [ ] **Step 3: Add collapsed state persistence**

Add a control that toggles `body.panel-collapsed`, saves the state to local
storage, and updates `aria-expanded`. Desktop collapse reduces the rail to a
narrow icon rail; mobile toggle opens/closes the panel.

- [ ] **Step 4: Verify locally without deployment**

Run: `pnpm test:notes-panel && pnpm test:notes-spaces && pnpm test:notes-history && pnpm test:notes-layout && pnpm build`

Expected: all focused tests PASS and CRA build completes. Keep localhost
running; do not push or deploy.
