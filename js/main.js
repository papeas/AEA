// ============================================================
//  Nexus site — content is data-driven (see content.json / admin.html)
// ============================================================

// Built-in defaults (used if content.json is missing and no admin edits saved)
const DEFAULTS = {
  hero: { tagline: "Nexus is a small studio crafting bold, high-energy digital experiences for ambitious brands." },
  about: { story: "Founded in 2026, Nexus was born from a simple frustration: too many small businesses get handed the same tired templates. We do the opposite — every site is designed from a blank page, around your story, your goals, and the people you're trying to reach. No bloated teams, no endless meetings. Just focused people making fast, beautiful things." },
  contact: {
    dm: "https://ig.me/m/nexus_aea",
    instagram: "https://www.instagram.com/nexus_aea?igsh=aW5jZGtiejl5bTRi",
    tiktok: "https://www.tiktok.com/@nexus_aea?_r=1&_t=ZN-97qbXWTNPzK"
  },
  projects: [
    { title: "Bloom & Co.",     tag: "E-commerce", cat: "ecommerce", color: "radial-gradient(90% 90% at 18% 18%, #ffb27a 0%, transparent 50%), radial-gradient(85% 85% at 82% 24%, #ff4f7e 0%, transparent 55%), radial-gradient(120% 120% at 60% 105%, #4a1e4d 0%, transparent 60%), linear-gradient(150deg, #2c1430, #9c3a63)", image: "" },
    { title: "Driftboard",      tag: "SaaS",       cat: "saas",      color: "radial-gradient(90% 90% at 22% 16%, #7fd6ff 0%, transparent 50%), radial-gradient(85% 85% at 82% 30%, #2e6bff 0%, transparent 55%), radial-gradient(120% 120% at 50% 105%, #0c1638 0%, transparent 60%), linear-gradient(155deg, #0e1a3c, #274bb8)", image: "" },
    { title: "Studio Vega",     tag: "Portfolio",  cat: "portfolio", color: "radial-gradient(90% 90% at 24% 20%, #cf8bff 0%, transparent 50%), radial-gradient(80% 80% at 82% 20%, #ff5aa0 0%, transparent 52%), radial-gradient(120% 120% at 58% 105%, #1a0f38 0%, transparent 60%), linear-gradient(150deg, #170e2e, #5a2a94)", image: "" },
    { title: "Orbit Labs",      tag: "Launch",     cat: "launch",    color: "radial-gradient(85% 85% at 20% 24%, #5b8dff 0%, transparent 50%), radial-gradient(85% 85% at 84% 34%, #ff5ea0 0%, transparent 52%), radial-gradient(120% 120% at 55% 105%, #0a0d2a 0%, transparent 60%), linear-gradient(155deg, #0b0f2c, #35267f)", image: "" },
    { title: "Coast Supply",    tag: "E-commerce", cat: "ecommerce", color: "radial-gradient(90% 90% at 18% 22%, #6fe3cb 0%, transparent 50%), radial-gradient(85% 85% at 82% 28%, #3b82f6 0%, transparent 55%), radial-gradient(120% 120% at 60% 105%, #0d2b3a 0%, transparent 60%), linear-gradient(155deg, #0e2735, #2b6a86)", image: "" },
    { title: "Pulse Analytics", tag: "SaaS",       cat: "saas",      color: "radial-gradient(90% 90% at 22% 20%, #ff9d78 0%, transparent 50%), radial-gradient(85% 85% at 80% 30%, #d43e93 0%, transparent 55%), radial-gradient(120% 120% at 55% 105%, #22103a 0%, transparent 60%), linear-gradient(155deg, #1a1030, #6f2b86)", image: "" }
  ],
  reviews: [
    { initials: "MC", name: "Maya Chen",     role: "Founder, Bloom & Co.",        quote: "Nexus turned a vague idea into a site that actually converts. Sharp, fast, and genuinely fun to work with." },
    { initials: "DO", name: "David Okafor",  role: "CEO, Driftboard",             quote: "The best agency experience we've had. They shipped in three weeks what others quoted three months for." },
    { initials: "SM", name: "Sofia Marín",   role: "Marketing Lead, Orbit Labs",  quote: "Our traffic doubled after launch. The whole site just feels alive — people notice it." },
    { initials: "PN", name: "Priya Nair",    role: "CTO, Pulse Analytics",        quote: "Clean code, beautiful design, zero drama. We're already planning the next project with them." },
    { initials: "TW", name: "Tom Whitfield", role: "Owner, Coast Supply",         quote: "Coast Supply has never looked better — sales are up and the whole team is thrilled." }
  ]
};

const STORAGE_KEY = "nexus_content";

function deepMerge(base, over) {
  const out = Array.isArray(base) ? base.slice() : { ...base };
  for (const k in over) {
    const v = over[k];
    if (v && typeof v === "object" && !Array.isArray(v) &&
        base[k] && typeof base[k] === "object" && !Array.isArray(base[k])) {
      out[k] = deepMerge(base[k], v);
    } else {
      out[k] = v;
    }
  }
  return out;
}

async function loadContent() {
  let data = JSON.parse(JSON.stringify(DEFAULTS));
  try {
    const res = await fetch("content.json", { cache: "no-store" });
    if (res.ok) data = deepMerge(data, await res.json());
  } catch (e) { /* file:// or offline — use defaults */ }
  try {
    const ls = localStorage.getItem(STORAGE_KEY);
    if (ls) data = deepMerge(data, JSON.parse(ls));
  } catch (e) { /* ignore bad localStorage */ }
  return data;
}

// --- escaping helpers ---
const escHtml = (s) => String(s == null ? "" : s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const STAR = '<svg viewBox="0 0 24 24" fill="url(#starGrad)"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>';
const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M7 7h10v10"/></svg>';

function renderProjects(projects) {
  const grid = document.getElementById("workGrid");
  if (!grid) return;
  grid.innerHTML = (projects || []).map((p, i) => {
    const delay = ["", "d1", "d2"][i % 3];
    const bg = p.image
      ? `center/cover no-repeat url('${escHtml(p.image)}')`
      : escHtml(p.color || "linear-gradient(135deg, #ff2e93, #2e6bff)");
    return `
      <a class="work-item reveal ${delay}" data-cat="${escHtml(p.cat || "all")}" href="#contact" aria-label="${escHtml(p.title)} — ${escHtml(p.tag)} project">
        <div class="thumb${p.image ? " has-image" : ""}" style="background:${bg}"></div>
        <div class="arrow">${ARROW}</div>
        <div class="overlay"><span class="tag">${escHtml(p.tag)}</span><h3>${escHtml(p.title)}</h3></div>
      </a>`;
  }).join("");
}

function renderReviews(reviews) {
  const track = document.getElementById("reviewsTrack");
  if (!track) return;
  const card = (r, dup) => `
    <figure class="review-card${dup ? " review-dup" : ""}"${dup ? ' aria-hidden="true"' : ""}>
      <div class="review-stars">${STAR.repeat(5)}</div>
      <blockquote class="review-quote">"${escHtml(r.quote)}"</blockquote>
      <figcaption class="review-author"><span class="review-avatar">${escHtml(r.initials)}</span><span><span class="review-name">${escHtml(r.name)}</span><br /><span class="review-role">${escHtml(r.role)}</span></span></figcaption>
    </figure>`;
  const list = reviews || [];
  // set 1 + duplicate set for the seamless marquee loop
  track.innerHTML = list.map((r) => card(r, false)).join("") + list.map((r) => card(r, true)).join("");
}

function applyContent(c) {
  const set = (id, val, prop) => {
    const el = document.getElementById(id);
    if (el) el[prop] = val;
  };
  set("heroTagline", c.hero.tagline, "textContent");
  set("aboutStory", c.about.story, "textContent");
  set("contactCta", c.contact.dm, "href");
  set("menuContact", c.contact.dm, "href");
  set("socialInstagram", c.contact.instagram, "href");
  set("socialTiktok", c.contact.tiktok, "href");
}

// ============================================================
//  Flowing animated background (canvas) — soft drifting colour fields
// ============================================================
function initBackground() {
  const canvas = document.getElementById("bgCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let W = 0, H = 0, DPR = 1;

  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 1.5);
    W = canvas.width = Math.floor(window.innerWidth * DPR);
    H = canvas.height = Math.floor(window.innerHeight * DPR);
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
  }
  resize();
  window.addEventListener("resize", resize, { passive: true });

  // pink ↔ blue only, large soft blobs for a smooth liquid flow
  const palette = ["#ff2e93", "#ff6ec4", "#2e6bff", "#4facfe"];
  const orbs = palette.map((color, i) => ({
    color,
    bx: 0.18 + (i / palette.length) * 0.64,
    by: 0.30 + ((i * 0.41) % 1) * 0.42,
    r: 0.46 + (i % 2) * 0.12,
    dir: i % 2 ? 1 : -1,
    px: Math.random() * Math.PI * 2,
    py: Math.random() * Math.PI * 2,
    sp: 0.00018 + Math.random() * 0.00012
  }));

  let mx = 0.5, my = 0.5, tmx = 0.5, tmy = 0.5;
  if (!reduce) {
    window.addEventListener("mousemove", (e) => {
      tmx = e.clientX / window.innerWidth;
      tmy = e.clientY / window.innerHeight;
    }, { passive: true });
  }

  // scroll drives the flow — the background moves as you scroll the page
  let scrollY = window.scrollY || 0, tScrollY = scrollY;
  window.addEventListener("scroll", () => { tScrollY = window.scrollY; }, { passive: true });

  const rgba = (hex, a) => {
    const n = parseInt(hex.slice(1), 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
  };

  function frame(t) {
    mx += (tmx - mx) * 0.03;
    my += (tmy - my) * 0.03;
    scrollY += (tScrollY - scrollY) * 0.08; // eased scroll follow
    const docH = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const sf = Math.min(1, Math.max(0, scrollY / docH)); // 0..1 scroll progress
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = "lighter";
    const base = Math.min(W, H);
    for (const o of orbs) {
      const cx = (o.bx
        + Math.sin(t * o.sp + o.px) * 0.18
        + Math.sin(sf * Math.PI * 2 + o.px) * 0.30   // scroll sweeps them across
        + (mx - 0.5) * 0.05) * W;
      const cy = (o.by
        + Math.cos(t * o.sp * 1.15 + o.py) * 0.18
        - sf * 1.1 * o.dir                            // scroll parallax up/down
        + (my - 0.5) * 0.05) * H;
      const rad = o.r * base * (1 + Math.sin(t * o.sp * 0.6 + o.py) * 0.08);
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
      // sharper falloff — a defined coloured core rather than a soft wash
      g.addColorStop(0, rgba(o.color, 0.78));
      g.addColorStop(0.32, rgba(o.color, 0.52));
      g.addColorStop(0.62, rgba(o.color, 0.16));
      g.addColorStop(1, rgba(o.color, 0));
      ctx.fillStyle = g;
      ctx.fillRect(cx - rad, cy - rad, rad * 2, rad * 2);
    }
    ctx.globalCompositeOperation = "source-over";
  }

  if (reduce) { frame(0); return; }
  (function loop(t) { frame(t); requestAnimationFrame(loop); })(0);
}

// ============================================================
//  Interactive behaviours (run after content is rendered)
// ============================================================
function initBehaviors() {
  // ---- Nav background on scroll ----
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // ---- Theme toggle ----
  const root = document.documentElement;
  document.getElementById("themeToggle").addEventListener("click", () => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const current = root.getAttribute("data-theme") || (isDark ? "dark" : "light");
    root.setAttribute("data-theme", current === "dark" ? "light" : "dark");
  });

  // ---- Drop-down menu ----
  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("menu");
  const setMenu = (open) => {
    hamburger.classList.toggle("open", open);
    menu.classList.toggle("open", open);
    document.body.classList.toggle("menu-open", open);
    hamburger.setAttribute("aria-expanded", open ? "true" : "false");
    hamburger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.setAttribute("aria-hidden", open ? "false" : "true");
  };
  hamburger.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
  const menuLinks = Array.from(menu.querySelectorAll(".menu-link"));
  menuLinks.forEach((l) => l.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  // ---- Active section highlight (scroll-spy) ----
  const spySections = ["about", "services", "work", "pricing", "reviews", "contact"]
    .map((id) => document.getElementById(id)).filter(Boolean);
  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          menuLinks.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
        }
      });
    }, { rootMargin: "-45% 0px -45% 0px" });
    spySections.forEach((s) => spy.observe(s));
  }

  // ---- "How we work" vertical scroll bullets ----
  (function () {
    const strip = document.querySelector(".values");
    const nav = document.querySelector(".values-nav");
    if (!strip || !nav) return;
    const items = Array.from(strip.querySelectorAll(".value"));
    const dots = Array.from(nav.querySelectorAll("button"));
    dots.forEach((dot, i) => dot.addEventListener("click", () => {
      strip.scrollTo({ top: items[i].offsetTop, behavior: "smooth" });
    }));
    const update = () => {
      let idx = 0, best = Infinity;
      items.forEach((it, i) => {
        const d = Math.abs(it.offsetTop - strip.scrollTop);
        if (d < best) { best = d; idx = i; }
      });
      if (strip.scrollTop + strip.clientHeight >= strip.scrollHeight - 4) idx = items.length - 1;
      dots.forEach((dot, i) => dot.classList.toggle("active", i === idx));
    };
    strip.addEventListener("scroll", () => requestAnimationFrame(update), { passive: true });
    window.addEventListener("resize", () => requestAnimationFrame(update), { passive: true });
    update();
  })();

  // ---- Portfolio category filter ----
  const chips = Array.from(document.querySelectorAll(".chip"));
  const workItems = Array.from(document.querySelectorAll(".work-item"));
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => { c.classList.remove("active"); c.setAttribute("aria-pressed", "false"); });
      chip.classList.add("active");
      chip.setAttribute("aria-pressed", "true");
      const f = chip.dataset.filter;
      workItems.forEach((it) => {
        const show = f === "all" || it.dataset.cat === f;
        it.classList.toggle("is-hidden", !show);
        if (show) { it.style.animation = "none"; void it.offsetWidth; it.style.animation = ""; }
      });
    });
  });

  // ---- Reviews: press a review to pause, press elsewhere to resume ----
  (function () {
    const marquee = document.querySelector(".reviews-marquee");
    if (!marquee) return;
    marquee.addEventListener("click", (e) => { e.stopPropagation(); marquee.classList.add("paused"); });
    document.addEventListener("click", () => marquee.classList.remove("paused"));
  })();

  // ---- Custom cursor (fine pointers only) ----
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    const dot = document.querySelector(".cursor-dot");
    const ring = document.querySelector(".cursor-ring");
    document.body.classList.add("cursor-on");
    const reduceC = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let mx = window.innerWidth / 2, my = window.innerHeight / 2, rx = mx, ry = my;
    window.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = "translate(" + mx + "px," + my + "px)";
    });
    const render = () => {
      const ease = reduceC ? 1 : 0.18;
      rx += (mx - rx) * ease;
      ry += (my - ry) * ease;
      ring.style.transform = "translate(" + rx + "px," + ry + "px)";
      requestAnimationFrame(render);
    };
    render();
    document.querySelectorAll("a, button, .card, .work-item, .stat").forEach((el) => {
      el.addEventListener("mouseenter", () => ring.classList.add("hover"));
      el.addEventListener("mouseleave", () => ring.classList.remove("hover"));
    });
    document.addEventListener("mouseleave", () => { dot.style.opacity = "0"; ring.style.opacity = "0"; });
    document.addEventListener("mouseenter", () => { dot.style.opacity = ""; ring.style.opacity = ""; });
  }

  // ---- Scroll reveals (robust: content can never stay hidden) ----
  (function () {
    let els = Array.from(document.querySelectorAll(".reveal"));
    if (!els.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const reveal = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      els = els.filter((el) => {
        if (el.getBoundingClientRect().top < vh * 0.9) { el.classList.add("in"); return false; }
        return true;
      });
    };
    reveal();
    window.addEventListener("scroll", () => requestAnimationFrame(reveal), { passive: true });
    window.addEventListener("resize", () => requestAnimationFrame(reveal), { passive: true });
    window.addEventListener("load", reveal);
    setTimeout(() => els.forEach((el) => el.classList.add("in")), 4000);
  })();
}

// ---- Boot: load content, render, then wire behaviours ----
(async function boot() {
  initBackground();
  const content = await loadContent();
  renderProjects(content.projects);
  renderReviews(content.reviews);
  applyContent(content);
  initBehaviors();
})();
