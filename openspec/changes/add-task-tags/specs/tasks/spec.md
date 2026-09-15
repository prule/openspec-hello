## ADDED Requirements

### Requirement: Tag a task
The system SHALL allow a user to attach zero or more free-text tags to a task they own. Each tag MUST be a non-empty string, and duplicate tags on the same task MUST be ignored.

#### Scenario: Add a tag to a task
- **WHEN** a user adds the tag "home" to their task
- **THEN** the task's tags include "home"

#### Scenario: Adding a duplicate tag
- **WHEN** a user adds the tag "home" to a task that already has "home"
- **THEN** the task's tags still contain exactly one "home"

#### Scenario: Reject an empty tag
- **WHEN** a user adds an empty tag to a task
- **THEN** the system rejects the request with a validation error and the task's tags are unchanged

### Requirement: Filter tasks by tag
The system SHALL allow a user to list only their tasks that carry a specified tag.

#### Scenario: Filter to a tag
- **WHEN** a user lists tasks filtered by tag "home"
- **THEN** the system returns only that user's tasks tagged "home"

#### Scenario: Filter with no matches
- **WHEN** a user filters by a tag none of their tasks carry
- **THEN** the system returns an empty list
