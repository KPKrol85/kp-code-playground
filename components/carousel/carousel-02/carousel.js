(() => {
  const root = document.querySelector('[data-carousel]');

  if (!root) {
    return;
  }

  const track = root.querySelector('[data-carousel-track]');
  const slides = Array.from(root.querySelectorAll('[data-carousel-slide]'));
  const buttonPrevious = root.querySelector('[data-carousel-previous]');
  const buttonNext = root.querySelector('[data-carousel-next]');
  const pagination = root.querySelector('[data-carousel-pagination]');
  const counter = root.querySelector('[data-carousel-counter]');
  const progress = root.querySelector('[data-carousel-progress]');

  let activeIndex = 0;
  let visibleCards = 1;
  let maxIndex = Math.max(slides.length - visibleCards, 0);
  let dotButtons = [];

  const clampIndex = (index) => Math.max(0, Math.min(index, maxIndex));

  const getVisibleCards = () => {
    const viewportWidth = window.innerWidth;

    if (viewportWidth >= 1024) {
      return 3;
    }

    if (viewportWidth >= 760) {
      return 2;
    }

    return 1;
  };

  const getStepWidth = () => {
    if (!slides.length) {
      return 0;
    }

    const slideWidth = slides[0].getBoundingClientRect().width;
    const trackStyles = window.getComputedStyle(track);
    const gap = parseFloat(trackStyles.columnGap || trackStyles.gap || '0');

    return slideWidth + gap;
  };

  const formatCounterNumber = (value) => String(value).padStart(2, '0');

  const updateSlideState = () => {
    const stepWidth = getStepWidth();

    track.style.setProperty('--carousel-offset', `${-activeIndex * stepWidth}px`);

    slides.forEach((slide, index) => {
      const isActive = index >= activeIndex && index < activeIndex + visibleCards;
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', String(!isActive));
    });

    if (counter) {
      const start = activeIndex + 1;
      const end = Math.min(activeIndex + visibleCards, slides.length);
      counter.textContent = `${formatCounterNumber(start)}-${formatCounterNumber(end)} / ${formatCounterNumber(slides.length)}`;
    }

    const progressValue = maxIndex === 0 ? 100 : ((activeIndex / maxIndex) * 100);
    progress.style.width = `${progressValue}%`;

    buttonPrevious.disabled = activeIndex === 0;
    buttonNext.disabled = activeIndex >= maxIndex;

    dotButtons.forEach((dotButton, dotIndex) => {
      const selected = dotIndex === activeIndex;
      dotButton.setAttribute('aria-selected', String(selected));
      dotButton.tabIndex = selected ? 0 : -1;
    });
  };

  const createPagination = () => {
    pagination.innerHTML = '';
    dotButtons = [];

    const totalPages = maxIndex + 1;

    for (let index = 0; index < totalPages; index += 1) {
      const dotButton = document.createElement('button');
      dotButton.type = 'button';
      dotButton.className = 'cards-carousel__dot';
      dotButton.role = 'tab';
      dotButton.setAttribute('aria-label', `Go to card set ${index + 1}`);
      dotButton.addEventListener('click', () => {
        activeIndex = index;
        updateSlideState();
      });
      pagination.appendChild(dotButton);
      dotButtons.push(dotButton);
    }
  };

  const recalculate = () => {
    visibleCards = getVisibleCards();
    maxIndex = Math.max(slides.length - visibleCards, 0);
    root.style.setProperty('--carousel-visible', String(visibleCards));
    activeIndex = clampIndex(activeIndex);
    createPagination();
    updateSlideState();
  };

  const moveTo = (delta) => {
    activeIndex = clampIndex(activeIndex + delta);
    updateSlideState();
  };

  let touchStartX = 0;
  let touchCurrentX = 0;
  let touchActive = false;

  track.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return;
    }

    touchActive = true;
    touchStartX = event.clientX;
    touchCurrentX = event.clientX;
    track.setPointerCapture(event.pointerId);
  });

  track.addEventListener('pointermove', (event) => {
    if (!touchActive) {
      return;
    }

    touchCurrentX = event.clientX;
  });

  track.addEventListener('pointerup', (event) => {
    if (!touchActive) {
      return;
    }

    const delta = touchCurrentX - touchStartX;
    const threshold = Math.max(getStepWidth() * 0.18, 28);

    if (Math.abs(delta) > threshold) {
      moveTo(delta > 0 ? -1 : 1);
    }

    touchActive = false;
    track.releasePointerCapture(event.pointerId);
  });

  track.addEventListener('pointercancel', () => {
    touchActive = false;
  });

  buttonPrevious.addEventListener('click', () => {
    moveTo(-1);
  });

  buttonNext.addEventListener('click', () => {
    moveTo(1);
  });

  root.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      moveTo(-1);
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      moveTo(1);
    }
  });

  window.addEventListener('resize', () => {
    window.requestAnimationFrame(recalculate);
  });

  recalculate();
})();
