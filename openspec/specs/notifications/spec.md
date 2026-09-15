# notifications Specification

## Purpose
Delivers messages to a user about events that concern their tasks, so important moments are not missed.

## Requirements

### Requirement: Send a notification
The system SHALL deliver a notification with a non-empty message to a specified registered user, and MUST record the time it was sent.

#### Scenario: Notify a registered user
- **WHEN** the system sends the message "Welcome" to a registered user
- **THEN** the user receives a notification containing "Welcome" with a send timestamp

#### Scenario: Reject an empty message
- **WHEN** the system attempts to send an empty message
- **THEN** no notification is delivered and a validation error is returned

### Requirement: List a user's notifications
The system SHALL return all notifications delivered to a user, newest first.

#### Scenario: Retrieve delivered notifications
- **WHEN** a user with two delivered notifications requests their notifications
- **THEN** the system returns both, ordered newest first
