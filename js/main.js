  // ---- Nav background on scroll ----
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // ---- Theme toggle (overrides OS preference for this session) ----
  const root = document.documentElement;
  document.getElementById('themeToggle').addEventListener('click', () => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const current = root.getAttribute('data-theme') || (isDark ? 'dark' : 'light');
    root.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
  });

  // ---- Drop-down menu ----
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('menu');
  const setMenu = (open) => {
    hamburger.classList.toggle('open', open);
    menu.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.setAttribute('aria-hidden', open ? 'false' : 'true');
  };
  hamburger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  const menuLinks = Array.from(menu.querySelectorAll('.menu-link'));
  menuLinks.forEach((l) => l.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  // ---- Active section highlight (scroll-spy) ----
  const spySections = ['about', 'services', 'work', 'reviews', 'contact']
    .map((id) => document.getElementById(id)).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          menuLinks.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px' });
    spySections.forEach((s) => spy.observe(s));
  }

  // ---- "How we work" scroll bullets ----
  (function () {
    const strip = document.querySelector('.values');
    const nav = document.querySelector('.values-nav');
    if (!strip || !nav) return;
    const items = Array.from(strip.querySelectorAll('.value'));
    const dots = Array.from(nav.querySelectorAll('button'));
    dots.forEach((dot, i) => dot.addEventListener('click', () => {
      strip.scrollTo({ top: items[i].offsetTop, behavior: 'smooth' });
    }));
    const update = () => {
      let idx = 0, best = Infinity;
      items.forEach((it, i) => {
        const d = Math.abs(it.offsetTop - strip.scrollTop);
        if (d < best) { best = d; idx = i; }
      });
      // snap the last dot on when scrolled to the very bottom
      if (strip.scrollTop + strip.clientHeight >= strip.scrollHeight - 4) idx = items.length - 1;
      dots.forEach((dot, i) => dot.classList.toggle('active', i === idx));
    };
    strip.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
    window.addEventListener('resize', () => requestAnimationFrame(update), { passive: true });
    update();
  })();

  // ---- Portfolio category filter ----
  const chips = Array.from(document.querySelectorAll('.chip'));
  const workItems = Array.from(document.querySelectorAll('.work-item'));
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => { c.classList.remove('active'); c.setAttribute('aria-pressed', 'false'); });
      chip.classList.add('active');
      chip.setAttribute('aria-pressed', 'true');
      const f = chip.dataset.filter;
      workItems.forEach((it) => {
        const show = f === 'all' || it.dataset.cat === f;
        it.classList.toggle('is-hidden', !show);
        if (show) { it.style.animation = 'none'; void it.offsetWidth; it.style.animation = ''; }
      });
    });
  });

  // ---- Custom cursor (fine pointers only) ----
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    document.body.classList.add('cursor-on');
    const reduceC = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let mx = window.innerWidth / 2, my = window.innerHeight / 2, rx = mx, ry = my;
    window.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = 'translate(' + mx + 'px,' + my + 'px)';
    });
    const render = () => {
      const ease = reduceC ? 1 : 0.18;
      rx += (mx - rx) * ease;
      ry += (my - ry) * ease;
      ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px)';
      requestAnimationFrame(render);
    };
    render();
    document.querySelectorAll('a, button, .card, .work-item, .stat').forEach((el) => {
      el.addEventListener('mouseenter', () => ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });
    document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { dot.style.opacity = ''; ring.style.opacity = ''; });
  }

  // ---- Scroll reveals (robust: content can never stay hidden) ----
  (function () {
    let els = Array.from(document.querySelectorAll('.reveal'));
    if (!els.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    const reveal = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      els = els.filter((el) => {
        // reveal once the element's top crosses the trigger line — including
        // elements already scrolled past (top < 0), so fast scrolls never skip one
        if (el.getBoundingClientRect().top < vh * 0.9) { el.classList.add('in'); return false; }
        return true;
      });
    };
    reveal();
    window.addEventListener('scroll', () => requestAnimationFrame(reveal), { passive: true });
    window.addEventListener('resize', () => requestAnimationFrame(reveal), { passive: true });
    window.addEventListener('load', reveal);
    // absolute fallback — guarantee everything is visible even if the above misses
    setTimeout(() => els.forEach((el) => el.classList.add('in')), 4000);
  })();
