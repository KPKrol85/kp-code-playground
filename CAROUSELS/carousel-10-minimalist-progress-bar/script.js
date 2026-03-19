(() => {
  class MinimalistProgressCarousel {
    constructor(element) {
      this.root = element;
      this.track = this.root.querySelector('[data-carousel-track]');
      this.viewport = this.root.querySelector('[data-carousel-viewport]');
      this.slides = [...this.root.querySelectorAll('[data-carousel-slide]')];
      this.segments = [...this.root.querySelectorAll('[data-carousel-segment]')];
      this.fills = [...this.root.querySelectorAll('[data-carousel-fill]')];
      this.liveRegion = this.root.querySelector('[data-carousel-live]');
      this.currentNode = this.root.querySelector('[data-carousel-current]');
      this.totalNode = this.root.querySelector('[data-carousel-total]');
      this.toggleButton = this.root.querySelector('[data-carousel-toggle]');
      this.duration = Number.parseInt(this.root.dataset.interval || '6200', 10);
      this.autoplayEnabled = this.root.dataset.autoplay !== 'false';
      this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.currentIndex = 0;
      this.rafId = 0;
      this.resumeTimer = 0;
      this.slideStartTime = 0;
      this.elapsedBeforePause = 0;
      this.userPaused = false;
      this.visibilityPaused = false;
      this.interactionPaused = false;
      this.isHovering = false;
      this.hasFocusWithin = false;
      this.touchSession = null;
      this.resizeObserver = null;
      this.intersectionObserver = null;

      if (!this.track || this.slides.length < 2 || this.segments.length !== this.slides.length) {
        return;
      }

      this.init();
    }

    init() {
      this.totalNode.textContent = this.formatIndex(this.slides.length);
      this.bindEvents();
      this.setupObservers();
      this.applyResponsiveHeight();
      this.goTo(0, { immediate: true, announce: false });
      this.dispatch('carousel:ready', { index: this.currentIndex });
      if (!this.prefersReducedMotion.matches && this.autoplayEnabled) {
        this.play();
      } else {
        this.root.classList.add('is-paused');
        this.updateToggleState();
      }
    }

    bindEvents() {
      this.root.addEventListener('mouseenter', () => {
        this.isHovering = true;
        this.pause('hover');
      });

      this.root.addEventListener('mouseleave', () => {
        this.isHovering = false;
        this.resumeIfAppropriate();
      });

      this.root.addEventListener('focusin', () => {
        this.hasFocusWithin = true;
        this.pause('focus');
      });

      this.root.addEventListener('focusout', () => {
        requestAnimationFrame(() => {
          this.hasFocusWithin = this.root.contains(document.activeElement);
          this.resumeIfAppropriate();
        });
      });

      this.root.addEventListener('keydown', (event) => {
        switch (event.key) {
          case 'ArrowRight':
            event.preventDefault();
            this.next(true);
            break;
          case 'ArrowLeft':
            event.preventDefault();
            this.prev(true);
            break;
          case 'Home':
            event.preventDefault();
            this.goTo(0, { userInitiated: true });
            break;
          case 'End':
            event.preventDefault();
            this.goTo(this.slides.length - 1, { userInitiated: true });
            break;
          default:
            break;
        }
      });

      this.segments.forEach((segment, index) => {
        segment.addEventListener('click', () => {
          this.goTo(index, { userInitiated: true });
        });
      });

      this.root.querySelectorAll('[data-carousel-next]').forEach((button) => {
        button.addEventListener('click', () => this.next(true));
      });

      this.root.querySelectorAll('[data-carousel-prev]').forEach((button) => {
        button.addEventListener('click', () => this.prev(true));
      });

      if (this.toggleButton) {
        this.toggleButton.addEventListener('click', () => {
          this.userPaused = !this.userPaused;
          if (this.userPaused) {
            this.pause('user');
          } else {
            this.resumeIfAppropriate(true);
          }
          this.updateToggleState();
        });
      }

      this.viewport.addEventListener('pointerdown', (event) => {
        if (event.pointerType === 'mouse' && event.button !== 0) return;
        this.interactionPaused = true;
        this.pause('pointer');
        this.touchSession = {
          startX: event.clientX,
          startY: event.clientY,
          pointerId: event.pointerId,
          active: true
        };
        if (this.viewport.setPointerCapture) {
          this.viewport.setPointerCapture(event.pointerId);
        }
      });

      this.viewport.addEventListener('pointerup', (event) => {
        const session = this.touchSession;
        if (!session || !session.active) {
          this.interactionPaused = false;
          this.resumeIfAppropriate();
          return;
        }

        const deltaX = event.clientX - session.startX;
        const deltaY = event.clientY - session.startY;
        const isSwipe = Math.abs(deltaX) > 44 && Math.abs(deltaX) > Math.abs(deltaY) * 1.25;

        if (isSwipe) {
          deltaX < 0 ? this.next(true) : this.prev(true);
        }

        this.touchSession.active = false;
        this.interactionPaused = false;
        this.resumeIfAppropriate();
      });

      this.viewport.addEventListener('pointercancel', () => {
        this.interactionPaused = false;
        this.touchSession = null;
        this.resumeIfAppropriate();
      });

      this.viewport.addEventListener('lostpointercapture', () => {
        this.interactionPaused = false;
        this.resumeIfAppropriate();
      });

      document.addEventListener('visibilitychange', () => {
        this.visibilityPaused = document.hidden;
        if (document.hidden) {
          this.pause('document-hidden');
        } else {
          this.resumeIfAppropriate();
        }
      });

      if (typeof this.prefersReducedMotion.addEventListener === 'function') {
        this.prefersReducedMotion.addEventListener('change', (event) => {
          if (event.matches) {
            this.pause('reduced-motion');
            this.root.classList.add('is-paused');
          } else {
            this.resumeIfAppropriate(true);
          }
        });
      }
    }

    setupObservers() {
      if ('IntersectionObserver' in window) {
        this.intersectionObserver = new IntersectionObserver(
          ([entry]) => {
            this.visibilityPaused = !entry.isIntersecting || entry.intersectionRatio < 0.55;
            if (this.visibilityPaused) {
              this.pause('offscreen');
            } else {
              this.resumeIfAppropriate();
            }
          },
          { threshold: [0.2, 0.55, 0.9] }
        );
        this.intersectionObserver.observe(this.root);
      }

      if ('ResizeObserver' in window) {
        this.resizeObserver = new ResizeObserver(() => this.applyResponsiveHeight());
        this.resizeObserver.observe(this.root);
      }
    }

    applyResponsiveHeight() {
      const copyHeights = this.slides.map((slide) => slide.scrollHeight);
      const maxHeight = Math.max(...copyHeights, 0);
      if (maxHeight) {
        this.viewport.style.minHeight = `${Math.max(420, Math.min(maxHeight + 36, 640))}px`;
      }
    }

    formatIndex(value) {
      return String(value).padStart(2, '0');
    }

    updateUI(progress = 0) {
      this.currentNode.textContent = this.formatIndex(this.currentIndex + 1);

      this.slides.forEach((slide, index) => {
        const active = index === this.currentIndex;
        slide.classList.toggle('is-active', active);
        slide.toggleAttribute('inert', !active);
        slide.setAttribute('aria-hidden', String(!active));
      });

      this.segments.forEach((segment, index) => {
        const active = index === this.currentIndex;
        const complete = index < this.currentIndex;
        segment.classList.toggle('is-active', active);
        segment.classList.toggle('is-complete', complete);
        segment.setAttribute('aria-current', active ? 'true' : 'false');
        const fill = this.fills[index];
        if (fill) {
          const segmentProgress = complete ? 1 : active ? progress : 0;
          fill.style.setProperty('--mpb-progress', segmentProgress.toFixed(4));
        }
      });
    }

    announce() {
      if (!this.liveRegion) return;
      const slide = this.slides[this.currentIndex];
      const title = slide.querySelector('.mpb-slide__title')?.textContent?.trim() || `Slide ${this.currentIndex + 1}`;
      this.liveRegion.textContent = `${this.currentIndex + 1} of ${this.slides.length}: ${title}`;
    }

    dispatch(name, detail = {}) {
      this.root.dispatchEvent(new CustomEvent(name, {
        bubbles: true,
        detail: {
          carousel: this.root,
          index: this.currentIndex,
          slide: this.slides[this.currentIndex],
          ...detail
        }
      }));
    }

    goTo(index, options = {}) {
      const { immediate = false, announce = true, userInitiated = false } = options;
      this.currentIndex = (index + this.slides.length) % this.slides.length;
      this.elapsedBeforePause = 0;
      this.slideStartTime = performance.now();
      this.updateUI(0);
      if (announce) this.announce();
      this.dispatch('carousel:change', { userInitiated, immediate });
      if (immediate || this.canRunAutoplayLoop()) {
        this.restartAnimationLoop();
      } else {
        this.updateUI(0);
      }
    }

    next(userInitiated = false) {
      this.goTo(this.currentIndex + 1, { userInitiated });
    }

    prev(userInitiated = false) {
      this.goTo(this.currentIndex - 1, { userInitiated });
    }

    shouldAutoplay() {
      return this.autoplayEnabled && !this.userPaused && !this.prefersReducedMotion.matches;
    }

    canRunAutoplayLoop() {
      return this.shouldAutoplay() && !this.isHovering && !this.hasFocusWithin && !this.visibilityPaused && !this.interactionPaused && !document.hidden;
    }

    play() {
      this.root.classList.remove('is-paused');
      this.updateToggleState();
      this.slideStartTime = performance.now() - this.elapsedBeforePause;
      this.restartAnimationLoop();
    }

    pause() {
      cancelAnimationFrame(this.rafId);
      this.rafId = 0;
      if (this.slideStartTime) {
        this.elapsedBeforePause = Math.min(performance.now() - this.slideStartTime, this.duration);
      }
      this.root.classList.add('is-paused');
      this.updateToggleState();
    }

    resumeIfAppropriate(force = false) {
      window.clearTimeout(this.resumeTimer);
      this.resumeTimer = window.setTimeout(() => {
        const blocked = this.isHovering || this.hasFocusWithin || this.visibilityPaused || this.interactionPaused || document.hidden;
        if ((force || !blocked) && this.shouldAutoplay()) {
          this.play();
        }
      }, force ? 0 : 60);
    }

    restartAnimationLoop() {
      cancelAnimationFrame(this.rafId);
      if (!this.canRunAutoplayLoop()) {
        this.updateUI(this.prefersReducedMotion.matches ? 1 : this.elapsedBeforePause / this.duration);
        return;
      }

      const tick = (now) => {
        const elapsed = Math.max(0, now - this.slideStartTime);
        const progress = Math.min(elapsed / this.duration, 1);
        this.updateUI(progress);
        if (progress >= 1) {
          this.next(false);
          return;
        }
        this.rafId = requestAnimationFrame(tick);
      };

      this.rafId = requestAnimationFrame(tick);
    }

    updateToggleState() {
      if (!this.toggleButton) return;
      const paused = this.root.classList.contains('is-paused');
      this.toggleButton.setAttribute('aria-pressed', String(paused));
      this.toggleButton.setAttribute('aria-label', paused ? 'Resume automatic slide rotation' : 'Pause automatic slide rotation');
      const label = this.toggleButton.querySelector('.mpb-carousel__pause-label');
      if (label) {
        label.textContent = paused ? 'Resume' : 'Pause';
      }
    }
  }

  const boot = () => {
    document.querySelectorAll('[data-carousel]').forEach((element) => {
      if (!element.__minimalistProgressCarousel) {
        element.__minimalistProgressCarousel = new MinimalistProgressCarousel(element);
      }
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
