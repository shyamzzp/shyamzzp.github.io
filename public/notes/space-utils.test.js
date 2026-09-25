const assert = require('node:assert/strict');
const test = require('node:test');

const { savedCardCount, boardSavePayload } = require('./space-utils');

test('derives sidebar card counts from persisted board data when metadata is stale', () => {
  const board = JSON.stringify({
    notes: [
      { title: 'Project', text: 'Keep this card' },
      { title: '', text: '' },
      { title: '', text: '', color: 'blue' }
    ]
  });

  assert.equal(savedCardCount(board), 2);
});

test('normal board saves never include space metadata that could overwrite a rename', () => {
  const state = { notes: [{ title: 'A', text: 'content' }] };
  const payload = boardSavePayload(state, 1);

  assert.deepEqual(payload, { data: JSON.stringify(state), cards: 1 });
  assert.equal(Object.hasOwn(payload, 'title'), false);
  assert.equal(Object.hasOwn(payload, 'slug'), false);
  assert.equal(Object.hasOwn(payload, 'kind'), false);
});
