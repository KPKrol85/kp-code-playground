(() => {
  const SELECTORS = {
    root: '[data-split-carousel]',
    shell: '[data-carousel-shell]',
    textTrack: '[data-text-track]',
    mediaTrack: '[data-media-track]',
    textSlides: '[data-text-slide]',
    mediaSlides: '[data-media-slide]',
    prev: '[data-carousel-prev]',
    next: '[data-carousel-next]',
    dots: '[data-carousel-dot]',
    status: '[data-carousel-status]',
    counterReel: '[data-counter-reel]'
  };

  const clampIndex = (index, total) => (index + total) % total;

  class SplitScreenCarousel {
    constructor(root) {
      this.root = root;
      this.shell = root.querySelector(SELECTORS.shell);
      this.textTrack = root.querySelector(SELECTORS.textTrack);
      this.mediaTrack = root.querySelector(SELECTORS.mediaTrack);
      this.textSlides = Array.from(root.querySelectorAll(SELECTORS.textSlides));
      this.mediaSlides = Array.from(root.querySelectorAll(SELECTORS.mediaSlides));
      this.prevButton = root.querySelector(SELECTORS.prev);
      this.nextButton = root.querySelector(SELECTORS.next);
      this.dots = Array.from(root.querySelectorAll(SELECTORS.dots));
      this.status = root.querySelector(SELECTORS.status);
      this.counterReel = root.querySelector(SELECTORS.counterReel);
      this.total = this.textSlides.length;
      this.index = Math.max(
        0,
        this.textSlides.findIndex((slide) => slide.classList.contains('is-active'))
      );
      this.mediaStartOffset = this.total - 1;
      this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.wheelLocked = false;
      this.touchStartX = 0;
      this.touchStartY = 0;
      this.touchActive = false;
      this.resizeObserver = null;

      if (!this.total || this.total !== this.mediaSlides.length) {
        return;
      }

      this.setup();
    }

    setup() {
      this.bindEvents();
      this.observeSize();
      this.goToSlide(this.index, { announce: false, emit: false, initial: true });
      this.emit('carousel:ready', { index: this.index, total: this.total });
    }

    bindEvents() {
      this.prevButton?.addEventListener('click', () => this.goToSlide(this.index - 1));
      this.nextButton?.addEventListener('click', () => this.goToSlide(this.index + 1));

      this.dots.forEach((dot) => {
        dot.addEventListener('click', () => {
          const nextIndex = Number.parseInt(dot.dataset.index || '0', 10);
          this.goToSlide(nextIndex);
        });
      });

      this.root.addEventListener('keydown', (event) => {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
          return;
        }

        const isWithin = this.root.contains(document.activeElement);
        if (!isWithin) {
          return;
        }

        event.preventDefault();
        this.goToSlide(this.index + (event.key === 'ArrowRight' ? 1 : -1));
      });

      this.root.addEventListener(
        'wheel',
        (event) => {
          if (!this.shell || !this.isInViewport()) {
            return;
          }

          const delta = Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
          if (Math.abs(delta) < 18 || this.wheelLocked) {
            return;
          }

          event.preventDefault();
          this.wheelLocked = true;
          this.goToSlide(this.index + (delta > 0 ? 1 : -1));

          window.setTimeout(() => {
            this.wheelLocked = false;
          }, this.isReducedMotion ? 220 : 760);
        },
        { passive: false }
      );

      this.root.addEventListener('touchstart', (event) => {
        const touch = event.changedTouches[0];
        if (!touch) return;
        this.touchStartX = touch.clientX;
        this.touchStartY = touch.clientY;
        this.touchActive = true;
      }, { passive: true });

      this.root.addEventListener('touchend', (event) => {
        if (!this.touchActive) return;
        const touch = event.changedTouches[0];
        if (!touch) return;

        const diffX = touch.clientX - this.touchStartX;
        const diffY = touch.clientY - this.touchStartY;
        this.touchActive = false;

        if (Math.abs(diffX) < 44 || Math.abs(diffX) < Math.abs(diffY)) {
          return;
        }

        this.goToSlide(this.index + (diffX < 0 ? 1 : -1));
      }, { passive: true });
    }

    observeSize() {
      if (!this.shell || typeof ResizeObserver === 'undefined') {
        return;
      }

      this.resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          this.root.classList.toggle('is-compact', entry.contentRect.width < 980);
        }
      });

      this.resizeObserver.observe(this.shell);
    }

    isInViewport() {
      const rect = this.root.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < window.innerHeight;
    }

    goToSlide(nextIndex, options = {}) {
      const { announce = true, emit = true, initial = false } = options;
      const normalizedIndex = clampIndex(nextIndex, this.total);
      this.index = normalizedIndex;

      const textOffset = normalizedIndex * 100;
      const mediaOffset = (this.mediaStartOffset - normalizedIndex) * -100;

      this.textTrack.style.transform = `translate3d(0, ${-textOffset}%, 0)`;
      this.mediaTrack.style.transform = `translate3d(0, ${mediaOffset}%, 0)`;

      this.textSlides.forEach((slide, slideIndex) => {
        const active = slideIndex === normalizedIndex;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', String(!active));

        if ('inert' in slide) {
          slide.inert = !active;
        } else {
          slide.querySelectorAll('a, button').forEach((control) => {
            if (!active) {
              control.setAttribute('tabindex', '-1');
            } else {
              control.removeAttribute('tabindex');
            }
          });
        }
      });

      this.mediaSlides.forEach((slide) => {
        const slideIndex = Number.parseInt(slide.dataset.slide || '-1', 10);
        const active = slideIndex === normalizedIndex;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', String(!active));
      });

      this.dots.forEach((dot, dotIndex) => {
        const active = dotIndex === normalizedIndex;
        dot.classList.toggle('is-active', active);
        dot.setAttribute('aria-pressed', String(active));
      });

      if (this.counterReel) {
        this.counterReel.style.transform = `translate3d(0, ${-normalizedIndex * 1.15}rem, 0)`;
      }

      const activeTextSlide = this.textSlides[normalizedIndex];
      const tone = activeTextSlide?.dataset.tone || 'noir';
      this.root.dataset.tone = tone;

      if (announce && this.status) {
        const title = activeTextSlide?.querySelector('h2')?.textContent?.trim() || `Slide ${normalizedIndex + 1}`;
        this.status.textContent = `${this.root.dataset.carouselName || 'Carousel'}: ${title} (${normalizedIndex + 1} of ${this.total})`;
      }

      if (emit && !initial) {
        this.emit('carousel:change', {
          index: normalizedIndex,
          total: this.total,
          tone,
          title: activeTextSlide?.querySelector('h2')?.textContent?.trim() || ''
        });
      }
    }

    emit(name, detail) {
      this.root.dispatchEvent(
        new CustomEvent(name, {
          bubbles: true,
          detail
        })
      );
    }
  }

  const init = () => {
    document.querySelectorAll(SELECTORS.root).forEach((root) => {
      if (root.dataset.carouselEnhanced === 'true') {
        return;
      }

      root.dataset.carouselEnhanced = 'true';
      new SplitScreenCarousel(root);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
