(() => {
  const header = document.querySelector('.header');
  const nav = header?.querySelector('.nav');
  if (!nav) return;
  nav.id = 'primary-navigation';
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'menu-toggle';
  button.textContent = 'Меню';
  button.setAttribute('aria-controls', nav.id);
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-label', 'Открыть меню');
  nav.after(button);
  function setOpen(open) {
    nav.classList.toggle('mobile-open', open);
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    button.textContent = open ? '×' : 'Меню';
  }
  button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', e => { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('click', e => { if (!header.contains(e.target)) setOpen(false); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') { setOpen(false); button.focus(); }
  });
  matchMedia('(max-width:1150px)').addEventListener('change', () => setOpen(false));
})();
