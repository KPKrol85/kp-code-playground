(() => {
  const workflows = {
    triage:
      'Classifying severity from telemetry and opening a coordinated response brief for on-call plus customer success.',
    handoff:
      'Summarizing issue context, adding SLA risk signals, and escalating to Tier-2 with owner-ready next actions.',
    renewal:
      'Detecting adoption gaps, drafting account-specific recommendations, and preparing renewal briefing notes for CSM review.'
  };

  const chipNodes = Array.from(document.querySelectorAll('.hero-ai-signal-chip'));
  const previewText = document.querySelector('[data-preview-text]');
  const revealNodes = Array.from(document.querySelectorAll('.hero-ai-signal-reveal'));
  const glowPanel = document.querySelector('[data-glow-panel]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (chipNodes.length && previewText) {
    const setActive = (chip) => {
      const key = chip?.dataset.workflow;
      if (!key || !workflows[key]) return;

      chipNodes.forEach((node) => {
        const isSelected = node === chip;
        node.classList.toggle('is-active', isSelected);
        node.setAttribute('aria-pressed', String(isSelected));
      });

      previewText.textContent = workflows[key];
    };

    chipNodes.forEach((chip) => {
      chip.addEventListener('click', () => setActive(chip));
      chip.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          setActive(chip);
        }
      });
    });
  }

  if (revealNodes.length) {
    if (reducedMotion || !('IntersectionObserver' in window)) {
      revealNodes.forEach((node) => node.classList.add('is-visible'));
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );
      revealNodes.forEach((node) => observer.observe(node));
    }
  }

  if (glowPanel && !reducedMotion) {
    glowPanel.addEventListener('pointermove', (event) => {
      const rect = glowPanel.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      glowPanel.style.setProperty('--hero-ai-signal-glow-x', `${x}%`);
      glowPanel.style.setProperty('--hero-ai-signal-glow-y', `${y}%`);
    });
  }
})();
