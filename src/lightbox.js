/* Photo lightbox: progressive enhancement over the plain <a href> grid.
   With JS off every thumbnail still links straight to the full image. */
(function () {
  const box = document.getElementById('lightbox');
  const links = Array.from(document.querySelectorAll('[data-lightbox] a[href]'));
  if (!box || !links.length) return;

  const el = (id) => document.getElementById(id);
  const ui = {
    img: el('lb-img'),
    prev: el('lb-prev'),
    next: el('lb-next'),
    close: el('lb-close'),
    count: el('lb-count'),
  };

  const shots = links.map((node, i) => {
    const thumb = node.querySelector('img');
    return {
      i,
      node,
      src: node.getAttribute('href'),
      alt: (thumb && thumb.getAttribute('alt')) || '',
    };
  });

  let current = null;
  let lastFocus = null;

  function preload(i) {
    const s = shots[i];
    if (s) new Image().src = s.src;
  }

  function render(s) {
    current = s;
    ui.img.style.opacity = '0';
    ui.img.src = s.src;
    ui.img.alt = s.alt;
    ui.count.textContent = s.i + 1 + ' / ' + shots.length;
    ui.prev.disabled = s.i === 0;
    ui.next.disabled = s.i === shots.length - 1;
    preload(s.i - 1);
    preload(s.i + 1);
  }

  function open(s) {
    lastFocus = document.activeElement;
    box.classList.remove('hidden');
    document.body.classList.add('lightbox-open');
    render(s);
    ui.close.focus();
  }

  function close() {
    const back = (current && current.node) || lastFocus;
    box.classList.add('hidden');
    document.body.classList.remove('lightbox-open');
    ui.img.removeAttribute('src');
    current = null;
    if (back && back.focus) back.focus({ preventScroll: true });
    if (back && back.scrollIntoView) back.scrollIntoView({ block: 'nearest' });
  }

  function step(delta) {
    if (!current) return;
    const nxt = shots[current.i + delta];
    if (nxt) render(nxt);
  }

  ui.img.addEventListener('load', () => {
    ui.img.style.opacity = '1';
  });

  shots.forEach((s) => {
    s.node.addEventListener('click', (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      e.preventDefault();
      open(s);
    });
  });

  ui.prev.addEventListener('click', () => step(-1));
  ui.next.addEventListener('click', () => step(1));
  ui.close.addEventListener('click', close);
  box.addEventListener('click', (e) => {
    if (!e.target.closest('button, img')) close();
  });

  document.addEventListener('keydown', (e) => {
    if (!current) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') step(-1);
    else if (e.key === 'ArrowRight') step(1);
    else if (e.key === 'Home') render(shots[0]);
    else if (e.key === 'End') render(shots[shots.length - 1]);
    else if (e.key === 'Tab') {
      const stops = [ui.prev, ui.next, ui.close].filter((b) => !b.disabled);
      const at = stops.indexOf(document.activeElement);
      const to = stops[(at + (e.shiftKey ? -1 : 1) + stops.length) % stops.length];
      if (to) {
        e.preventDefault();
        to.focus();
      }
      return;
    } else return;
    e.preventDefault();
  });

  let touchX = null;
  box.addEventListener(
    'touchstart',
    (e) => {
      touchX = e.changedTouches[0].clientX;
    },
    { passive: true }
  );
  box.addEventListener(
    'touchend',
    (e) => {
      if (touchX === null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      touchX = null;
      if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
    },
    { passive: true }
  );
})();
