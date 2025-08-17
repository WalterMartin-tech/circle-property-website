#!/usr/bin/env bash
set -euo pipefail
root="$(git rev-parse --show-toplevel 2>/dev/null || true)"
[ -z "$root" ] && { echo "Run inside a git repo."; exit 1; }
cd "$root"
mkdir -p CHANGES
if git rev-parse --verify HEAD >/dev/null 2>&1; then
  ts="$(date +"%Y%m%d_%H%M%S")"
  git diff --name-status HEAD~1 HEAD > "CHANGES/${ts}.txt" || true
fi
