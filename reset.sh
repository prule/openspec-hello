#!/usr/bin/env bash
# Restore the demo to its pristine state so you can run the walkthrough again:
#   - reverts openspec/specs/ to the baseline (undoes archived deltas)
#   - restores the three pending changes under openspec/changes/
#   - removes everything under openspec/changes/archive/
#
# Works by resetting the openspec/ tree to the last git commit.
set -euo pipefail
cd "$(dirname "$0")"

if [ ! -d .git ]; then
  echo "No git repo here — reset relies on git. Run: git init && git add -A && git commit -m baseline"
  exit 1
fi

git checkout -- openspec
git clean -fdq openspec
echo "Reset complete. Pending changes:"
openspec list
