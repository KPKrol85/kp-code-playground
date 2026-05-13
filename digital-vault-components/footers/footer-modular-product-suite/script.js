(() => {
  const root = document.querySelector('.suite-footer');
  if (!root) return;

  const yearEl = root.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const branchCopy = {
    studio: {
      title: 'Studio',
      description: 'Client-facing service branch for websites, audits, delivery execution, and proof of outcomes.'
    },
    vault: {
      title: 'Vault',
      description: 'Digital product branch for monetized assets, reusable libraries, and curated releases.'
    },
    system: {
      title: 'System',
      description: 'Platform strategy branch connecting ecosystem vision, roadmap, and architecture decisions.'
    },
    tools: {
      title: 'Tools',
      description: 'Utility branch with practical calculators, checklists, prompts, and workflow accelerators.'
    },
    components: {
      title: 'Components',
      description: 'Interface branch for production-ready UI modules that scale across products and teams.'
    },
    resources: {
      title: 'Resources',
      description: 'Knowledge branch for documentation, guides, updates, and operational learning.'
    }
  };

  const branchButtons = Array.from(root.querySelectorAll('[data-branch]'));
  const branchCards = Array.from(root.querySelectorAll('[data-branch-card]'));
  const titleEl = root.querySelector('[data-branch-title]');
  const descEl = root.querySelector('[data-branch-description]');

  function selectBranch(key) {
    const branch = branchCopy[key];
    if (!branch) return;
    branchButtons.forEach((btn) => {
      const selected = btn.dataset.branch === key;
      btn.classList.toggle('is-selected', selected);
      btn.setAttribute('aria-pressed', String(selected));
    });
    branchCards.forEach((card) => card.classList.toggle('is-selected-card', card.dataset.branchCard === key));
    if (titleEl) titleEl.textContent = branch.title;
    if (descEl) descEl.textContent = branch.description;
  }

  branchButtons.forEach((btn) => {
    btn.addEventListener('click', () => selectBranch(btn.dataset.branch));
  });

  const copyBtn = root.querySelector('[data-copy-map]');
  const feedbackEl = root.querySelector('[data-copy-feedback]');

  async function copyMapPath() {
    const activeBtn = root.querySelector('.suite-footer__branch-btn.is-selected');
    const selectedKey = activeBtn?.dataset.branch || 'studio';
    const mapPath = `KP_Code Suite / ${branchCopy[selectedKey].title} / Ecosystem Map`;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(mapPath);
        if (feedbackEl) feedbackEl.textContent = 'Suite path copied.';
      } else {
        if (feedbackEl) feedbackEl.textContent = `Copy manually: ${mapPath}`;
      }
    } catch (error) {
      if (feedbackEl) feedbackEl.textContent = 'Copy unavailable in this browser context.';
    }
  }

  if (copyBtn) copyBtn.addEventListener('click', copyMapPath);
})();
