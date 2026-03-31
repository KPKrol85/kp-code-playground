export const initBackToTop = () => {
  const backToTop = document.querySelector('[data-back-to-top]');
  if (!backToTop) return;

  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('back-to-top--visible', window.scrollY > 500);
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
};
