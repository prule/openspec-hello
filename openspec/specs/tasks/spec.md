# tasks Specification

## Purpose
Lets a user capture, review, and complete units of work ("tasks") so that nothing they intend to do is lost.

## Requirements

### Requirement: Create a task
The system SHALL allow a user to create a task with a non-empty title. Each task MUST be assigned a unique id and start in the `open` state.

#### Scenario: Create with a valid title
- **WHEN** a user creates a task with title "Buy milk"
- **THEN** the system stores a task with a unique id, title "Buy milk", and state `open`

#### Scenario: Reject an empty title
- **WHEN** a user creates a task with an empty title
- **THEN** the system rejects the request with a validation error and stores nothing

### Requirement: List tasks
The system SHALL return all tasks owned by the requesting user, ordered by creation time.

#### Scenario: List owned tasks
- **WHEN** a user requests their task list and owns two tasks
- **THEN** the system returns exactly those two tasks in creation order

### Requirement: Complete a task
The system SHALL allow a user to mark an `open` task as `done`.

#### Scenario: Complete an open task
- **WHEN** a user completes an `open` task
- **THEN** the task's state becomes `done`

#### Scenario: Completing an unknown task
- **WHEN** a user completes a task id that does not exist
- **THEN** the system returns a not-found error
