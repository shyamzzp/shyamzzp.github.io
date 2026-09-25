(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.NotesLayoutUtils = api;
})(typeof window !== 'undefined' ? window : null, function () {
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
      placements[index] = {
        column: 2 + Math.floor(position / rows),
        row: 1 + (position % rows),
        rowSpan: 1
      };
      position += 1;
    }

    return placements;
  }

  return { shortcutMode, columnPlacements };
});
