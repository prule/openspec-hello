## Why
Tasks are often collaborative, but today a task is visible only to its single owner. Sharing lets an owner bring other people onto a task without giving up ownership.

## What Changes
- A task owner can add or remove other registered users as collaborators on a task.
- Listing tasks now returns tasks the user owns **and** tasks shared with them, with shared tasks marked as such (**MODIFIED** — this changes the existing "List tasks" behavior).
- Collaborator permissions are defined: a collaborator may view and complete a shared task, but only the owner may delete it or manage its collaborators.

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `tasks`: adds task sharing and broadens the existing "List tasks" requirement to include shared tasks.
- `users`: defines collaborator permissions relative to the owner.

## Impact
- This change spans two capabilities (`tasks` and `users`) and rewrites an existing requirement, so archiving reports `~ 1 modified` in the `tasks` main spec. `notifications` is unchanged.
- `app.js`: task records gain a `collaborators` list; the list operation unions owned and shared tasks.
