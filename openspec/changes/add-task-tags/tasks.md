## 1. Data model

- [ ] 1.1 Add a `tags` array (default `[]`) to task records in `app.js`
- [ ] 1.2 Ensure existing tasks without tags behave as having no tags

## 2. Tagging behavior

- [ ] 2.1 Add an operation to attach a tag to a task the caller owns
- [ ] 2.2 Reject empty tags with a validation error
- [ ] 2.3 Ignore a tag that is already present (no duplicates)

## 3. Filtering

- [ ] 3.1 Extend the list operation to accept an optional tag filter
- [ ] 3.2 Return only the caller's tasks carrying the given tag (empty list when none match)

## 4. Verify against the spec

- [ ] 4.1 Exercise each scenario in `specs/tasks/spec.md` (add, duplicate, empty, filter, no-match)
- [ ] 4.2 Run `node app.js` and confirm the tagging demo output
