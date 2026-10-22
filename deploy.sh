#!/usr/bin/env bash
# Déploie la branche main sur Hostinger : git pull dans ~/msol92-site (hors web), puis rsync vers public_html.
# Usage (Git Bash, depuis le PC) :  ./deploy.sh --dry-run   puis   ./deploy.sh
# Prérequis : Host msol92 dans ~/.ssh/config, et les commits poussés sur GitHub.
set -euo pipefail

DRY=""
[ "${1:-}" = "--dry-run" ] && DRY="--dry-run"

ssh msol92 "set -e
cd ~/msol92-site
git pull --ff-only origin main
git log --oneline -1
rsync -ai --delete $DRY \
  --filter='P google*.html' \
  --exclude=.git/ --exclude=.gitignore --exclude=.gitattributes --exclude=.claude/ --exclude=CLAUDE.md --exclude=.vercelignore \
  --exclude=vercel.json --exclude=CNAME --exclude=README.md --exclude=MEMO-TECHNIQUE.md \
  --exclude='build-*.mjs' --exclude=content/ --exclude=deploy.sh --exclude=/blog/_template.html \
  ./ ~/domains/msol92.com/public_html/"
