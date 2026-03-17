(() => {
  const carousel = document.querySelector('.premium-carousel');

  if (!carousel) {
    return;
  }

  const track = carousel.querySelector('.premium-carousel__track');
  const slides = Array.from(carousel.querySelectorAll('.premium-carousel__slide'));
  const previousButton = carousel.querySelector('.premium-carousel__nav-button--prev');
  const nextButton = carousel.querySelector('.premium-carousel__nav-button--next');
  const thumbnails = Array.from(carousel.querySelectorAll('.premium-carousel__thumbnail'));
  const counter = carousel.querySelector('#premium-carousel-counter');
  const progress = carousel.querySelector('#premium-carousel-progress');

  if (!track || slides.length === 0 || !previousButton || !nextButton || thumbnails.length !== slides.length) {
    return;
  }

  let activeIndex = 0;
  let touchStartX = 0;
  let touchCurrentX = 0;
  const touchThreshold = 52;

  const getWrappedIndex = (value) => {
    if (value < 0) {
      return slides.length - 1;
    }

    if (value >= slides.length) {
      return 0;
    }

    return value;
  };

  const formatCounterNumber = (value) => String(value).padStart(2, '0');

  const updateCarousel = (nextIndex) => {
    activeIndex = getWrappedIndex(nextIndex);

    track.style.transform = `translateX(-${activeIndex * 100}%)`;

    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeIndex;

      slide.classList.toggle('premium-carousel__slide--active', isActive);
      slide.setAttribute('aria-hidden', String(!isActive));
    });

    thumbnails.forEach((thumbnail, thumbnailIndex) => {
      const isActive = thumbnailIndex === activeIndex;

      thumbnail.classList.toggle('premium-carousel__thumbnail--active', isActive);
      thumbnail.setAttribute('aria-selected', String(isActive));
      thumbnail.setAttribute('tabindex', isActive ? '0' : '-1');
    });

    if (counter) {
      counter.textContent = `${formatCounterNumber(activeIndex + 1)} / ${formatCounterNumber(slides.length)}`;
    }

    if (progress) {
      const progressValue = ((activeIndex + 1) / slides.length) * 100;
      progress.style.width = `${progressValue}%`;
    }
  };

  const goToNext = () => updateCarousel(activeIndex + 1);
  const goToPrevious = () => updateCarousel(activeIndex - 1);

  nextButton.addEventListener('click', goToNext);
  previousButton.addEventListener('click', goToPrevious);

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener('click', () => {
      const targetIndex = Number(thumbnail.dataset.index);
      updateCarousel(targetIndex);
      thumbnail.focus();
    });
  });

  carousel.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goToNext();
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goToPrevious();
    }
  });

  carousel.setAttribute('tabindex', '0');

  carousel.addEventListener(
    'touchstart',
    (event) => {
      touchStartX = event.changedTouches[0].clientX;
      touchCurrentX = touchStartX;
    },
    { passive: true }
  );

  carousel.addEventListener(
    'touchmove',
    (event) => {
      touchCurrentX = event.changedTouches[0].clientX;
    },
    { passive: true }
  );

  carousel.addEventListener('touchend', () => {
    const deltaX = touchCurrentX - touchStartX;

    if (Math.abs(deltaX) < touchThreshold) {
      return;
    }

    if (deltaX < 0) {
      goToNext();
      return;
    }

    goToPrevious();
  });

  updateCarousel(0);
})();
