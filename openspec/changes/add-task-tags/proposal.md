## Why
As task lists grow, users need a lightweight way to group and find related tasks without setting up rigid projects or folders. Free-text tags give that grouping with almost no ceremony.

## What Changes
- Users can attach one or more free-text tags to a task they own.
- Users can filter their task list to only the tasks carrying a given tag.

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `tasks`: gains tagging of tasks and tag-based filtering of the task list.

## Impact
- Scoped to the `tasks` capability only; `users` and `notifications` are untouched.
- `app.js`: task records gain a `tags` array; the list operation accepts an optional tag filter.
