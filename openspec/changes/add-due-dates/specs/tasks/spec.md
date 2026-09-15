## ADDED Requirements

### Requirement: Set a task due date
The system SHALL allow a user to set or clear an optional due date on a task they own. A due date MUST be a valid calendar date; clearing it returns the task to having no deadline.

#### Scenario: Set a due date
- **WHEN** a user sets the due date of their task to 2026-10-01
- **THEN** the task records a due date of 2026-10-01

#### Scenario: Clear a due date
- **WHEN** a user clears the due date of a task that has one
- **THEN** the task has no due date

#### Scenario: Reject an invalid date
- **WHEN** a user sets a due date that is not a valid calendar date
- **THEN** the system rejects the request with a validation error and the task's due date is unchanged

### Requirement: Report overdue tasks
The system SHALL treat a task as `overdue` when it is still `open` and its due date is earlier than the current date. A task with no due date is never overdue, and a completed task is never overdue.

#### Scenario: Open task past its due date
- **WHEN** an open task has a due date earlier than today
- **THEN** the system reports the task as overdue

#### Scenario: Completed task past its due date
- **WHEN** a `done` task has a due date earlier than today
- **THEN** the system does not report the task as overdue

#### Scenario: Task with no due date
- **WHEN** an open task has no due date
- **THEN** the system does not report the task as overdue
