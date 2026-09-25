# Notes Focus Layout Design

## Goal

Add keyboard-controlled focus layouts to `/notes` without changing note content,
ordering, persistence, or existing editing tools.

## Shortcuts

- `Command+Enter` on macOS and `Ctrl+Enter` on Windows/Linux toggles the focused
  note between the board and fullscreen editing mode.
- `Command+Shift+Enter` on macOS and `Ctrl+Shift+Enter` on Windows/Linux toggles
  the focused note between the board and full-column-height mode.
- The shortcuts are handled only while an editable note pane is focused, so they
  do not conflict with normal browser controls elsewhere on the page.

## Layout Modes

Normal mode remains the existing four-column, vertically scrollable board.

Fullscreen mode turns the focused section into a viewport-filling editor and
hides the rest of the board. The title, word count, editing controls, and note
content stay available. Leaving the mode restores the normal board position.

Full-column-height mode preserves the normal card-column width for the focused
section but makes it fill the notes workspace height. Every remaining section
is laid out as standard-height cards in columns to its right. The board becomes
horizontally scrollable; note data and logical order are never moved or mutated.
For the upper-left selected card, the next cards—including the original
"Linear Project" card and cards that were below the selected card—appear in the
following scrollable columns.

## Animation and Accessibility

Mode changes animate opacity and transform/size through CSS. Users who request
reduced motion receive the completed layout without animation. The focused
textarea remains focused after each change. Escape returns to normal layout as
an additional discoverable exit path.

## Verification

Automated checks cover keyboard-modifier detection and mode toggling. Manual
browser verification covers macOS Command and Windows/Linux Ctrl variants,
fullscreen restoration, full-column horizontal scrolling, and reduced-motion
behavior.
