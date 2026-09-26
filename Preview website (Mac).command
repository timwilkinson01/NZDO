#!/bin/bash
# Double-click this file to preview the NZDO website on this computer.
# It updates the list of photos, then opens the website in your browser.
cd "$(dirname "$0")" || exit 1
bash tools/make-photo-list.sh
open site/index.html
echo
echo "Done – the website has opened in your browser. You can close this window."
