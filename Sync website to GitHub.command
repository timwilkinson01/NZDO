#!/bin/bash

# Double-click this file in Finder to commit local website changes and push
# them to the public NZDO GitHub repository.

set -u

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$REPO_DIR" || exit 1

echo "NZDO website — sync to GitHub"
echo "Repository: $REPO_DIR"
echo

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "This folder is not a Git repository."
  read -r -p "Press Return to close..."
  exit 1
fi

if ! git remote get-url timwilkinson >/dev/null 2>&1; then
  echo "The NZDO GitHub remote was not found. Nothing was uploaded."
  read -r -p "Press Return to close..."
  exit 1
fi

if [ -z "$(git status --porcelain)" ]; then
  echo "There are no local changes to save."
  echo "Checking GitHub for any updates to download..."
  git pull --rebase timwilkinson main
  result=$?
  if [ "$result" -eq 0 ]; then
    echo "Finished. Your folder is up to date."
  else
    echo "Git could not finish syncing. Read the message above for details."
  fi
  read -r -p "Press Return to close..."
  exit "$result"
fi

echo "Files changed:"
git status --short
echo
read -r -p "Type a short description of your changes: " SUMMARY
if [ -z "${SUMMARY//[[:space:]]/}" ]; then
  echo "A description is needed; nothing was uploaded."
  read -r -p "Press Return to close..."
  exit 1
fi

git add -A
if [ $? -ne 0 ]; then
  echo "Could not prepare the changed files. Nothing was uploaded."
  read -r -p "Press Return to close..."
  exit 1
fi

git commit -m "$SUMMARY"
if [ $? -ne 0 ]; then
  echo "Could not save the changes as a Git commit. Nothing was uploaded."
  read -r -p "Press Return to close..."
  exit 1
fi

echo
echo "Checking for changes on GitHub..."
git pull --rebase timwilkinson main
if [ $? -ne 0 ]; then
  echo "Git could not combine the local and GitHub changes. Your commit is saved locally; nothing was pushed."
  echo "Please ask for help resolving the message above."
  read -r -p "Press Return to close..."
  exit 1
fi

echo
echo "Uploading to GitHub..."
git push timwilkinson HEAD:main
result=$?
if [ "$result" -eq 0 ]; then
  echo
  echo "Done. GitHub Pages will publish the website shortly."
else
  echo
  echo "The upload did not finish. Your local commit is saved; read the message above for details."
fi

read -r -p "Press Return to close..."
exit "$result"
