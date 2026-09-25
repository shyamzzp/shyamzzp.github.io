const assert = require('node:assert/strict');
const test = require('node:test');

const { createHistory, historyShortcut } = require('./history-utils');

test('undo and redo restore immutable board snapshots', () => {
  const history = createHistory({ notes: [{ text: 'before' }] });
  history.record({ notes: [{ text: 'after' }] });

  assert.deepEqual(history.undo(), { notes: [{ text: 'before' }] });
  assert.deepEqual(history.redo(), { notes: [{ text: 'after' }] });
});

test('a new edit after undo clears redo history', () => {
  const history = createHistory({ notes: [{ text: 'first' }] });
  history.record({ notes: [{ text: 'second' }] });
  history.undo();
  history.record({ notes: [{ text: 'replacement' }] });

  assert.equal(history.redo(), null);
  assert.deepEqual(history.undo(), { notes: [{ text: 'first' }] });
});

test('recognizes macOS and Windows/Linux undo redo shortcuts', () => {
  assert.equal(historyShortcut({ key: 'z', metaKey: true, ctrlKey: false, shiftKey: false, altKey: false }), 'undo');
  assert.equal(historyShortcut({ key: 'z', metaKey: false, ctrlKey: true, shiftKey: true, altKey: false }), 'redo');
  assert.equal(historyShortcut({ key: 'y', metaKey: false, ctrlKey: true, shiftKey: false, altKey: false }), 'redo');
  assert.equal(historyShortcut({ key: 'z', metaKey: false, ctrlKey: false, shiftKey: false, altKey: false }), null);
});
