## Context
See proposal.md — Why. This change touches two capabilities (`tasks` and
`notifications`), so a few decisions need to be settled before implementation to
keep them consistent.

## Goals / Non-Goals
- **Goal:** a task can carry a due date, "overdue" is derived consistently, and
  the owner is reminded exactly once when a task becomes overdue.
- **Non-Goal:** recurring due dates, time-of-day precision, time zones, or
  configurable reminder timing. Dates are whole calendar days.

## Decisions
- **Overdue is derived, not stored.** A task is overdue iff it is `open` and its
  due date is before today. Storing an `overdue` flag would drift as the clock
  advances; deriving it on read cannot. *Alternative considered:* a stored flag
  updated by the sweep — rejected because reads would be stale between sweeps.
- **De-duplicate reminders with a per-task marker.** The reminder sweep records
  that a task has been reminded (e.g. a `remindedOverdue` marker on the task) and
  skips tasks that carry it. *Alternative considered:* scanning notification
  history for a matching message — rejected as brittle and message-format
  dependent.
- **Reminders are pull-driven by a sweep**, not pushed the instant a date passes.
  A single `runOverdueReminders()` pass is simple to call from a scheduler or a
  test. *Alternative considered:* a timer per task — rejected as needless
  machinery for an in-memory demo.

## Risks / Trade-offs
- Clearing and re-setting a due date does not reset the reminder marker, so a
  task reminded once will not remind again even if re-dated. Acceptable for the
  demo; a real system might reset the marker when the due date changes.
