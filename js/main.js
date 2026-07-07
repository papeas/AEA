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
  menu.querySelectorAll('.menu-link').forEach((l) => l.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

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
