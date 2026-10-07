#!/bin/bash

# Double-click this file in Finder to save local website changes and publish
# them to the NZDO GitHub repository.

set -u

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$REPO_DIR" || exit 1

pause_to_close() {
  echo
  read -r -p "Press Return to close..."
}

echo "NZDO website — save changes and publish to GitHub"
echo "Repository folder: $REPO_DIR"
echo

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "This folder is not a Git repository. Nothing was uploaded."
  pause_to_close
  exit 1
fi

REMOTE_URL="$(git remote get-url timwilkinson 2>/dev/null || true)"
if [ "$REMOTE_URL" != "https://github.com/timwilkinson01/NZDO.git" ]; then
  echo "The NZDO GitHub destination was not found or does not match the expected repository."
  echo "Nothing was uploaded. Please ask for help checking the GitHub connection."
  pause_to_close
  exit 1
fi

if [ -z "$(git status --porcelain)" ]; then
  echo "There are no local changes to save or upload."
  pause_to_close
  exit 0
fi

echo "These files will be saved and uploaded:"
git status --short
echo
read -r -p "In a few words, what did you change? " SUMMARY
if [ -z "${SUMMARY//[[:space:]]/}" ]; then
  echo "Please enter a short description. Nothing was changed or uploaded."
  pause_to_close
  exit 1
fi

git add -A || {
  echo "Git could not prepare the changes. Nothing was uploaded."
  pause_to_close
  exit 1
}

git commit -m "$SUMMARY" || {
  echo "Git could not save the changes. Nothing was uploaded."
  pause_to_close
  exit 1
}

echo
echo "Checking for updates in the NZDO GitHub repository..."
git pull --rebase timwilkinson main
if [ $? -ne 0 ]; then
  echo
  echo "Git could not combine the changes with the current GitHub version."
  echo "Your changes have been saved on this computer, but nothing was uploaded."
  echo "Please ask for help resolving the Git message above."
  pause_to_close
  exit 1
fi

echo
echo "Uploading to GitHub..."
git push timwilkinson HEAD:main
RESULT=$?
if [ "$RESULT" -eq 0 ]; then
  echo
  echo "Done. GitHub has the changes, and the website should update shortly."
else
  echo
  echo "The upload did not finish. Your saved changes are still on this computer."
fi

pause_to_close
exit "$RESULT"
