(() => {
  const bar = document.getElementById('scrollprog');
  if (!bar) return;
  let pending = false;
  bar.setAttribute('aria-hidden', 'true');
  bar.style.pointerEvents = 'none';
  // Follow the scroll position directly, without a second CSS animation.
  bar.style.transition = 'none';
  function update() {
    pending = false;
    const page = document.scrollingElement || document.documentElement;
    const range = page.scrollHeight - page.clientHeight;
    const progress = range > 0 ? Math.max(0, Math.min(1, page.scrollTop / range)) : 0;
    bar.style.transform = `scaleX(${progress})`;
  }
  function schedule() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(update);
  }
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('load', schedule);
  window.addEventListener('pageshow', schedule);
  document.addEventListener('toggle', schedule, true);
  document.addEventListener('load', schedule, true);
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    observer.observe(document.documentElement);
  }
  if (document.fonts) document.fonts.ready.then(schedule);
  schedule();
})();
