(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.NotesSpaceUtils = api;
})(typeof window !== 'undefined' ? window : null, function () {
  function asBoard(data) {
    if (typeof data === 'string') {
      try { return JSON.parse(data); } catch (error) { return {}; }
    }
    return data || {};
  }

  function noteHasContent(note) {
    if (!note) return false;
    return Boolean(
      String(note.title || '').trim() ||
      String(note.text || '').trim() ||
      String(note.text2 || '').trim() ||
      String(note.back || '').trim() ||
      note.color || note.struck || note.split
    );
  }

  function savedCardCount(data) {
    const board = asBoard(data);
    return Array.isArray(board.notes) ? board.notes.filter(noteHasContent).length : 0;
  }

  function boardSavePayload(state, cards) {
    return { data: JSON.stringify(state), cards: cards };
  }

  return { savedCardCount, boardSavePayload };
});
