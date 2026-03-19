(() => {
  const SELECTORS = {
    root: '[data-kv-video-carousel]',
    slide: '[data-slide]',
    prev: '[data-action="prev"]',
    next: '[data-action="next"]',
    dot: '[data-dot]',
    status: '.kv-video-carousel__status',
    video: '.kv-video-carousel__video',
  };

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  class VideoBackgroundCarousel {
    constructor(root) {
      this.root = root;
      this.slides = Array.from(root.querySelectorAll(SELECTORS.slide));
      this.dots = Array.from(root.querySelectorAll(SELECTORS.dot));
      this.status = root.querySelector(SELECTORS.status);
      this.prevButton = root.querySelector(SELECTORS.prev);
      this.nextButton = root.querySelector(SELECTORS.next);
      this.index = Math.max(
        0,
        this.slides.findIndex((slide) => slide.classList.contains('is-active'))
      );
      this.autoplayEnabled = root.dataset.autoplay === 'true' && !prefersReducedMotion.matches;
      this.delay = Math.max(4000, Number(root.dataset.autoplayDelay) || 9000);
      this.timer = null;
      this.isHovered = false;
      this.isFocused = false;
      this.isIntersecting = true;
      this.touch = { x: 0, y: 0, active: false };
      this.posterMode = this.detectPosterMode();
      this.resizeObserver = null;
      this.intersectionObserver = null;
      this.progressReset = 0;

      this.handlePointerEnter = () => {
        this.isHovered = true;
        this.stopAutoplay();
      };
      this.handlePointerLeave = () => {
        this.isHovered = false;
        this.startAutoplay();
      };
      this.handleFocusIn = () => {
        this.isFocused = true;
        this.stopAutoplay();
      };
      this.handleFocusOut = (event) => {
        if (!this.root.contains(event.relatedTarget)) {
          this.isFocused = false;
          this.startAutoplay();
        }
      };
      this.handleKeydown = (event) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          this.goTo(this.index - 1, { userInitiated: true });
        }
        if (event.key === 'ArrowRight') {
          event.preventDefault();
          this.goTo(this.index + 1, { userInitiated: true });
        }
      };
      this.handleTouchStart = (event) => {
        const touch = event.changedTouches[0];
        this.touch = { x: touch.clientX, y: touch.clientY, active: true };
      };
      this.handleTouchEnd = (event) => {
        if (!this.touch.active) return;
        const touch = event.changedTouches[0];
        const deltaX = touch.clientX - this.touch.x;
        const deltaY = touch.clientY - this.touch.y;
        this.touch.active = false;

        if (Math.abs(deltaX) > 48 && Math.abs(deltaY) < 72) {
          this.goTo(this.index + (deltaX < 0 ? 1 : -1), { userInitiated: true });
        }
      };
      this.handleReducedMotionChange = (event) => {
        this.autoplayEnabled = this.root.dataset.autoplay === 'true' && !event.matches;
        if (event.matches) {
          this.enablePosterMode('Reduced motion is enabled.');
        }
        this.syncPlayback();
        this.startAutoplay();
      };
    }

    init() {
      if (!this.slides.length) return;

      this.root.dataset.posterMode = String(this.posterMode);
      this.root.style.setProperty('--kv-progress-duration', `${this.delay}ms`);
      this.root.tabIndex = 0;

      this.prevButton?.addEventListener('click', () => this.goTo(this.index - 1, { userInitiated: true }));
      this.nextButton?.addEventListener('click', () => this.goTo(this.index + 1, { userInitiated: true }));
      this.dots.forEach((dot, dotIndex) => {
        dot.addEventListener('click', () => this.goTo(dotIndex, { userInitiated: true }));
      });

      this.root.addEventListener('mouseenter', this.handlePointerEnter);
      this.root.addEventListener('mouseleave', this.handlePointerLeave);
      this.root.addEventListener('focusin', this.handleFocusIn);
      this.root.addEventListener('focusout', this.handleFocusOut);
      this.root.addEventListener('keydown', this.handleKeydown);
      this.root.addEventListener('touchstart', this.handleTouchStart, { passive: true });
      this.root.addEventListener('touchend', this.handleTouchEnd, { passive: true });
      prefersReducedMotion.addEventListener('change', this.handleReducedMotionChange);

      this.setupObservers();
      this.goTo(this.index, { announce: false, initial: true });
      this.startAutoplay();

      this.root.dispatchEvent(
        new CustomEvent('carousel:ready', {
          bubbles: true,
          detail: { activeIndex: this.index, slideCount: this.slides.length, posterMode: this.posterMode },
        })
      );
    }

    detectPosterMode() {
      const saveData = navigator.connection && navigator.connection.saveData;
      const lowMemory = typeof navigator.deviceMemory === 'number' && navigator.deviceMemory <= 2;
      return Boolean(saveData || lowMemory || prefersReducedMotion.matches);
    }

    enablePosterMode(message) {
      this.posterMode = true;
      this.root.dataset.posterMode = 'true';
      if (message && this.status) {
        this.status.textContent = message;
      }
    }

    setupObservers() {
      if ('IntersectionObserver' in window) {
        this.intersectionObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.target !== this.root) return;
              this.isIntersecting = entry.isIntersecting && entry.intersectionRatio >= 0.35;
              if (!this.isIntersecting) {
                this.stopAutoplay();
              } else {
                this.startAutoplay();
              }
              this.syncPlayback();
            });
          },
          { threshold: [0, 0.35, 0.65] }
        );
        this.intersectionObserver.observe(this.root);
      }

      if ('ResizeObserver' in window) {
        this.resizeObserver = new ResizeObserver((entries) => {
          window.requestAnimationFrame(() => {
            entries.forEach((entry) => {
              if (entry.target !== this.root) return;
              this.root.dataset.compact = entry.contentRect.width < 980 ? 'true' : 'false';
            });
          });
        });
        this.resizeObserver.observe(this.root);
      }
    }

    normalizeIndex(index) {
      return (index + this.slides.length) % this.slides.length;
    }

    goTo(nextIndex, options = {}) {
      const normalizedIndex = this.normalizeIndex(nextIndex);
      const previousIndex = this.index;
      this.index = normalizedIndex;

      this.slides.forEach((slide, slideIndex) => {
        const active = slideIndex === normalizedIndex;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', String(!active));
      });

      this.dots.forEach((dot, dotIndex) => {
        const active = dotIndex === normalizedIndex;
        dot.classList.toggle('is-active', active);
        dot.setAttribute('aria-selected', String(active));
      });

      if (options.announce !== false && this.status) {
        const headline = this.slides[normalizedIndex].querySelector('h1, h2')?.textContent?.trim();
        this.status.textContent = `Slide ${normalizedIndex + 1} of ${this.slides.length}: ${headline || 'Featured story'}`;
      }

      this.restartProgress();
      this.syncPlayback(options.initial);
      this.startAutoplay();

      if (previousIndex !== normalizedIndex || options.initial) {
        this.root.dispatchEvent(
          new CustomEvent('carousel:change', {
            bubbles: true,
            detail: {
              activeIndex: normalizedIndex,
              previousIndex,
              slideCount: this.slides.length,
              userInitiated: Boolean(options.userInitiated),
            },
          })
        );
      }
    }

    restartProgress() {
      this.dots.forEach((dot) => {
        dot.style.removeProperty('animation');
      });

      window.clearTimeout(this.progressReset);
      this.progressReset = window.setTimeout(() => {
        this.dots.forEach((dot) => {
          // Force recalculation so the width transition restarts reliably.
          void dot.offsetWidth;
        });
      }, 20);
    }

    startAutoplay() {
      this.stopAutoplay();
      if (!this.autoplayEnabled || this.isHovered || this.isFocused || !this.isIntersecting || this.slides.length < 2) {
        return;
      }

      this.timer = window.setTimeout(() => {
        this.goTo(this.index + 1);
      }, this.delay);
    }

    stopAutoplay() {
      if (this.timer) {
        window.clearTimeout(this.timer);
        this.timer = null;
      }
    }

    syncPlayback(isInitial = false) {
      this.slides.forEach((slide, slideIndex) => {
        const video = slide.querySelector(SELECTORS.video);
        const active = slideIndex === this.index;

        if (!video) return;

        if (!active || this.posterMode || !this.isIntersecting) {
          video.pause();
          if (!active) {
            video.currentTime = 0;
          }
          return;
        }

        if (slideIndex > 0 && video.preload === 'none') {
          video.preload = 'metadata';
        }

        if (!isInitial) {
          video.currentTime = 0;
        }

        const playPromise = video.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(() => {
            this.enablePosterMode('Video playback is unavailable. Showing poster imagery instead.');
            video.pause();
          });
        }
      });
    }
  }

  const boot = () => {
    document.querySelectorAll(SELECTORS.root).forEach((root) => {
      const instance = new VideoBackgroundCarousel(root);
      instance.init();
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
