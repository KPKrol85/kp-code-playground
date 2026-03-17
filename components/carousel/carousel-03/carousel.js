(() => {
  const carousel = document.querySelector('[data-carousel]');

  if (!carousel) {
    return;
  }

  const track = carousel.querySelector('[data-carousel-track]');
  const slides = Array.from(carousel.querySelectorAll('[data-carousel-slide]'));
  const prevButton = carousel.querySelector('[data-carousel-prev]');
  const nextButton = carousel.querySelector('[data-carousel-next]');
  const counter = carousel.querySelector('[data-carousel-counter]');
  const dotsContainer = carousel.querySelector('[data-carousel-dots]');

  let currentIndex = 0;
  let slideWidth = slides[0]?.getBoundingClientRect().width || 0;
  let startX = 0;
  let deltaX = 0;
  let isDragging = false;

  const toCounterString = (value) => String(value).padStart(2, '0');

  const updateTrackPosition = () => {
    const offset = currentIndex * slideWidth;
    track.style.transform = `translate3d(-${offset}px, 0, 0)`;
  };

  const updateCounter = () => {
    counter.textContent = `${toCounterString(currentIndex + 1)} / ${toCounterString(slides.length)}`;
  };

  const updateSlides = () => {
    slides.forEach((slide, index) => {
      const isActive = index === currentIndex;
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', String(!isActive));
    });
  };

  const updateDots = () => {
    const dots = dotsContainer.querySelectorAll('.showcase-carousel__dot');
    dots.forEach((dot, index) => {
      const isActive = index === currentIndex;
      dot.setAttribute('aria-selected', String(isActive));
      dot.setAttribute('tabindex', isActive ? '0' : '-1');
    });
  };

  const setSlide = (nextIndex) => {
    currentIndex = (nextIndex + slides.length) % slides.length;
    updateSlides();
    updateDots();
    updateCounter();
    updateTrackPosition();
  };

  const buildDots = () => {
    const fragment = document.createDocumentFragment();

    slides.forEach((slide, index) => {
      const dot = document.createElement('button');
      dot.className = 'showcase-carousel__dot';
      dot.type = 'button';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
      dot.setAttribute('aria-controls', slide.id || `showcase-slide-${index + 1}`);

      if (!slide.id) {
        slide.id = `showcase-slide-${index + 1}`;
      }

      dot.addEventListener('click', () => {
        setSlide(index);
      });

      fragment.append(dot);
    });

    dotsContainer.append(fragment);
  };

  const goNext = () => setSlide(currentIndex + 1);
  const goPrev = () => setSlide(currentIndex - 1);

  const onKeydown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goNext();
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goPrev();
    }
  };

  const onPointerDown = (event) => {
    isDragging = true;
    startX = event.clientX;
    deltaX = 0;
  };

  const onPointerMove = (event) => {
    if (!isDragging) {
      return;
    }

    deltaX = event.clientX - startX;
  };

  const onPointerUp = () => {
    if (!isDragging) {
      return;
    }

    const threshold = Math.max(40, slideWidth * 0.1);

    if (deltaX <= -threshold) {
      goNext();
    } else if (deltaX >= threshold) {
      goPrev();
    }

    isDragging = false;
    startX = 0;
    deltaX = 0;
  };

  const onResize = () => {
    slideWidth = slides[0]?.getBoundingClientRect().width || 0;
    updateTrackPosition();
  };

  buildDots();
  setSlide(0);

  nextButton.addEventListener('click', goNext);
  prevButton.addEventListener('click', goPrev);
  carousel.addEventListener('keydown', onKeydown);

  track.addEventListener('pointerdown', onPointerDown);
  track.addEventListener('pointermove', onPointerMove);
  track.addEventListener('pointerup', onPointerUp);
  track.addEventListener('pointercancel', onPointerUp);
  track.addEventListener('lostpointercapture', onPointerUp);

  window.addEventListener('resize', onResize);
})();
