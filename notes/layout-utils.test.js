const assert = require('node:assert/strict');
const test = require('node:test');

const { shortcutMode, columnPlacements } = require('./layout-utils');

test('uses Command+Enter for fullscreen and Ctrl+Shift+Enter for column mode', () => {
  assert.equal(shortcutMode({ key: 'Enter', metaKey: true, ctrlKey: false, shiftKey: false, altKey: false }), 'fullscreen');
  assert.equal(shortcutMode({ key: 'Enter', metaKey: false, ctrlKey: true, shiftKey: true, altKey: false }), 'column');
});

test('does not claim ordinary Enter or Alt-modified Enter', () => {
  assert.equal(shortcutMode({ key: 'Enter', metaKey: false, ctrlKey: false, shiftKey: false, altKey: false }), null);
  assert.equal(shortcutMode({ key: 'Enter', metaKey: false, ctrlKey: true, shiftKey: false, altKey: true }), null);
});

test('makes the focused section a full-height first column and flows the rest rightward', () => {
  assert.deepEqual(columnPlacements(5, 0, 4), [
    { column: 1, row: 1, rowSpan: 4 },
    { column: 2, row: 1, rowSpan: 1 },
    { column: 2, row: 2, rowSpan: 1 },
    { column: 2, row: 3, rowSpan: 1 },
    { column: 2, row: 4, rowSpan: 1 }
  ]);
});

test('keeps a non-first focused section in the first visible column', () => {
  const placements = columnPlacements(6, 4, 4);
  assert.deepEqual(placements[4], { column: 1, row: 1, rowSpan: 4 });
  assert.deepEqual(placements[0], { column: 2, row: 1, rowSpan: 1 });
  assert.deepEqual(placements[5], { column: 3, row: 1, rowSpan: 1 });
});
