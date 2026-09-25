(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.NotesHistoryUtils = api;
})(typeof window !== 'undefined' ? window : null, function () {
  function clone(state) {
    return JSON.parse(JSON.stringify(state));
  }

  function createHistory(initialState) {
    let past = [clone(initialState)];
    let future = [];

    function record(state) {
      const next = clone(state);
      if (JSON.stringify(past[past.length - 1]) === JSON.stringify(next)) return;
      past.push(next);
      future = [];
    }

    function undo() {
      if (past.length < 2) return null;
      future.push(past.pop());
      return clone(past[past.length - 1]);
    }

    function redo() {
      if (!future.length) return null;
      const next = future.pop();
      past.push(next);
      return clone(next);
    }

    return { record, undo, redo };
  }

  function historyShortcut(event) {
    if (event.altKey || !(event.metaKey || event.ctrlKey)) return null;
    const key = String(event.key || '').toLowerCase();
    if (key === 'z') return event.shiftKey ? 'redo' : 'undo';
    if (key === 'y' && event.ctrlKey) return 'redo';
    return null;
  }

  return { createHistory, historyShortcut };
});
