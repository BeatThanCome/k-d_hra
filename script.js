document.addEventListener('DOMContentLoaded', () => {
  const buttons = Array.from(document.querySelectorAll('.img-button'));
  const choppingBoard = document.getElementById('choppingBoard');
  
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      // close others when one opens
      buttons.forEach(b => { 
        if (b !== btn) { 
          b.classList.remove('is-active'); 
          b.setAttribute('aria-pressed', 'false'); 
        } 
      });

      const expanded = btn.classList.toggle('is-active');
      btn.setAttribute('aria-pressed', String(expanded));
      e.stopPropagation();

      // add food image to chopping board when clicked
      if (expanded) {
        const img = btn.querySelector('img');
        const foodClone = img.cloneNode();
        foodClone.classList.add('chopping-board-item');
        choppingBoard.appendChild(foodClone);
      }
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

