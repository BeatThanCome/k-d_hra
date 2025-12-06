document.addEventListener('DOMContentLoaded', () => {
  const buttons = Array.from(document.querySelectorAll('.img-button'));
  if (!buttons.length) return;

  // toggle clicked button; stop propagation so document click doesn't immediately close it
  buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      // optionally close others when one opens:
      buttons.forEach(b => { if (b !== btn) { b.classList.remove('is-active'); b.setAttribute('aria-pressed', 'false'); } });

      const expanded = btn.classList.toggle('is-active');
      btn.setAttribute('aria-pressed', String(expanded));
      e.stopPropagation();
    });
  });

  // click outside: close any active button
  document.addEventListener('click', (e) => {
    buttons.forEach((btn) => {
      if (!btn.contains(e.target) && btn.classList.contains('is-active')) {
        btn.classList.remove('is-active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });
  });

 
});

