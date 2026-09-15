# Reproduce every change with `/opsx:propose`

All three changes in this demo can be generated through OpenSpec's prompt-driven
flow in Claude Code — you describe the change in plain language and the
`/opsx:propose` skill creates the change directory and generates its artifacts
(proposal → specs → design → tasks, skipping any that don't apply).

> **Heads-up on determinism.** `/opsx:propose` uses an LLM to author the
> artifacts, so the exact requirement wording, scenario count, and whether a
> `design.md` is generated will vary between runs. What stays stable is the
> **scope** each prompt steers toward — which capabilities the change touches.
> The prompts below are written to pin that scope down.

## Before you start

You need an initialized project with the three baseline specs already in place
(`tasks`, `users`, `notifications`). From this repo's clean `main` branch that's
already true. To build it from nothing instead, see
[README → How this repo was created](README.md#how-this-repo-was-created-to-build-your-own).

> If a change of the same name already exists (as it does on `main`), the skill
> will ask whether to continue it or create a new one. To regenerate from
> scratch, delete the existing directory first, e.g.
> `rm -rf openspec/changes/add-task-tags`.

Run each prompt in Claude Code, review the generated artifacts, then apply it
with `openspec archive <name> -y` before moving to the next one.

---

## 1. `add-task-tags` — single capability (`tasks`)

```text
/opsx:propose Let users attach free-text tags to their tasks and filter their task list by tag. Scope this to the existing `tasks` capability only.
```

- **Touches:** `tasks`
- **Expect:** `proposal.md`, `specs/tasks/spec.md` (ADDED requirements for tagging
  and filtering), `tasks.md`. `design.md` is normally skipped — the change is too
  small to meet the "include design" bar.
- **Apply:** `openspec archive add-task-tags -y`

## 2. `add-due-dates` — cross-cutting (`tasks` + `notifications`) ⭐

```text
/opsx:propose Add an optional due date to a task, and treat a task as "overdue" when it is still open and its due date has passed. Then have the notifications capability send the task's owner a one-time reminder when one of their tasks becomes overdue. This change spans two capabilities: `tasks` (the due date and the overdue status) and `notifications` (the overdue reminder). Do not change `users`.
```

- **Touches:** `tasks` **and** `notifications` — one proposal, two spec deltas.
- **Expect:** `proposal.md`, `specs/tasks/spec.md` **and**
  `specs/notifications/spec.md`, `design.md`, and `tasks.md` (a cross-cutting
  change is exactly the case the skill writes a `design.md` for).
- **Apply:** `openspec archive add-due-dates -y` — watch it update **both** specs.

## 3. `add-task-sharing` — cross-cutting with a MODIFIED requirement (`tasks` + `users`)

```text
/opsx:propose Let a task's owner share it with other registered users as collaborators, so the task shows up for them too. This means the existing "List tasks" behavior must change: listing now returns the tasks a user owns AND the tasks shared with them, with shared tasks marked as such — treat that as a MODIFIED requirement on the `tasks` capability, not a brand-new one. Also define collaborator permissions on the `users` capability: a collaborator may view and complete a shared task but may not delete it or manage its collaborators (owner-only). This change spans `tasks` and `users`. Do not change `notifications`.
```

- **Touches:** `tasks` **and** `users`, and it **rewrites** an existing
  requirement (`List tasks`) rather than only adding new ones.
- **Expect:** `specs/tasks/spec.md` with a `## MODIFIED Requirements` section
  (the full rewritten `List tasks` requirement) plus a `## ADDED Requirements`
  section for sharing, `specs/users/spec.md` for collaborator permissions, and
  (as a cross-cutting change) a `design.md` and `tasks.md`.
- **Apply:** `openspec archive add-task-sharing -y` — the archive reports
  `~ 1 modified` alongside the added requirements.

---

## After all three

```bash
openspec list                 # no active changes
openspec list --specs         # notifications 3 · tasks 8 · users 3
ls openspec/changes/archive   # the three applied proposals, dated
```

That's the same end state captured on the [`finished`](README.md#branches)
branch. To get back to the clean starting point, run `./reset.sh`.

### Reviewing before you apply

`/opsx:propose` only creates planning artifacts — it never edits code or
archives on its own. Between generating and applying a change:

```bash
openspec show <name>              # proposal + deltas
openspec validate <name> --strict # structural check
openspec status --change <name>   # which artifacts exist
```

Edit any artifact by hand if the generated version isn't quite what you want,
then archive.
