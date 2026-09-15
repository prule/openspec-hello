## 1. Data model

- [ ] 1.1 Add a `collaborators` array (default `[]`) to task records in `app.js`
- [ ] 1.2 Add a helper that classifies an actor as owner / collaborator / none for a task

## 2. Sharing operations

- [ ] 2.1 Add owner-only operations to add and remove a collaborator
- [ ] 2.2 Reject a collaborator id that is not a registered user
- [ ] 2.3 Reject collaborator-list changes from anyone but the owner

## 3. Listing (MODIFIED behavior)

- [ ] 3.1 Broaden the list operation to union owned and shared tasks
- [ ] 3.2 Mark each returned task as owned or shared

## 4. Permissions

- [ ] 4.1 Allow a collaborator to complete a shared task
- [ ] 4.2 Reserve delete and collaborator-management to the owner

## 5. Verify against the specs

- [ ] 5.1 Exercise the `tasks` scenarios (add, non-owner blocked, unregistered blocked, list union)
- [ ] 5.2 Exercise the `users` scenarios (collaborator completes, cannot delete, cannot manage)
