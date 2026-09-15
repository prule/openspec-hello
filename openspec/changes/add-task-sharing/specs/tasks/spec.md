## ADDED Requirements

### Requirement: Share a task with collaborators
The system SHALL allow the owner of a task to add or remove registered users as collaborators on that task. Only the owner MAY change the collaborator list, and a collaborator MUST be a registered user.

#### Scenario: Owner adds a collaborator
- **WHEN** a task owner adds a registered user as a collaborator
- **THEN** that user appears in the task's collaborator list

#### Scenario: Non-owner cannot change collaborators
- **WHEN** a collaborator (not the owner) tries to add another collaborator
- **THEN** the system returns an unauthorized error and the collaborator list is unchanged

#### Scenario: Collaborator must be registered
- **WHEN** an owner tries to add an unregistered user as a collaborator
- **THEN** the system returns an error and no collaborator is added

## MODIFIED Requirements

### Requirement: List tasks
The system SHALL return all tasks the requesting user owns **or** is a collaborator on, ordered by creation time. Shared tasks MUST be visibly distinguishable from owned tasks.

#### Scenario: List owned tasks
- **WHEN** a user requests their task list and owns two tasks
- **THEN** the system returns exactly those two tasks in creation order

#### Scenario: List includes shared tasks
- **WHEN** a user owns one task and is a collaborator on another
- **THEN** the system returns both tasks, marking which one is shared
