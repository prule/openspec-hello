# Taskly — an OpenSpec walkthrough

A tiny, dependency-free demo that shows how [OpenSpec](https://github.com/Fission-AI/OpenSpec)
turns **change proposals** into updates to your **living specs**. It's built so
you can watch several changes get applied — including one change that touches
**two specs at once** — in about five minutes.

## Branches

- **`main`** (you are here) — the **clean starting point**: baseline specs plus
  three *pending* changes. Follow the walkthrough below to apply them yourself.
- **`finished`** — the **applied result**: the same repo after all three changes
  have been archived, so `openspec/specs/` has grown and the proposals sit under
  `openspec/changes/archive/`. Peek at it with `git switch finished`, or diff the
  two branches: `git diff main finished -- openspec/specs`.

## The idea in 30 seconds

OpenSpec keeps two things side by side:

- `openspec/specs/` — the **current truth**: what the system does today.
- `openspec/changes/` — **proposed changes**: each one carries *spec deltas*
  (ADDED / MODIFIED / REMOVED requirements).

You **archive** a change to apply its deltas into the specs. The proposal moves
to `openspec/changes/archive/`, and `openspec/specs/` grows to reflect the new
reality. That's the whole loop: *propose → apply (archive) → specs evolve*.

## What's in this repo

**Baseline specs** (the system as already shipped) — 3 capabilities:

| Capability | What it covers |
|---|---|
| `tasks` | create, list, complete a task |
| `users` | register a user, own a task |
| `notifications` | send and list notifications |

**Three pending changes**, staged and ready to apply:

| Change | Touches | Shows |
|---|---|---|
| `add-task-tags` | `tasks` | the simple case: one change, one spec |
| `add-due-dates` | `tasks` **+** `notifications` | **one change, two specs** ⭐ |
| `add-task-sharing` | `tasks` **+** `users` | a second cross-cutting change, **and a `MODIFIED` requirement** that rewrites an existing spec |

> **All three changes were generated through OpenSpec's prompt-driven flow**
> (`/opsx:propose` in Claude Code) — the exact prompts are in
> [`PROMPTS.md`](PROMPTS.md). Their artifact sets differ by what the change
> needs: the two cross-cutting changes carry `proposal.md` + `specs/` +
> `design.md` + `tasks.md`, while `add-task-tags` skips `design.md` (the skill
> only writes a design for cross-cutting or otherwise complex changes). The
> planning artifacts beyond `specs/` don't affect what `archive` does to the
> specs — only the deltas under `specs/` do.

**A reference app** — [`app.js`](app.js), an in-memory implementation of the
baseline specs. Run it with `node app.js`. (No dependencies, no build.)

## Prerequisites

- Node.js (only to run `app.js`)
- OpenSpec CLI: `npm i -g @fission-ai/openspec` (this demo was built with 1.9.0)

---

## The walkthrough (copy/paste each block)

### 0. See where you start

```bash
node app.js                 # the baseline app runs
openspec list               # 3 pending changes
openspec list --specs       # notifications 2 · tasks 3 · users 2
```

### 1. Inspect a change before applying it

```bash
openspec show add-task-tags        # the proposal + its spec delta
openspec validate add-task-tags --strict
```

Notice the delta lives at
`openspec/changes/add-task-tags/specs/tasks/spec.md` and uses
`## ADDED Requirements` — it describes *only what changes*, not the whole spec.

### 2. Apply the simple change (one spec)

```bash
openspec archive add-task-tags -y
openspec list --specs              # tasks: 3 -> 5 requirements
```

`tasks` grew; `users` and `notifications` are untouched. The proposal is now
under `openspec/changes/archive/`.

### 3. Apply the cross-cutting change (two specs from one proposal) ⭐

This is the headline. One proposal carries **two** delta files:

```bash
ls openspec/changes/add-due-dates/specs   # notifications/  tasks/
openspec archive add-due-dates -y
```

Watch the output — it updates **both** `tasks` and `notifications`:

```
Specs to update:
  notifications: update
  tasks: update
```

```bash
openspec list --specs              # tasks 5->7 · notifications 2->3
```

One change, two capabilities moved forward together — kept consistent because
they shipped as a single proposal.

### 4. Apply a change that MODIFIES an existing requirement

```bash
openspec archive add-task-sharing -y
openspec spec show tasks           # or: cat openspec/specs/tasks/spec.md
```

Look at **Requirement: List tasks** — it's been *rewritten* (now returns owned
**and** shared tasks). The archive reported `~ 1 modified` alongside the added
requirements. This change spanned `tasks` **+** `users`.

### 5. See the final picture

```bash
openspec list                      # no active changes
openspec list --specs              # notifications 3 · tasks 8 · users 3
ls openspec/changes/archive        # the 3 applied proposals, dated
```

Every requirement now in `openspec/specs/` can be traced back to the proposal
that introduced it in `openspec/changes/archive/`.

### 6. Repeat it

```bash
./reset.sh                         # restores baseline specs + pending changes
```

---

## Quick reference

```bash
openspec list                  # active (pending) changes
openspec list --specs          # capabilities + requirement counts
openspec show <change>         # a proposal and its deltas
openspec spec show <cap>       # the current spec for a capability
openspec validate <change> --strict
openspec archive <change> -y   # apply deltas -> specs, then archive
```

## How this repo was created (to build your own)

There are two ways to author a change; this repo's three changes were all made
the first way.

**A. Prompt-driven (how all three changes were made).** In Claude Code, run the
OpenSpec skill and describe the change in plain language:

```text
/opsx:propose Let users attach free-text tags to their tasks and filter by tag.
```

The skill creates the change and generates its artifacts for you (proposal →
specs → design → tasks), skipping any that don't apply. You review, then archive.
**Every change here has a ready-to-paste prompt** — see [`PROMPTS.md`](PROMPTS.md)
to rebuild all three (including the two cross-cutting ones) through
`/opsx:propose`.

**B. By hand.** You can also author the files directly — useful for tiny tweaks
or when you'd rather not round-trip through the skill:

```bash
openspec init --tools claude          # scaffolds openspec/ + config
# hand-write the baseline openspec/specs/<cap>/spec.md files
openspec new change <name>            # creates openspec/changes/<name>/
#   then add:  proposal.md  and  specs/<cap>/spec.md  (the delta)
openspec validate <name> --strict
git add -A && git commit -m baseline  # so reset.sh can restore it
```

A delta file uses `## ADDED Requirements`, `## MODIFIED Requirements`, or
`## REMOVED Requirements`. For a `MODIFIED` requirement, copy the *entire*
existing requirement block from the baseline spec and edit it — the header text
must match so OpenSpec knows which one to replace. Every requirement needs at
least one `#### Scenario:` (exactly four `#`).
