(function () {
  const root = document.querySelector('.hero-security-shield-page');
  if (!root) return;

  const riskButtons = Array.from(document.querySelectorAll('.hero-security-shield-risk-btn'));
  const statusEl = document.querySelector('[data-security-status]');
  const detailEl = document.querySelector('[data-security-detail]');
  const scanProgress = document.querySelector('[data-scan-progress]');
  const copyBtn = document.querySelector('[data-copy-report]');
  const feedbackEl = document.querySelector('[data-copy-feedback]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const riskMap = {
    low: {
      status: 'Hardened Monitoring Active',
      detail: 'Primary controls are healthy. Continuous scans are passing with no active incident escalation.',
      width: '35%'
    },
    moderate: {
      status: 'Elevated Review In Progress',
      detail: 'Atypical access and endpoint behaviors detected. Review queues and response procedures are currently active.',
      width: '67%'
    },
    high: {
      status: 'Critical Containment Mode',
      detail: 'High-severity indicators require immediate triage. Incident commanders and forensic workflows should be engaged now.',
      width: '92%'
    }
  };

  function setRisk(level) {
    if (!riskMap[level] || !statusEl || !detailEl) return;
    riskButtons.forEach((button) => {
      const selected = button.dataset.riskLevel === level;
      button.classList.toggle('is-selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    statusEl.textContent = riskMap[level].status;
    detailEl.textContent = riskMap[level].detail;
    if (scanProgress) scanProgress.style.width = riskMap[level].width;
  }

  riskButtons.forEach((button) => {
    button.addEventListener('click', () => setRisk(button.dataset.riskLevel));
    button.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setRisk(button.dataset.riskLevel);
      }
    });
  });

  if (!prefersReducedMotion && scanProgress) {
    let t = 0;
    setInterval(() => {
      t = (t + 1) % 100;
      scanProgress.style.filter = `hue-rotate(${t * 1.2}deg)`;
    }, 160);
  }

  const revealItems = document.querySelectorAll('.hero-security-shield-reveal');
  if (revealItems.length) {
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealItems.forEach((el) => el.classList.add('is-visible'));
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
        { threshold: 0.16 }
      );
      revealItems.forEach((item) => observer.observe(item));
    }
  }

  if (copyBtn && feedbackEl && navigator.clipboard) {
    copyBtn.addEventListener('click', async () => {
      const text = `${statusEl?.textContent || ''} — ${detailEl?.textContent || ''}`.trim();
      if (!text) return;
      try {
        await navigator.clipboard.writeText(text);
        feedbackEl.textContent = 'Security report summary copied.';
      } catch {
        feedbackEl.textContent = 'Copy failed. You can select and copy the summary manually.';
      }
      window.setTimeout(() => {
        feedbackEl.textContent = '';
      }, 2500);
    });
  }

  setRisk('low');
})();
