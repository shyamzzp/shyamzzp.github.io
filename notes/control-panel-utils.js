(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.NotesControlPanelUtils = api;
})(typeof window !== 'undefined' ? window : null, function () {
  function normalizePanelState(value) {
    return value === 'collapsed' ? 'collapsed' : 'expanded';
  }

  function nextPanelState(value) {
    return normalizePanelState(value) === 'collapsed' ? 'expanded' : 'collapsed';
  }

  function shouldPanelBeInert(isMobileLayout, isOpen) {
    return Boolean(isMobileLayout) && !Boolean(isOpen);
  }

  return { normalizePanelState, nextPanelState, shouldPanelBeInert };
});
