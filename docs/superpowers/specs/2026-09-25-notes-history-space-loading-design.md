# Notes History and Space Loading Design

## Goal

Add cross-platform board-level Undo/Redo to `/notes` and make switching spaces
show a centered loading state until the destination board is ready.

## Board History

Each open space owns an in-memory history stack. `Command+Z` on macOS and
`Ctrl+Z` on Windows/Linux restores the preceding board snapshot. Redo uses
`Command+Shift+Z`, `Ctrl+Shift+Z`, or `Ctrl+Y`.

History covers note text and titles, colors, card strikethrough, splits,
reordering, per-card and global font settings, card height, and clear-all.
Typing is grouped into short editing bursts so a normal sentence is undone as a
single action rather than character by character. Restoring a snapshot updates
the current board and schedules normal persistence without creating another
history entry. Histories are reset when a different space opens, preventing an
undo from changing data in another space.

## Space-Switch Loading State

When navigating from one open space to another, the app displays a centered,
blocking modal with a spinner and the destination space title. It remains on
screen while PocketBase data is fetched and applied, then closes only after the
new board and label are ready. The modal also closes on load failure, leaving
the existing error-status path intact.

## Verification

Automated tests cover history-stack transitions and platform shortcut
classification. Local verification confirms that undo/redo works with both
Command and Ctrl variants and that a space switch exposes the loading modal for
the duration of an asynchronous load. This change is launched locally only and
is not deployed.
