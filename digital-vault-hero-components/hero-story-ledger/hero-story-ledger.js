(() => {
  const timelineButtons = document.querySelectorAll('.hero-story-ledger-timeline__step');
  const insightsContainer = document.querySelector('[data-ledger-insights]');
  const quoteNode = document.querySelector('[data-ledger-quote]');
  const attributionNode = document.querySelector('[data-ledger-attribution]');
  const progressBar = document.querySelector('[data-ledger-progress]');
  const heroSection = document.querySelector('.hero-story-ledger');
  const revealItems = document.querySelectorAll('.hero-story-ledger-reveal');

  const timelineData = [
    {
      insights: [
        { title: 'Initial Signal', text: '62% of teams relied on spreadsheets exported two weeks late.' },
        { title: 'Leadership Lens', text: 'The CEO reframed the issue as narrative trust, not tooling volume.' },
        { title: 'Decision', text: 'A cross-functional audit sprint was launched with daily findings.' }
      ],
      quote: 'The breakthrough began when we stopped asking for more charts and started asking which decisions were stalling.',
      attribution: 'Elena Park, Founder & CEO, Northline Systems'
    },
    {
      insights: [
        { title: 'Editorial Shift', text: 'Metrics were organized by strategic chapter instead of department silo.' },
        { title: 'Reader Clarity', text: 'Every report opened with narrative context, risk posture, and next action.' },
        { title: 'Momentum', text: 'Executive alignment sessions dropped from 90 to 35 minutes.' }
      ],
      quote: 'When the board could see causality, not just volume, confidence returned to the room.',
      attribution: 'Mira Sato, Head of Strategy'
    },
    {
      insights: [
        { title: 'Launch Window', text: 'Deployment rolled out in three controlled cohorts over six weeks.' },
        { title: 'Adoption Rate', text: 'Weekly active leadership readers climbed from 41% to 88%.' },
        { title: 'Product Outcome', text: 'Critical escalations were resolved a full cycle faster than prior quarters.' }
      ],
      quote: 'By sequencing delivery around the story, adoption felt inevitable instead of forced.',
      attribution: 'Ren Ortiz, VP Product Operations'
    },
    {
      insights: [
        { title: 'Governance Model', text: 'Narrative owners were assigned for each reporting chapter.' },
        { title: 'Continuity', text: 'The hero framework became the template for investor and customer updates.' },
        { title: 'Long-Term Effect', text: 'Forecast confidence stabilized, enabling bolder quarterly bets.' }
      ],
      quote: 'Sustainable reporting is not a dashboard artifact; it is a disciplined storytelling practice.',
      attribution: 'Alia Trent, Chief of Staff'
    }
  ];

  function renderStep(stepIndex) {
    if (!insightsContainer || !quoteNode || !attributionNode || !timelineData[stepIndex]) {
      return;
    }

    timelineButtons.forEach((button, index) => {
      const active = index === stepIndex;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });

    const currentStep = timelineData[stepIndex];
    insightsContainer.innerHTML = currentStep.insights
      .map(
        (insight) =>
          `<article class="hero-story-ledger-insights__card"><h3>${insight.title}</h3><p>${insight.text}</p></article>`
      )
      .join('');

    quoteNode.textContent = currentStep.quote;
    attributionNode.textContent = currentStep.attribution;
  }

  timelineButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const step = Number.parseInt(button.dataset.ledgerStep ?? '', 10);
      if (!Number.isNaN(step)) {
        renderStep(step);
      }
    });

    button.addEventListener('keydown', (event) => {
      const currentIndex = Number.parseInt(button.dataset.ledgerStep ?? '', 10);
      if (Number.isNaN(currentIndex)) {
        return;
      }

      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        event.preventDefault();
        const next = (currentIndex + 1) % timelineButtons.length;
        timelineButtons[next].focus();
        renderStep(next);
      }

      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        event.preventDefault();
        const prev = (currentIndex - 1 + timelineButtons.length) % timelineButtons.length;
        timelineButtons[prev].focus();
        renderStep(prev);
      }
    });
  });

  function updateProgress() {
    if (!heroSection || !progressBar) {
      return;
    }

    const bounds = heroSection.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const totalDistance = bounds.height + viewportHeight;
    const progressed = Math.min(Math.max((viewportHeight - bounds.top) / totalDistance, 0), 1);
    progressBar.style.width = `${Math.round(progressed * 100)}%`;
  }

  function initReveal() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      revealItems.forEach((item) => item.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.22 }
    );

    revealItems.forEach((item) => observer.observe(item));
  }

  renderStep(0);
  initReveal();
  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
})();
