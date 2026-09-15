## ADDED Requirements

### Requirement: Collaborator permissions
The system SHALL grant a collaborator the right to view and complete a shared task, while reserving deletion and collaborator-management rights to the owner.

#### Scenario: Collaborator completes a shared task
- **WHEN** a collaborator completes a task shared with them
- **THEN** the task's state becomes `done`

#### Scenario: Collaborator cannot delete a shared task
- **WHEN** a collaborator attempts to delete a shared task
- **THEN** the system returns an unauthorized error and the task remains

#### Scenario: Collaborator cannot manage collaborators
- **WHEN** a collaborator attempts to add or remove another collaborator
- **THEN** the system returns an unauthorized error
