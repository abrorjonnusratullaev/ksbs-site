// Interfeys matnlari. Maktab ma'lumotlari: data/school.json, yangiliklar: data/news.json
const UI = {
  uz: {
    "nav.about": "Maktab haqida", "nav.teachers": "O'qituvchilar", "nav.news": "Yangiliklar", "nav.contact": "Aloqa",
    "nav.admission": "Qabul", "hero.contact": "Bog'lanish", "hero.apply": "Qabulga ariza topshirish", "gallery.title": "Maktab hayoti", "nav.gallery": "Galereya", "gallery.more": "Ko'proq ko'rsatish", "perks.title": "O'quvchilar uchun imkoniyatlar",
    "video.caption": "Maktab bilan tanishtiruv videosi", "video.watch": "YouTube'da ko'rish ↗", "video.play": "Videoni ko'rish", "video.soon": "Tanishtiruv videosi tez orada",
    "adm.grades": "Qabul sinflari", "adm.period": "Ariza topshirish", "adm.docs": "Kerakli hujjatlar", "adm.call": "Call-markaz",
    "teachers.empty": "O'qituvchilar haqidagi ma'lumotlar tez orada joylanadi.",
    "news.channel": "Telegram kanal ↗", "news.loading": "Yuklanmoqda…", "news.empty": "Hozircha yangiliklar yo'q.",
    "news.more": "Telegramda o'qish →",
    "contact.address": "Manzil", "contact.hours": "Ish vaqti", "contact.phone": "Telefon", "contact.email": "Rasmiy pochta",
    "contact.admissions": "Qabul", "contact.admissionsNote": "Agentlikning yagona portali, call-markaz",
    "contact.openMap": "Xaritada ochish", "contact.mapNote": "Xaritani ochish uchun pastdagi tugmani bosing", "map.title": "Maktab joylashuvi xaritada"
  },
  en: {
    "nav.about": "About", "nav.teachers": "Teachers", "nav.news": "News", "nav.contact": "Contact",
    "nav.admission": "Admission", "hero.contact": "Contact us", "hero.apply": "Apply for admission", "gallery.title": "School life", "nav.gallery": "Gallery", "gallery.more": "Show more", "perks.title": "What students get",
    "video.caption": "An introduction to our school", "video.watch": "Watch on YouTube ↗", "video.play": "Watch the video", "video.soon": "Introduction video coming soon",
    "adm.grades": "Entry grades", "adm.period": "Applications", "adm.docs": "Required documents", "adm.call": "Call center",
    "teachers.empty": "Information about our teachers will be published soon.",
    "news.channel": "Telegram channel ↗", "news.loading": "Loading…", "news.empty": "No news yet.",
    "news.more": "Read on Telegram →",
    "contact.address": "Address", "contact.hours": "Opening hours", "contact.phone": "Phone", "contact.email": "Official email",
    "contact.admissions": "Admissions", "contact.admissionsNote": "The agency's single portal, call center",
    "contact.openMap": "Open in maps", "contact.mapNote": "Use the button below to open the map", "map.title": "School location on the map"
  }
};
const LINE_ICONS = {
  atom: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="24" cy="24" r="3.5" fill="currentColor"/><ellipse cx="24" cy="24" rx="20" ry="8"/><ellipse cx="24" cy="24" rx="20" ry="8" transform="rotate(60 24 24)"/><ellipse cx="24" cy="24" rx="20" ry="8" transform="rotate(120 24 24)"/></svg>',
  students: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 18 24 9l20 9-20 9Z"/><path d="M12 22v9c0 3 5.4 6 12 6s12-3 12-6v-9"/><path d="M44 18v11"/></svg>',
  cert: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M30 40H9a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h24a2 2 0 0 1 2 2v12"/><path d="M13 14h16M13 21h12M13 28h7"/><circle cx="35" cy="30" r="6"/><path d="m31.5 35-1.5 8 5-3 5 3-1.5-8"/></svg>'
};
const MONTHS_UZ = ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr"];
const ICONS = {
  tg: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.7 4.3 2.9 11.2c-1.2.5-1.2 1.2-.2 1.5l4.6 1.4 1.7 5.4c.2.6.4.8.9.8.4 0 .6-.2.9-.4l2.2-2.1 4.6 3.4c.8.5 1.4.2 1.6-.8l3-14.1c.3-1.2-.5-1.8-1.5-1.3ZM9.6 14.3l-.4 4-1.3-4.3 9.8-6.2-8.1 6.5Z"/></svg>',
  ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>',
  yt: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 7.2a3 3 0 0 0-2.1-2.1C18 4.6 12 4.6 12 4.6s-6 0-7.9.5A3 3 0 0 0 2 7.2 31 31 0 0 0 1.6 12c0 1.6.1 3.2.4 4.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.6.4-3.2.4-4.8s-.1-3.2-.4-4.8ZM10 15.2V8.8l5.2 3.2-5.2 3.2Z"/></svg>'
};

let lang = /^(uz|ru)/i.test(navigator.language || "uz") ? "uz" : "en";
try { lang = localStorage.getItem("lang") || lang; } catch (e) {}
let school = null, news = [];

const $ = s => document.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const initials = n => String(n).split(/\s+/).map(w => w[0] || "").slice(0, 2).join("").toUpperCase();

function fmtDate(iso) {
  const d = new Date(iso);
  if (!iso || isNaN(d)) return "";
  if (lang === "uz") return `${d.getDate()}-${MONTHS_UZ[d.getMonth()]}, ${d.getFullYear()}`;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

function teacherHTML(t) {
  const L = t[lang] || t.uz || {};
  const pic = t.photo ? `<img class="photo" src="${esc(t.photo)}" alt="${esc(t.name)}" loading="lazy">` : `<div class="noimg" aria-hidden="true">${esc(initials(t.name))}</div>`;
  return `<article class="teacher">${pic}<div class="tb"><h4>${esc(t.name)}</h4>
    ${L.subject ? `<div class="subj">${esc(L.subject)}</div>` : ""}${L.info ? `<div class="info">${esc(L.info)}</div>` : ""}</div></article>`;
}

function postHTML(n) {
  const text = n["text_" + lang] || n.text || "";
  const lines = text.split("\n").filter(l => l.trim());
  const title = lines.shift() || "";
  const src = n.photo || n.image;
  const img = src ? `<img class="ph" src="${esc(src)}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()">` : "";
  return `<article class="post">${img}<div class="pb">${n.date ? `<time datetime="${esc(n.date)}">${esc(fmtDate(n.date))}</time>` : ""}
    <h3>${esc(title)}</h3>${lines.length ? `<p>${esc(lines.join("\n"))}</p>` : ""}
    <a class="more" href="${esc(n.link)}" target="_blank" rel="noopener">${UI[lang]["news.more"]}</a></div></article>`;
}

function contactRows(S, u) {
  const rows = [[u["contact.address"], esc(S.address)], [u["contact.hours"], esc(S.hours)]];
  if (school.phone) rows.push([u["contact.phone"], `<a href="tel:${esc(school.phone.replace(/[^\d+]/g, ""))}">${esc(school.phone)}</a>`]);
  if (school.email) rows.push([u["contact.email"], `<a href="mailto:${esc(school.email)}">${esc(school.email)}</a>`]);
  return rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("");
}

function render() {
  const u = UI[lang];
  document.documentElement.lang = lang;
  document.querySelectorAll(".lang button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
  document.querySelectorAll("[data-k]").forEach(el => {
    const k = el.dataset.k;
    if (k.startsWith("school.")) { if (school) el.textContent = school[lang][k.slice(7)] || ""; }
    else if (u[k]) el.textContent = u[k];
  });

  let n = news.length >= 6 ? 6 : news.length >= 3 ? 3 : news.length;
  $("#news-list").innerHTML = n ? news.slice(0, n).map(postHTML).join("") : `<p class="muted">${u["news.empty"]}</p>`;
  if (!school) return;

  const S = school[lang];
  document.title = S.short;
  $("#subjects").innerHTML = (S.subjects || []).map(x => `<li>${esc(x)}</li>`).join("");
  $("#about-items").innerHTML = (S.about_items || []).map(it => `<li><span class="f-ic">${LINE_ICONS[it.icon] || ""}</span><div><h3>${esc(it.title)}</h3><p>${esc(it.text)}</p></div></li>`).join("");
  $("#perk-list").innerHTML = (S.perks || []).map(x => `<li>${esc(x)}</li>`).join("");
  const A = S.admission || {};
  $("#adm-list").innerHTML = [[u["adm.grades"], esc(A.grades)], [u["adm.period"], esc(A.period)],
    [u["adm.docs"], `<ul>${(A.docs || []).map(d => `<li>${esc(d)}</li>`).join("")}</ul>`]]
    .map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("");
  if (!school.intro_video) $("#video-box").innerHTML = `<div class="video-ph"><span class="play"></span><span>${u["video.soon"]}</span></div>`;
  $("#teacher-list").innerHTML = school.teachers.length ? school.teachers.map(teacherHTML).join("") : `<p class="empty">${u["teachers.empty"]}</p>`;
  $("#contact-list").innerHTML = contactRows(S, u);
}

async function init() {
  $("#year").textContent = new Date().getFullYear();
  try { school = await fetch("data/school.json").then(r => r.json()); } catch (e) { school = null; }
  try { news = await fetch("data/news.json", { cache: "no-cache" }).then(r => r.json()); } catch (e) { news = []; }
  if (school) {
    const tg = "https://t.me/" + school.telegram;
    $("#tg-link").href = tg;
    $("#nav-sat").hidden = !school.show_sat;
    const preview = /claude|localhost|127\.0\.0\.1/.test(location.hostname) || location.protocol === "file:";
    $("#map-link").href = school.map_link;
    $("#portal").href = school.admissions_portal;
    $("#callcenter").innerHTML = (school.callcenter || []).map(n => `<li><a href="tel:${esc(n.replace(/[^\d+]/g, ""))}">${esc(n)}</a></li>`).join("");
        if (school.intro_video) {
      const id = school.intro_video.replace(/.*(?:v=|youtu\.be\/|embed\/)/, "").replace(/[?&].*/, "");
      const watch = "https://www.youtube.com/watch?v=" + id;
      $("#video-link").href = watch; $("#video-link").hidden = false;
      // Video ustida kadr (poster): YouTube rasmi; u yuklanmasa maktab surati.
      const box = $("#video-box");
      box.innerHTML = `<a class="video-poster" href="${watch}" target="_blank" rel="noopener" aria-label="Play">
        <img src="${esc(school.video_poster || `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`)}" alt="" referrerpolicy="no-referrer">
        <span class="play-gold"><span></span></span></a>`;
      const img = box.querySelector("img");
      img.onerror = () => { img.onerror = null; img.src = school.hero_image || ""; };
      box.querySelector("a").addEventListener("click", e => {
        if (preview) return; // ko'rib chiqishda havola YouTube'ni yangi oynada ochadi
        e.preventDefault();
        box.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${esc(id)}?autoplay=1" title="Video" allow="autoplay; accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      });
    }
    // Rasm yuklansagina ko'rsatiladi; yuklanmasa avvalgi ko'rinish qoladi.
    const photo = (sel, src, onShow) => { if (!src) return; const im = $(sel); im.onload = () => { im.hidden = false; onShow && onShow(); }; im.src = src; };
    // Ekran o'lchamiga mos rasm: brauzer kerakli hajmdagisini o'zi tanlaydi.
    if (school.hero_srcset) { const h = $("#hero-photo"); h.srcset = school.hero_srcset; h.sizes = "100vw"; }
    photo("#hero-photo", school.hero_image);
    if (school.phone) $("#call-fab").href = "tel:" + school.phone.replace(/[^\d+]/g, "");
    const G = school.gallery || [];
    if (!G.length) $("#gallery").hidden = true;
    $("#gallery-grid").innerHTML = G.map((g, i) => `<button type="button" class="g-item" data-i="${i}"><img src="assets/gallery/${esc(g)}-s.jpg" alt="" loading="lazy"></button>`).join("");
    const more = $("#gallery-more");
    if (G.length > 10) { more.hidden = false; more.onclick = () => { $("#gallery-grid").classList.add("open"); more.hidden = true; }; }
    const lb = $("#lightbox"), lbImg = lb.querySelector("img"); let cur = 0;
    const show = i => { cur = (i + G.length) % G.length; lbImg.src = `assets/gallery/${G[cur]}.jpg`; lb.hidden = false; };
    $("#gallery-grid").addEventListener("click", e => { const b = e.target.closest(".g-item"); if (b) show(+b.dataset.i); });
    lb.querySelector(".lb-prev").onclick = e => { e.stopPropagation(); show(cur - 1); };
    lb.querySelector(".lb-next").onclick = e => { e.stopPropagation(); show(cur + 1); };
    lb.addEventListener("click", e => { if (e.target === lb || e.target.classList.contains("lb-close")) lb.hidden = true; });
    addEventListener("keydown", e => { if (lb.hidden) return; if (e.key === "Escape") lb.hidden = true; if (e.key === "ArrowRight") show(cur + 1); if (e.key === "ArrowLeft") show(cur - 1); });
    const socials = [
      ["tg", "Telegram", tg, "@" + school.telegram],
      ["ig", "Instagram", "https://www.instagram.com/" + school.instagram, "@" + school.instagram],
      ["yt", "YouTube", "https://www.youtube.com/" + school.youtube, school.youtube]
    ];
    $("#socials").innerHTML = socials.map(([c, name, href, handle]) =>
      `<a class="social" href="${esc(href)}" target="_blank" rel="noopener" aria-label="${name}"><span class="ic ${c}">${ICONS[c]}</span>${name}<small>${esc(handle)}</small></a>`).join("");
  }
  render();
}

document.querySelectorAll(".lang button").forEach(b => b.addEventListener("click", () => {
  lang = b.dataset.lang;
  try { localStorage.setItem("lang", lang); } catch (e) {}
  render();
}));
const bar = $(".topbar"), onScroll = () => bar.classList.toggle("scrolled", scrollY > 40);
addEventListener("scroll", onScroll, { passive: true }); onScroll();
const burger = $("#burger"), links = $("#links");
burger.addEventListener("click", () => burger.setAttribute("aria-expanded", String(links.classList.toggle("open"))));
links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => { links.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); }));
init();
