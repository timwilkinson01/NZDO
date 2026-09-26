// NZDO site script.
//
// Every page includes this one file. It:
//   • adds the shared header, menu and footer, and turns the page's <h1> into the banner
//   • reads the concert list (concerts.js) and the photo list (js/photo-list.js)
//   • fills in the "Previous concerts" list, each concert page (concert.html?year=2019),
//     and any <span data-fill="..."> figures such as the total raised
//   • opens gallery photos in a full-screen viewer
//
// Content lives in the HTML pages and concerts.js – there is nothing to change here
// for everyday updates, except the menu (NAV below).

(function () {
  "use strict";

  const NAV = [
    ["index.html", "Home"],
    ["next-concert.html", "Next concert"],
    ["previous-concerts.html", "Previous concerts"],
    ["join-us.html", "Join us"],
    ["about.html", "About"],
    ["contact.html", "Contact"],
  ];

  // Lines above the TOML text in concerts.js, so error line numbers match the file.
  const CONCERTS_HEADER_LINES = 4;

  const NZDO = (window.NZDO = {
    data: null,
    photos: {},
    error: null,
    concerts(text) {
      try {
        this.data = TOML.parse(text);
      } catch (e) {
        const line = e.line ? e.line + CONCERTS_HEADER_LINES : null;
        const detail = (e.message || "").split("\n")[0].replace("Invalid TOML document: ", "");
        this.error = `There is a mistake in <b>concerts.js</b>${line ? ` on <b>line ${line}</b>` : ""}: ${esc(detail)}. ` +
          "Common causes: a missing \" quote, a missing comma at the end of a list item, or a missing ] bracket.";
      }
    },
  });

  // ── small helpers ──────────────────────────────────────────────────────────

  function esc(s) {
    return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  }

  // [text](url) links and *italics*
  function md(text) {
    return esc(text)
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, url) =>
        `<a href="${url}"${/^https?:/.test(url) ? ' target="_blank" rel="noopener"' : ""}>${label}</a>`)
      .replace(/\*([^*]+)\*/g, "<em>$1</em>");
  }

  const link = (text, url) => (url ? md(`[${text}](${url})`) : esc(text));

  const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const MONTHS = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

  function parseDate(d) {
    const iso = d instanceof Date ? d.toISOString() : String(d);
    const [y, m, day] = iso.slice(0, 10).split("-").map(Number);
    return { y, m, day, iso: iso.slice(0, 10), dow: new Date(Date.UTC(y, m - 1, day)).getUTCDay() };
  }
  const shortDate = (d) => { const p = parseDate(d); return `${p.day} ${MONTHS[p.m - 1]} ${p.y}`; };
  const longDate = (d) => { const p = parseDate(d); return `${DAYS[p.dow]} ${p.day} ${MONTHS[p.m - 1]} ${p.y}`; };

  function money(x) {
    const whole = Number.isInteger(x);
    return "$" + x.toLocaleString("en-NZ", { minimumFractionDigits: whole ? 0 : 2, maximumFractionDigits: 2 });
  }

  // Photos for a year: any folder in photos/ whose name starts with the year, e.g. "2027_concert".
  function photosFor(year) {
    const folder = Object.keys(NZDO.photos).find((f) => f.startsWith(String(year)));
    if (!folder) return [];
    return NZDO.photos[folder]
      .slice()
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((f) => `photos/${encodeURIComponent(folder)}/${encodeURIComponent(f)}`);
  }

  const where = (c) => link(c.venue, c.venue_url) + (c.city ? `, ${esc(c.city)}` : "");
  const conductor = (c) => (c.conductor ? link(c.conductor, c.conductor_url) : "");
  const cardImage = (c) => c.image || photosFor(c.year)[0];
  const concertUrl = (y) => `concert.html?year=${y}`;

  function concertsSorted() {
    return (NZDO.data?.concert || []).slice().sort((a, b) => b.year - a.year);
  }

  function stats() {
    const cs = concertsSorted();
    return {
      concert_count: cs.length,
      first_year: Math.min(...cs.map((c) => c.year)),
      latest_year: Math.max(...cs.map((c) => c.year)),
      total_raised: money(cs.reduce((t, c) => t + (c.donation || 0), 0)),
    };
  }

  // ── page frame: header, banner, main, footer ──────────────────────────────

  function currentPage() {
    let name = location.pathname.split("/").pop() || "index.html";
    if (!name.includes(".")) name += ".html";
    return name === "concert.html" ? "previous-concerts.html" : name;
  }

  function buildFrame() {
    const body = document.body;
    const here = currentPage();
    const nav = NAV.map(([href, label]) =>
      `<li><a href="${href}"${href === here ? ' aria-current="page"' : ""}>${label}</a></li>`).join("");

    const header = document.createElement("header");
    header.className = "site-header";
    header.innerHTML = `
      <a class="logo" href="index.html"><img src="img/logographic-web-cropped.png" alt="NZDO – New Zealand Doctors Orchestra"></a>
      <input type="checkbox" id="nav-toggle" class="nav-toggle" aria-label="Show menu">
      <label for="nav-toggle" class="nav-toggle-label" aria-hidden="true"><span></span></label>
      <nav class="site-nav" aria-label="Main"><ul>${nav}</ul></nav>`;

    // Everything in the page except this script becomes <main>; the first <h1> becomes the banner.
    const main = document.createElement("main");
    [...body.childNodes].forEach((n) => { if (n.nodeName !== "SCRIPT") main.append(n); });
    const banner = document.createElement("div");
    banner.className = "banner";
    const h1 = main.querySelector("h1");
    if (h1) {
      setBanner(banner, h1.dataset.banner);
      banner.append(h1);
    }

    const footer = document.createElement("footer");
    footer.className = "site-footer";
    footer.innerHTML = `
      <p>New Zealand Doctors Orchestra · Registered charity CC49785</p>
      <p><a href="https://www.facebook.com/nzdoctorsorchestra" target="_blank" rel="noopener">Facebook</a> ·
         <a href="https://www.instagram.com/newzealanddoctorsorchestra/" target="_blank" rel="noopener">Instagram</a> ·
         <a href="contact.html">Contact</a></p>`;

    body.prepend(header, banner, main);
    main.after(footer);
    return { main, banner };
  }

  function setBanner(el, img) {
    if (!img) return;
    el.style.backgroundImage =
      `linear-gradient(rgba(0,0,0,.35), rgba(0,0,0,.35)), url("${img}")`;
    el.classList.add("has-image");
  }

  function showError(main, html) {
    const box = document.createElement("div");
    box.className = "site-error";
    box.innerHTML = `⚠ ${html}`;
    main.prepend(box);
  }

  // ── Previous concerts list ────────────────────────────────────────────────

  function concertCard(c) {
    const y = c.year;
    const img = cardImage(c);
    const links = [`<a href="${concertUrl(y)}" class="more">Photos &amp; details</a>`];
    if (c.programme) links.unshift(`<a href="${c.programme}">Programme</a>`);
    return `
      <article class="concert-card" id="c${y}">
        ${img ? `<a href="${concertUrl(y)}" class="card-img" tabindex="-1" aria-hidden="true"><img src="${img}" alt="" loading="lazy"></a>` : ""}
        <div class="card-body">
          <h2><a href="${concertUrl(y)}">${y}</a></h2>
          <p class="card-meta"><time datetime="${parseDate(c.date).iso}">${shortDate(c.date)}</time><br>${where(c)}</p>
          <ul class="works">${(c.works || []).map((w) => `<li>${md(w)}</li>`).join("")}</ul>
          ${c.conductor ? `<p class="card-conductor">Conductor: ${conductor(c)}</p>` : ""}
          <p class="card-links">${links.join(" ")}</p>
        </div>
      </article>`;
  }

  function renderConcertList(el) {
    const cs = concertsSorted();
    const s = stats();
    el.innerHTML = `
      <section class="wrap">
        <p class="lede">Since ${s.first_year} the NZDO has given ${s.concert_count} concerts around New Zealand,
        raising ${s.total_raised} for local hospices.</p>
        <nav class="year-jump" aria-label="Jump to year">${cs.map((c) => `<a href="#c${c.year}">${c.year}</a>`).join("")}</nav>
      </section>
      <section class="wrap-wide"><div class="concert-list">${cs.map(concertCard).join("")}</div></section>`;
    if (location.hash) document.querySelector(location.hash)?.scrollIntoView();
  }

  // ── single concert page ───────────────────────────────────────────────────

  function renderConcert(el, banner) {
    const cs = concertsSorted();
    const year = Number(new URLSearchParams(location.search).get("year"));
    const i = cs.findIndex((c) => c.year === year);
    const h1 = banner.querySelector("h1");
    if (i < 0) {
      h1.textContent = "Concert not found";
      el.innerHTML = `<section class="wrap prose"><p>See all <a href="previous-concerts.html">previous concerts</a>.</p></section>`;
      return;
    }
    const c = cs[i], newer = cs[i - 1], older = cs[i + 1];
    const photos = photosFor(c.year);
    document.title = `${c.year} concert – NZDO`;
    h1.textContent = `${c.year} concert`;
    setBanner(banner, c.banner || cardImage(c));

    const parts = [];
    let intro = `The NZDO performed at ${where(c)} on ${longDate(c.date)}` +
      (c.conductor ? `, with ${conductor(c)} as our conductor` : "") + ".";
    if (c.players) intro += ` There were ${c.players} players.`;
    parts.push(`<p class="lede">${intro}</p>`);
    if (c.note) parts.push(`<p>${md(c.note)}</p>`);

    parts.push(`<h2>Programme</h2><ul class="works">${(c.works || []).map((w) => `<li>${md(w)}</li>`).join("")}</ul>`);

    if (c.donation) {
      parts.push(`<p class="donation"><strong>${money(c.donation)}</strong> from ticket sales was donated to ` +
        `${link(c.recipient || "a local hospice", c.recipient_url)}.</p>`);
    }
    if (c.sponsors) {
      const shared = NZDO.data.sponsor_text || {};
      parts.push(`<p>${md(shared[c.sponsors] || c.sponsors)}</p>`);
    }

    const res = [];
    if (c.programme) res.push(`<li><a href="${c.programme}">Concert programme</a></li>`);
    if (c.poster) res.push(`<li><a href="${c.poster}">Concert poster</a></li>`);
    (c.links || []).forEach((l) => res.push(`<li>${link(l.text, l.url)}</li>`));
    if (res.length) parts.push(`<h2>Media &amp; documents</h2><ul class="resources">${res.join("")}</ul>`);

    if (c.youtube) {
      parts.push(`<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/${esc(c.youtube)}" ` +
        `title="NZDO ${c.year} video" loading="lazy" allowfullscreen></iframe></div>`);
    }
    if (c.quote) {
      parts.push(`<blockquote><p>${md(c.quote.text)}</p><footer>— ${esc(c.quote.by)}</footer></blockquote>`);
    }

    let html = `<section class="wrap prose">${parts.join("")}</section>`;
    if (photos.length) {
      html += `<section class="wrap-wide"><h2 class="center">Photos</h2><div class="gallery">` +
        photos.map((p, n) => `<a href="${p}"><img src="${p}" alt="NZDO ${c.year}, photo ${n + 1}" loading="lazy"></a>`).join("") +
        `</div></section>`;
    }
    html += `<nav class="pager wrap" aria-label="Other concerts">
      ${newer ? `<a href="${concertUrl(newer.year)}">← ${newer.year}</a>` : "<span></span>"}
      <a href="previous-concerts.html">All concerts</a>
      ${older ? `<a href="${concertUrl(older.year)}">${older.year} →</a>` : "<span></span>"}
    </nav>`;
    el.innerHTML = html;
  }

  // ── lightbox for .gallery links ───────────────────────────────────────────

  function lightbox() {
    const links = [...document.querySelectorAll(".gallery a")];
    if (!links.length) return;
    const box = document.createElement("dialog");
    box.className = "lightbox";
    box.innerHTML = '<img alt=""><button class="lb-prev" aria-label="Previous">‹</button>' +
      '<button class="lb-next" aria-label="Next">›</button><button class="lb-close" aria-label="Close">×</button>';
    document.body.append(box);
    const img = box.querySelector("img");
    let i = 0;
    const show = (n) => {
      i = (n + links.length) % links.length;
      img.src = links[i].href;
      img.alt = links[i].querySelector("img")?.alt || "";
    };
    links.forEach((a, n) => a.addEventListener("click", (e) => { e.preventDefault(); show(n); box.showModal(); }));
    box.querySelector(".lb-prev").onclick = () => show(i - 1);
    box.querySelector(".lb-next").onclick = () => show(i + 1);
    box.querySelector(".lb-close").onclick = () => box.close();
    box.addEventListener("click", (e) => { if (e.target === box) box.close(); });
    box.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") show(i - 1);
      if (e.key === "ArrowRight") show(i + 1);
    });
  }

  // ── start ─────────────────────────────────────────────────────────────────

  // Load scripts one after another (works when opening the files directly, without a web server).
  function load(src) {
    return new Promise((resolve) => {
      const s = document.createElement("script");
      s.src = src;
      s.onload = () => resolve(true);
      s.onerror = () => resolve(false);
      document.head.append(s);
    });
  }

  // A broken concerts.js (e.g. a deleted quote around the edges) is a JavaScript error, not a TOML one.
  window.addEventListener("error", (e) => {
    if (e.filename && /concerts\.js$/.test(e.filename)) {
      NZDO.error = `There is a mistake in <b>concerts.js</b> near <b>line ${e.lineno}</b>. ` +
        "Check the first lines and the very last line of the file haven't been changed, and that there is no backtick character.";
    }
  });

  async function start() {
    const { main, banner } = buildFrame();
    await load("js/vendor/toml.js");
    await load("concerts.js");
    await load("js/photo-list.js");

    if (NZDO.error || !NZDO.data) {
      showError(main, NZDO.error || "Could not load <b>concerts.js</b>.");
    } else {
      const s = stats();
      document.querySelectorAll("[data-fill]").forEach((el) => {
        if (el.dataset.fill in s) el.textContent = s[el.dataset.fill];
      });
      const list = document.getElementById("concert-list");
      if (list) renderConcertList(list);
      const one = document.getElementById("concert");
      if (one) renderConcert(one, banner);
    }
    lightbox();
  }

  start();
})();
