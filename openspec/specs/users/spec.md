# users Specification

## Purpose
Identifies who owns each task so that a person only sees and manages their own work.

## Requirements

### Requirement: Register a user
The system SHALL allow registration of a user with a unique, non-empty username. Each user MUST receive a unique id.

#### Scenario: Register a new username
- **WHEN** someone registers the username "alice"
- **THEN** the system creates a user with a unique id and username "alice"

#### Scenario: Reject a duplicate username
- **WHEN** someone registers a username that already exists
- **THEN** the system rejects the request with a conflict error

### Requirement: Identify the task owner
The system SHALL associate every task with exactly one owning user, and MUST reject task operations from an unregistered user.

#### Scenario: Owner is recorded on creation
- **WHEN** a registered user creates a task
- **THEN** the task records that user as its owner

#### Scenario: Unregistered user is rejected
- **WHEN** an unregistered user attempts a task operation
- **THEN** the system returns an unauthorized error
