# NZDO website

The New Zealand Doctors Orchestra website – plain files, no programs to run.
Everything the public sees is in the **`site`** folder.

## What's where

| To change…                         | Edit this file (in Notepad is fine)            |
|------------------------------------|-------------------------------------------------|
| A concert, or add a new one        | `site/concerts.js` (instructions at the top)    |
| Concert photos                     | put them in `site/concert_photos/2027_concert/` etc.    |
| Programmes, posters (PDFs)         | put them in `site/files/`                       |
| Home, About, Contact, Join us, Next concert | `site/index.html`, `site/about.html`, … – edit the text between the “PAGE CONTENT” lines |

The **Previous concerts** page, every concert page, and the “total raised” and
“number of concerts” figures are all filled in automatically from `concerts.js`.

## Adding a new concert

1. Open `site/concerts.js`, copy one concert block, paste it at the top of the list, and change the details.
2. Make a folder `site/concert_photos/2027_concert/` and drop the photos in (any names).
   The first photo is also used as the picture on the Previous concerts page.
3. Put the programme/poster PDFs in `site/files/`.
4. Double-click **Preview website (Windows).bat** (or **Preview website (Mac).command** on a Mac).
   It picks up any new photos and opens the website in your browser.
   If there's a typo in `concerts.js`, the page shows a yellow box saying which line to look at.
5. Publish (upload the changes to GitHub). The live site updates about a minute later.

After editing text only, you can also just double-click any `.html` file in `site/` –
the "Preview website" step is only needed to pick up new or removed photos.

## For the technically minded

- `site/js/site.js` adds the shared header/menu/footer, turns each page's `<h1 data-banner="…">`
  into the banner, and renders concerts from `concerts.js` (TOML wrapped in a JS call so it also
  works from `file://`, parsed by `site/js/vendor/toml.js` = smol-toml).
- Concert pages are `concert.html?year=2019`. Old Weebly addresses (`/2019.html`) are redirected by `site/_redirects`.
- `site/js/photo-list.js` lists the photo files (a page can't list a folder itself). It's written by
  `tools/make-photo-list.sh` (built-in shell commands only) – run by the Mac preview launcher, the
  Windows `.bat` launcher, GitHub Actions before each Pages deploy, and Cloudflare on every deploy
  (`build.command` in `wrangler.jsonc`).
- `site/robots.txt` allows search engines and points them to `site/sitemap.xml`.
- The site uses `https://www.nzdo.org.nz` as its canonical public domain. Keep the
  sitemap and page canonical URLs in step if the public domain changes.
- Local preview with a server: `python3 -m http.server 8637 --directory site`

## Hosting on GitHub Pages

The `Deploy NZDO website` workflow publishes the contents of `site/` whenever a change is pushed to `main`.
The repository is configured to use `www.nzdo.org.nz` as its custom domain. DNS at Freeparking still needs to
point that domain to GitHub Pages before visitors will see this copy of the site; leave email-related DNS
records such as MX and TXT records unchanged.
