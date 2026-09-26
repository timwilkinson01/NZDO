# NZDO website

A plain HTML/CSS rebuild of https://www.nzdo.org.nz (previously Weebly).

```
concerts.toml      ← master list of concerts (edit this each year)
pages/             ← hand-written pages: home, about, contact, join us, next concert
templates/base.html← shared header / nav / footer
build.py           ← generates the HTML (Python 3.11+, no packages needed)
site/              ← the finished website — upload this folder
  css/style.css      all styling (colours/fonts/sizes are variables at the top)
  js/lightbox.js     photo viewer for galleries
  img/ files/        images, PDFs, audio
  photos/<year>/     concert photo galleries
```

## Adding a new concert (once a year)

1. In `concerts.toml`, copy the newest `[[concert]]` block, paste it above, and edit it.
2. Put the card photo in `site/img/cards/`, the banner in `site/img/banners/`,
   and the programme/poster PDFs in `site/files/`.
3. Drop gallery photos into `site/photos/<year>/` (any filenames; shown in name order).
4. Update `pages/next-concert.html` for the following year.
5. Run `python3 build.py`, then upload `site/`.

`Previous concerts`, the new year page, the prev/next links, and the
"total raised" / "number of concerts" figures on the home and about pages all update automatically.
The build prints a warning for any link to a local file that doesn't exist.

## Preview locally

```
python3 -m http.server 8637 --directory site
```
then open http://localhost:8637.

## Hosting

`site/` is fully static — works on GitHub Pages, Netlify, Cloudflare Pages, or any web host.
Page URLs match the old site (`previous-concerts.html`, `2019.html`, …), so existing links keep working.
