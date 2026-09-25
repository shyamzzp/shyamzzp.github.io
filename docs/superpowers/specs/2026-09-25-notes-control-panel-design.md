# Notes Control Panel Design

## Goal

Replace the crowded horizontal `/notes` toolbar with a compact, high-contrast
left control panel so the board receives the remaining workspace width.

## Desktop Layout

The control panel is a 260px vertical rail containing grouped controls for
space, search, view, formatting, and file/account actions. It has its own
vertical scroll for overflow. The notes grid occupies the full remaining width
and keeps its existing board and focus-layout behavior.

The rail includes a collapse control. Collapsed desktop state reduces to a
narrow icon rail; controls remain keyboard-accessible and use title/aria labels.

## Responsive and Theme Behavior

At the mobile breakpoint, the panel becomes a slide-out overlay, preserving
the entire viewport for notes. All controls use the existing theme variables
with raised contrast for button text, labels, separators, and form borders in
dark themes.

## Scope

Existing control IDs and event handlers remain intact. This is a structural and
visual rearrangement only: no note data, shortcut, space, undo, or persistence
behavior changes. The implementation remains local-only until explicitly
approved for deployment.
