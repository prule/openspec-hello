## Why
Users track time-sensitive work, but today a task has no deadline and nothing prompts the user when one slips past. Due dates plus an overdue reminder close that gap.

## What Changes
- A task can carry an optional due date, which can be set or cleared.
- The system treats an open task as `overdue` once its due date has passed; a task with no due date, or one already completed, is never overdue.
- The `notifications` capability sends the task's owner a one-time reminder when one of their tasks becomes overdue.

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `tasks`: gains an optional due date and a derived `overdue` status.
- `notifications`: gains an overdue-task reminder.

## Impact
- This change spans two capabilities (`tasks` and `notifications`); archiving it updates both main specs from a single proposal. `users` is unchanged.
- `app.js`: task records gain a `dueDate`; a reminder sweep notifies owners of overdue open tasks, at most once per task.
