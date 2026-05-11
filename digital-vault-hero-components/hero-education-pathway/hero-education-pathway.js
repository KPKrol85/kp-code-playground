(() => {
  const root = document.querySelector('.hero-education-pathway');
  if (!root) return;

  const steps = Array.from(root.querySelectorAll('.hero-education-pathway__step'));
  const previewTitle = root.querySelector('#hero-education-pathway-preview-title');
  const previewDescription = root.querySelector('#hero-education-pathway-preview-description');
  const previewList = root.querySelector('#hero-education-pathway-preview-list');
  const badge = root.querySelector('#hero-education-pathway-badge');
  const progressText = root.querySelector('#hero-education-pathway-progress-text');
  const progressFill = root.querySelector('#hero-education-pathway-progress-fill');
  const progressbar = root.querySelector('#hero-education-pathway-progressbar');

  if (!steps.length || !previewTitle || !previewDescription || !previewList || !badge || !progressText || !progressFill || !progressbar) {
    return;
  }

  const lessons = [
    {
      stage: 'Foundation',
      title: 'Learning Systems & Product Fundamentals',
      description: 'Build confidence with core frameworks, terminology, and study routines used throughout the program.',
      outcomes: [
        'Set a personal learning roadmap and weekly review rhythm.',
        'Understand the baseline workflow from brief to deliverable.',
        'Complete your first guided mini-assessment.'
      ]
    },
    {
      stage: 'Applied Skills',
      title: 'Hands-On Practice with Real-world Constraints',
      description: 'Translate theory into practical execution by solving scoped challenges with mentor-reviewed checkpoints.',
      outcomes: [
        'Deliver role-relevant assignments using a repeatable process.',
        'Practice peer critique and iteration on feedback cycles.',
        'Track consistency with weekly performance reflections.'
      ]
    },
    {
      stage: 'Capstone Sprint',
      title: 'Portfolio Project with Guided Review',
      description: 'Synthesize learning into a complete capstone artifact that demonstrates capability and decision quality.',
      outcomes: [
        'Ship a comprehensive project with documented rationale.',
        'Present milestones to mentors using review-ready structure.',
        'Refine scope, pacing, and quality under realistic deadlines.'
      ]
    },
    {
      stage: 'Career Launch',
      title: 'Career Storytelling & Interview Readiness',
      description: 'Prepare polished communication assets and rehearsal frameworks for interviews and networking.',
      outcomes: [
        'Develop role-targeted case walkthrough narratives.',
        'Improve profile positioning and professional communication.',
        'Run mock interviews with objective scorecards.'
      ]
    }
  ];

  const activateStep = (index) => {
    const safeIndex = Number.isInteger(index) && index >= 0 && index < lessons.length ? index : 0;
    const data = lessons[safeIndex];

    steps.forEach((step, i) => {
      const active = i === safeIndex;
      step.classList.toggle('is-active', active);
      step.setAttribute('aria-pressed', String(active));
    });

    badge.textContent = `Current Stage · ${data.stage}`;
    previewTitle.textContent = data.title;
    previewDescription.textContent = data.description;
    previewList.innerHTML = '';
    data.outcomes.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      previewList.appendChild(li);
    });

    const stepNumber = safeIndex + 1;
    const total = lessons.length;
    const progressLabel = `Step ${stepNumber} of ${total} complete`;
    progressText.textContent = progressLabel;
    progressFill.style.width = `${(stepNumber / total) * 100}%`;
    progressbar.setAttribute('aria-valuenow', String(stepNumber));
    progressbar.setAttribute('aria-valuetext', progressLabel);
  };

  steps.forEach((step) => {
    step.addEventListener('click', () => {
      const idx = Number.parseInt(step.dataset.step ?? '', 10);
      activateStep(Number.isNaN(idx) ? 0 : idx);
    });

    step.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      event.preventDefault();
      const current = steps.findIndex((btn) => btn.classList.contains('is-active'));
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      const next = (current + direction + steps.length) % steps.length;
      steps[next].focus();
      activateStep(next);
    });
  });

  const motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = Array.from(document.querySelectorAll('.hero-education-pathway-reveal'));

  if (motionReduced) {
    revealItems.forEach((el) => el.classList.add('is-visible'));
  } else if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, ob) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        ob.unobserve(entry.target);
      });
    }, { threshold: 0.2 });

    revealItems.forEach((el) => observer.observe(el));
  } else {
    revealItems.forEach((el) => el.classList.add('is-visible'));
  }

  activateStep(0);
})();
