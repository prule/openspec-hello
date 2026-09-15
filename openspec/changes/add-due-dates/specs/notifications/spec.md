## ADDED Requirements

### Requirement: Remind on overdue tasks
The system SHALL send the owning user a notification when one of their tasks becomes overdue, and MUST NOT send more than one overdue reminder for the same task.

#### Scenario: First time a task is overdue
- **WHEN** a reminder sweep runs and a user's open task is overdue with no prior reminder
- **THEN** the user receives a notification naming that task

#### Scenario: Task already reminded
- **WHEN** a reminder sweep runs and the overdue task has already triggered a reminder
- **THEN** no additional notification is sent for that task
