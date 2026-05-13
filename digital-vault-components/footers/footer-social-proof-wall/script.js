(() => {
  const footer = document.querySelector('.proof-footer');
  if (!footer) return;

  const yearNode = footer.querySelector('[data-current-year]');
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  const statusNode = footer.querySelector('[data-proof-status]');
  const cards = Array.from(footer.querySelectorAll('[data-testimonial-card]'));

  const announce = (message) => {
    if (statusNode) {
      statusNode.textContent = message;
    }
  };

  const setSelection = (activeCard) => {
    cards.forEach((card, index) => {
      const selectButton = card.querySelector('[data-select-testimonial]');
      const isActive = card === activeCard;
      card.classList.toggle('is-selected', isActive);
      card.setAttribute('aria-current', isActive ? 'true' : 'false');
      if (selectButton) {
        selectButton.setAttribute('aria-pressed', String(isActive));
      }
      if (isActive) {
        announce(`Highlighted testimonial ${index + 1}.`);
      }
    });
  };

  const getSnippet = (card) => {
    const quote = card.querySelector('blockquote')?.textContent?.trim() ?? '';
    const person = card.querySelector('.proof-footer__testimonial-meta')?.textContent?.trim() ?? '';
    return `${quote} — ${person}`;
  };

  footer.addEventListener('click', async (event) => {
    const selectButton = event.target.closest('[data-select-testimonial]');
    if (selectButton) {
      const card = selectButton.closest('[data-testimonial-card]');
      if (card) {
        setSelection(card);
      }
      return;
    }

    const copyButton = event.target.closest('[data-copy-testimonial]');
    if (!copyButton) return;

    const card = copyButton.closest('[data-testimonial-card]');
    if (!card) return;

    const snippet = getSnippet(card);

    try {
      await navigator.clipboard.writeText(snippet);
      card.classList.add('is-copied');
      announce('Testimonial snippet copied to clipboard.');
      setTimeout(() => card.classList.remove('is-copied'), 1200);
    } catch (error) {
      announce('Clipboard is unavailable. You can still select and copy text manually.');
    }
  });
})();
