export const initFooterYear = () => {
  const footerYear = document.querySelector('.footer__bottom > span');

  if (!footerYear) {
    return;
  }

  const currentYear = new Date().getFullYear();
  footerYear.textContent = footerYear.textContent.replace(/\b\d{4}\b/, String(currentYear));
};
