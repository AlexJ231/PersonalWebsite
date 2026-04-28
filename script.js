/* FRACTAL//STUDIO — micro-interactions */

(() => {
  // (CSS spin animation handles the decal motion — no JS parallax needed)

  // ── reveal on intersect ────────────────────────────────
  const targets = document.querySelectorAll(
    '.work, .model, .reel, .hero__readout > div'
  );
  targets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity .6s ease, transform .6s cubic-bezier(.2,.7,.2,1)';
  });
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  targets.forEach(t => io.observe(t));

  // ── play button toggling (visual only) ────────────────
  document.querySelectorAll('.play').forEach(btn => {
    btn.addEventListener('click', () => {
      const playing = btn.classList.toggle('is-playing');
      btn.innerHTML = playing
        ? '<svg viewBox="0 0 24 24" width="14" height="14"><rect x="6" y="5" width="4" height="14" fill="currentColor"/><rect x="14" y="5" width="4" height="14" fill="currentColor"/></svg>'
        : '<svg viewBox="0 0 24 24" width="14" height="14"><polygon points="6,4 20,12 6,20" fill="currentColor"/></svg>';
    });
  });

  // ── live status string in header ───────────────────────
  const status = document.querySelector('.status-text');
  if (status) {
    const states = ['SIGNAL_LIVE', 'TRANSMITTING', 'CHANNEL_07', 'UPLINK_OK'];
    let i = 0;
    setInterval(() => {
      i = (i + 1) % states.length;
      status.textContent = states[i];
    }, 2600);
  }

  // ── tilt on work tiles ─────────────────────────────────
  document.querySelectorAll('.work').forEach(tile => {
    const media = tile.querySelector('.work__media');
    if (!media) return;
    tile.addEventListener('mousemove', e => {
      const r = tile.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width  - 0.5) * 6;
      const y = ((e.clientY - r.top)  / r.height - 0.5) * 6;
      media.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${-y}deg)`;
    });
    tile.addEventListener('mouseleave', () => {
      media.style.transform = '';
    });
  });

  // ── randomize wave seed per reel ───────────────────────
  document.querySelectorAll('.reel__wave').forEach((w, i) => {
    w.style.opacity = 0.85 - (i * 0.05);
    w.style.filter = `hue-rotate(${i * 40}deg)`;
  });
})();
