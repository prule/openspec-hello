## Context
See proposal.md — Why. Sharing touches both `tasks` (who a task belongs to and
who can see it) and `users` (what a collaborator is allowed to do), so the
ownership-vs-collaborator boundary needs to be decided once and applied in both.

## Goals / Non-Goals
- **Goal:** an owner can grant others access to a task; access is read + complete
  for collaborators, with destructive and administrative actions kept owner-only.
- **Non-Goal:** roles beyond owner/collaborator, per-field permissions, sharing by
  link or to unregistered users, or transferring ownership.

## Decisions
- **Ownership stays single; collaborators are a separate list.** A task keeps one
  `ownerId` and gains a `collaborators` array. *Alternative considered:* a list of
  members with per-member roles — rejected as over-built for two roles.
- **"List tasks" unions owned and shared, and marks shared entries.** Rather than a
  separate "shared with me" endpoint, the existing list broadens so callers see
  everything relevant in one place; each entry indicates whether it is shared.
  This is why the change is a MODIFIED requirement, not a new one.
- **Permission checks key off the actor's relationship to the task.** Owner →
  full control; collaborator → view + complete; everyone else → no access. The
  same check backs both the `tasks` operations and the `users` permission spec.

## Risks / Trade-offs
- Broadening "List tasks" changes existing observable behavior: a client that
  assumed the list was owned-only now also receives shared tasks. The `shared`
  marker is what lets clients tell them apart, so it is required, not optional.
