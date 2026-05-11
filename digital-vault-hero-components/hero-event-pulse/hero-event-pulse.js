(function () {
  const root = document.querySelector('.hero-event-pulse-page');
  if (!root) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const countdown = document.querySelector('.hero-event-pulse-countdown');
  const status = document.getElementById('hero-event-pulse-countdown-status');
  const unitEls = {
    days: countdown?.querySelector('[data-unit="days"]'),
    hours: countdown?.querySelector('[data-unit="hours"]'),
    minutes: countdown?.querySelector('[data-unit="minutes"]'),
    seconds: countdown?.querySelector('[data-unit="seconds"]')
  };

  function pad(n) { return String(n).padStart(2, '0'); }

  if (countdown && status && unitEls.days && unitEls.hours && unitEls.minutes && unitEls.seconds) {
    const targetDate = new Date(countdown.dataset.eventDate || '').getTime();
    let intervalId;

    const renderCountdown = () => {
      if (!Number.isFinite(targetDate)) {
        status.textContent = 'Event date unavailable. Please check back soon.';
        return;
      }

      const diff = targetDate - Date.now();
      if (diff <= 0) {
        unitEls.days.textContent = '00';
        unitEls.hours.textContent = '00';
        unitEls.minutes.textContent = '00';
        unitEls.seconds.textContent = '00';
        status.textContent = 'We are live now. Join the event stream.';
        if (intervalId) clearInterval(intervalId);
        return;
      }

      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);

      unitEls.days.textContent = pad(days);
      unitEls.hours.textContent = pad(hours);
      unitEls.minutes.textContent = pad(minutes);
      unitEls.seconds.textContent = pad(seconds);
    };

    renderCountdown();
    intervalId = setInterval(renderCountdown, 1000);
  }

  const sessionData = [
    {
      labelId: 'session-tab-1',
      time: '10:00 AM PT',
      title: 'Designing AI Products People Trust',
      summary: 'Mira Chen unpacks how category-defining teams ship fast while preserving trust, clarity, and customer confidence.',
      speaker: 'Speaker: Mira Chen · VP Product, Aether Labs'
    },
    {
      labelId: 'session-tab-2',
      time: '12:30 PM PT',
      title: 'Hands-on Growth Lab: From Waitlist to Revenue',
      summary: 'A tactical workshop on conversion architecture, launch sequencing, and offer positioning for high-intent audiences.',
      speaker: 'Facilitator: Jonah Reyes · Growth Director, Northline Studio'
    },
    {
      labelId: 'session-tab-3',
      time: '3:00 PM PT',
      title: 'Operator Panel: Shipping Faster Without Burning Teams',
      summary: 'Founders and product ops leaders discuss capacity planning, cross-functional rituals, and execution systems that scale.',
      speaker: 'Panel with Ava Solis, Kevin Park, and Rina Moreau'
    }
  ];

  const tabs = Array.from(document.querySelectorAll('.hero-event-pulse-sessions__controls [data-session]'));
  const panel = document.getElementById('session-panel');
  const title = panel?.querySelector('[data-session-title]');
  const summary = panel?.querySelector('[data-session-summary]');
  const speaker = panel?.querySelector('[data-session-speaker]');
  const time = panel?.querySelector('.hero-event-pulse-sessions__time');

  const setSession = (index) => {
    const item = sessionData[index];
    if (!item || !panel || !title || !summary || !speaker || !time) return;
    title.textContent = item.title;
    summary.textContent = item.summary;
    speaker.textContent = item.speaker;
    time.textContent = item.time;
    panel.setAttribute('aria-labelledby', item.labelId);

    tabs.forEach((tab, i) => {
      const selected = i === index;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
  };

  tabs.forEach((tab, idx) => {
    tab.addEventListener('click', () => setSession(idx));
    tab.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      event.preventDefault();
      const delta = event.key === 'ArrowRight' ? 1 : -1;
      const next = (idx + delta + tabs.length) % tabs.length;
      tabs[next]?.focus();
      setSession(next);
    });
  });

  const revealEls = Array.from(document.querySelectorAll('.hero-event-pulse-reveal'));
  if (revealEls.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach((el) => el.classList.add('is-visible'));
    } else {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.15 });
      revealEls.forEach((el) => observer.observe(el));
    }
  }

  const ctaEls = document.querySelectorAll('.js-hero-event-pulse-cta');
  ctaEls.forEach((cta) => {
    cta.addEventListener('mouseenter', () => cta.classList.add('is-hovered'));
    cta.addEventListener('mouseleave', () => cta.classList.remove('is-hovered'));
    cta.addEventListener('focus', () => cta.classList.add('is-hovered'));
    cta.addEventListener('blur', () => cta.classList.remove('is-hovered'));
  });
})();
