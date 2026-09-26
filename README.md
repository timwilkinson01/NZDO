# NZDO website

The New Zealand Doctors Orchestra website – plain files, no programs to run.
Everything the public sees is in the **`site`** folder.

## What's where

| To change…                         | Edit this file (in Notepad is fine)            |
|------------------------------------|-------------------------------------------------|
| A concert, or add a new one        | `site/concerts.js` (instructions at the top)    |
| Concert photos                     | put them in `site/photos/2027_concert/` etc.    |
| Programmes, posters (PDFs)         | put them in `site/files/`                       |
| Home, About, Contact, Join us, Next concert | `site/index.html`, `site/about.html`, … – edit the text between the “PAGE CONTENT” lines |

The **Previous concerts** page, every concert page, and the “total raised” and
“number of concerts” figures are all filled in automatically from `concerts.js`.

## Adding a new concert

1. Open `site/concerts.js`, copy one concert block, paste it at the top of the list, and change the details.
2. Make a folder `site/photos/2027_concert/` and drop the photos in (any names).
   The first photo is also used as the picture on the Previous concerts page.
3. Put the programme/poster PDFs in `site/files/`.
4. Double-click `site/previous-concerts.html` to check it in your browser.
   If there's a typo in `concerts.js`, the page shows a yellow box saying which line to look at.
5. Publish (upload the changes to GitHub). The live site updates about a minute later.

Note: new photos show up on the live site automatically, but not in the double-click preview
until they have been published once. (Or run `node tools/list-photos.mjs` to update the preview.)

## For the technically minded

- `site/js/site.js` adds the shared header/menu/footer, turns each page's `<h1 data-banner="…">`
  into the banner, and renders concerts from `concerts.js` (TOML wrapped in a JS call so it also
  works from `file://`, parsed by `site/js/vendor/toml.js` = smol-toml).
- Concert pages are `concert.html?year=2019`. Old Weebly addresses (`/2019.html`) are redirected by `site/_redirects`.
- `tools/list-photos.mjs` writes `site/js/photo-list.js`; Cloudflare runs it on every deploy via
  `build.command` in `wrangler.jsonc`, then serves `site/` as static assets.
- `site/_headers` and `site/robots.txt` block search engines while this is a preview –
  delete them when the site goes live at nzdo.org.nz.
- Local preview with a server: `python3 -m http.server 8637 --directory site`
