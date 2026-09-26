#!/usr/bin/env python3
"""Build the NZDO static site.

    python3 build.py

Reads  concerts.toml  (the master concert list), the hand-written pages in
pages/, and the shared layout in templates/base.html, then writes finished
HTML files into site/. Everything in site/ can be uploaded to any static host.

No third-party packages needed (Python 3.11+ for tomllib).
"""

import html
import re
import sys
import tomllib
from datetime import date
from pathlib import Path

ROOT = Path(__file__).parent
SITE = ROOT / "site"
PHOTO_EXTS = {".jpg", ".jpeg", ".png", ".webp", ".gif"}

NAV = [
    ("index.html", "Home"),
    ("next-concert.html", "Next concert"),
    ("previous-concerts.html", "Previous concerts"),
    ("join-us.html", "Join us"),
    ("about.html", "About"),
    ("contact.html", "Contact"),
]


# ── helpers ──────────────────────────────────────────────────────────────────

def md(text):
    """Escape text, then allow [link](url) and *italic* markup."""
    out = html.escape(text, quote=False)

    def link(m):
        label, url = m.group(1), m.group(2)
        ext = ' target="_blank" rel="noopener"' if url.startswith("http") else ""
        return f'<a href="{html.escape(url)}"{ext}>{label}</a>'

    out = re.sub(r"\[([^\]]+)\]\(([^)\s]+)\)", link, out)
    out = re.sub(r"\*([^*]+)\*", r"<em>\1</em>", out)
    return out


def a(text, url):
    """Link if url given, else plain escaped text."""
    if not url:
        return html.escape(text)
    return md(f"[{text}]({url})")


def long_date(d):
    return f"{d:%A} {d.day} {d:%B %Y}"


def short_date(d):
    return f"{d.day} {d:%B %Y}"


def money(x):
    return f"${x:,.2f}".replace(".00", "") if x == int(x) else f"${x:,.2f}"


def photos_for(year):
    folder = SITE / "photos" / str(year)
    if not folder.is_dir():
        return []
    return sorted(p for p in folder.iterdir() if p.suffix.lower() in PHOTO_EXTS)


def where(c):
    venue = a(c["venue"], c.get("venue_url"))
    return f"{venue}, {html.escape(c['city'])}" if c.get("city") else venue


def conductor(c):
    return a(c["conductor"], c.get("conductor_url")) if c.get("conductor") else ""


# ── layout ───────────────────────────────────────────────────────────────────

TEMPLATE = (ROOT / "templates" / "base.html").read_text()


def render(out_name, *, title, heading, content, banner=None, nav_key=None,
           description=""):
    nav_key = nav_key or out_name
    current = ' aria-current="page"'
    nav = "\n".join(
        f'<li><a href="{href}"{current if href == nav_key else ""}>{label}</a></li>'
        for href, label in NAV
    )
    banner_style = (' style="background-image: linear-gradient(rgba(0,0,0,.35), rgba(0,0,0,.35)), '
                    f'url(\'{banner}\')"') if banner else ""
    page = (TEMPLATE
            .replace("{{title}}", html.escape(title))
            .replace("{{description}}", html.escape(description))
            .replace("{{heading}}", heading)
            .replace("{{banner_style}}", banner_style)
            .replace("{{nav}}", nav)
            .replace("{{year}}", str(date.today().year))
            .replace("{{content}}", content))
    (SITE / out_name).write_text(page)
    return page


# ── previous concerts ────────────────────────────────────────────────────────

def concert_card(c):
    y = c["year"]
    works = "".join(f"<li>{md(w)}</li>" for w in c["works"])
    links = [f'<a href="{y}.html" class="more">Photos &amp; details</a>']
    if c.get("programme"):
        links.insert(0, f'<a href="{c["programme"]}">Programme</a>')
    img = ""
    if c.get("image"):
        img = (f'<a href="{y}.html" class="card-img" tabindex="-1" aria-hidden="true">'
               f'<img src="{c["image"]}" alt="" loading="lazy"></a>')
    cond = f'<p class="card-conductor">Conductor: {conductor(c)}</p>' if c.get("conductor") else ""
    return f"""
<article class="concert-card" id="c{y}">
  {img}
  <div class="card-body">
    <h2><a href="{y}.html">{y}</a></h2>
    <p class="card-meta"><time datetime="{c['date']}">{short_date(c['date'])}</time><br>{where(c)}</p>
    <ul class="works">{works}</ul>
    {cond}
    <p class="card-links">{" ".join(links)}</p>
  </div>
</article>"""


def previous_concerts_page(concerts, stats):
    years = "".join(f'<a href="#c{c["year"]}">{c["year"]}</a>' for c in concerts)
    cards = "".join(concert_card(c) for c in concerts)
    content = f"""
<section class="wrap">
  <p class="lede">Since {stats['first_year']} the NZDO has given {stats['concert_count']} concerts
  around New Zealand, raising {stats['total_raised']} for local hospices.</p>
  <nav class="year-jump" aria-label="Jump to year">{years}</nav>
</section>
<section class="wrap-wide">
  <div class="concert-list">{cards}
  </div>
</section>"""
    render("previous-concerts.html", title="Previous concerts – NZDO",
           heading="Previous concerts", content=content,
           banner="img/banners/previous-concerts.png",
           description="Every New Zealand Doctors Orchestra concert since 2012.")


# ── per-year pages ───────────────────────────────────────────────────────────

def year_page(c, prev_c, next_c, sponsor_text):
    y = c["year"]
    parts = []

    intro = (f"The NZDO performed at {where(c)} on {long_date(c['date'])}"
             + (f", with {conductor(c)} as our conductor" if c.get("conductor") else "")
             + ".")
    if c.get("players"):
        intro += f" There were {c['players']} players."
    parts.append(f'<p class="lede">{intro}</p>')
    if c.get("note"):
        parts.append(f"<p>{md(c['note'])}</p>")

    parts.append("<h2>Programme</h2>")
    parts.append('<ul class="works">' + "".join(f"<li>{md(w)}</li>" for w in c["works"]) + "</ul>")

    if c.get("donation"):
        rec = a(c.get("recipient", "a local hospice"), c.get("recipient_url"))
        parts.append(f'<p class="donation"><strong>{money(c["donation"])}</strong> '
                     f'from ticket sales was donated to {rec}.</p>')

    sp = c.get("sponsors")
    if sp:
        parts.append(f"<p>{md(sponsor_text.get(sp, sp))}</p>")

    res = []
    if c.get("programme"):
        res.append(f'<li><a href="{c["programme"]}">Concert programme</a></li>')
    if c.get("poster"):
        res.append(f'<li><a href="{c["poster"]}">Concert poster</a></li>')
    for l in c.get("links", []):
        res.append(f"<li>{a(l['text'], l['url'])}</li>")
    if res:
        parts.append("<h2>Media &amp; documents</h2><ul class=\"resources\">" + "".join(res) + "</ul>")

    if c.get("youtube"):
        parts.append(f'<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/{c["youtube"]}" '
                     f'title="NZDO {y} video" loading="lazy" allowfullscreen></iframe></div>')

    if c.get("quote"):
        q = c["quote"]
        parts.append(f'<blockquote><p>{md(q["text"])}</p><footer>— {html.escape(q["by"])}</footer></blockquote>')

    body = f'<section class="wrap prose">{"".join(parts)}</section>'

    photos = photos_for(y)
    if photos:
        items = "".join(
            f'<a href="{p.relative_to(SITE).as_posix()}"><img src="{p.relative_to(SITE).as_posix()}" '
            f'alt="NZDO {y}, photo {i + 1}" loading="lazy"></a>'
            for i, p in enumerate(photos))
        body += (f'<section class="wrap-wide"><h2 class="center">Photos</h2>'
                 f'<div class="gallery">{items}</div></section>')

    pager = ['<nav class="pager wrap" aria-label="Other concerts">']
    pager.append(f'<a href="{next_c["year"]}.html" rel="prev">← {next_c["year"]}</a>' if next_c else "<span></span>")
    pager.append('<a href="previous-concerts.html">All concerts</a>')
    pager.append(f'<a href="{prev_c["year"]}.html" rel="next">{prev_c["year"]} →</a>' if prev_c else "<span></span>")
    pager.append("</nav>")
    body += "".join(pager)

    render(f"{y}.html", title=f"{y} concert – NZDO", heading=f"{y} concert",
           content=body, banner=c.get("banner") or c.get("image"),
           nav_key="previous-concerts.html",
           description=f"NZDO {y} concert at {c['venue']}.")


# ── hand-written pages ───────────────────────────────────────────────────────

def static_pages(stats):
    for src in sorted((ROOT / "pages").glob("*.html")):
        text = src.read_text()
        meta = {}
        m = re.match(r"\s*<!--(.*?)-->", text, re.S)
        if m:
            for line in m.group(1).strip().splitlines():
                k, _, v = line.partition(":")
                meta[k.strip()] = v.strip()
            text = text[m.end():]
        for k, v in stats.items():
            text = text.replace("{{" + k + "}}", str(v))
        render(src.name, title=meta.get("title", "NZDO"),
               heading=meta.get("heading", ""), content=text,
               banner=meta.get("banner"), description=meta.get("description", ""))


# ── link checker ─────────────────────────────────────────────────────────────

def check_links():
    missing = set()
    for page in SITE.glob("*.html"):
        for ref in re.findall(r'(?:href|src)="([^"#]+)"', page.read_text()):
            if re.match(r"^(https?:|mailto:|tel:|//)", ref):
                continue
            if not (SITE / html.unescape(ref)).exists():
                missing.add((page.name, ref))
    for page, ref in sorted(missing):
        print(f"  ! {page}: missing file {ref}", file=sys.stderr)
    return len(missing)


# ── main ─────────────────────────────────────────────────────────────────────

def main():
    data = tomllib.loads((ROOT / "concerts.toml").read_text())
    concerts = sorted(data["concert"], key=lambda c: c["year"], reverse=True)
    sponsor_text = data.get("sponsor_text", {})

    stats = {
        "concert_count": len(concerts),
        "first_year": min(c["year"] for c in concerts),
        "latest_year": max(c["year"] for c in concerts),
        "total_raised": money(sum(c.get("donation", 0) for c in concerts)),
    }

    previous_concerts_page(concerts, stats)
    for i, c in enumerate(concerts):
        newer = concerts[i - 1] if i > 0 else None
        older = concerts[i + 1] if i + 1 < len(concerts) else None
        year_page(c, older, newer, sponsor_text)
    static_pages(stats)

    n_missing = check_links()
    print(f"Built {len(concerts)} concert pages + index pages into {SITE.relative_to(ROOT)}/ "
          f"(total raised {stats['total_raised']})"
          + (f" — {n_missing} missing file(s), see above" if n_missing else ""))


if __name__ == "__main__":
    main()
