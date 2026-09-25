const assert = require('node:assert/strict');
const test = require('node:test');

const { normalizePanelState, nextPanelState, shouldPanelBeInert } = require('./control-panel-utils');

test('normalizes saved panel state to a safe desktop default', () => {
  assert.equal(normalizePanelState('collapsed'), 'collapsed');
  assert.equal(normalizePanelState('expanded'), 'expanded');
  assert.equal(normalizePanelState('unexpected'), 'expanded');
});

test('toggles between expanded and collapsed panel states', () => {
  assert.equal(nextPanelState('expanded'), 'collapsed');
  assert.equal(nextPanelState('collapsed'), 'expanded');
});

test('hides a closed mobile drawer from keyboard and assistive navigation', () => {
  assert.equal(shouldPanelBeInert(true, false), true);
  assert.equal(shouldPanelBeInert(true, true), false);
  assert.equal(shouldPanelBeInert(false, false), false);
});
