## 1. Due dates on tasks

- [ ] 1.1 Add an optional `dueDate` field to task records in `app.js`
- [ ] 1.2 Add an operation to set/clear the due date on a task the caller owns
- [ ] 1.3 Reject an invalid calendar date with a validation error

## 2. Overdue status

- [ ] 2.1 Derive `overdue` on read: open AND due date before today
- [ ] 2.2 Ensure a completed task and a task with no due date are never overdue

## 3. Overdue reminders (notifications)

- [ ] 3.1 Add a `runOverdueReminders()` sweep that finds overdue open tasks
- [ ] 3.2 Send the owner a notification naming each newly overdue task
- [ ] 3.3 Record a per-task marker so no task is reminded more than once

## 4. Verify against the specs

- [ ] 4.1 Exercise the `tasks` scenarios (set, clear, invalid date, overdue variants)
- [ ] 4.2 Exercise the `notifications` scenarios (first reminder, no duplicate)
