(() => {
  const SELECTORS = {
    root: '[data-kp-vertical-narrative]',
    viewport: '[data-kp-vn-viewport]',
    track: '[data-kp-vn-track]',
    step: '[data-kp-vn-step]',
    dot: '[data-kp-vn-dot]',
    live: '[data-kp-vn-live-region]',
    fill: '[data-kp-vn-progress-fill]',
    current: '[data-kp-vn-current]',
    total: '[data-kp-vn-total]'
  };

  const formatIndex = (value) => String(value + 1).padStart(2, '0');

  class VerticalNarrative {
    constructor(root) {
      this.root = root;
      this.viewport = root.querySelector(SELECTORS.viewport);
      this.track = root.querySelector(SELECTORS.track);
      this.steps = Array.from(root.querySelectorAll(SELECTORS.step));
      this.dots = Array.from(root.querySelectorAll(SELECTORS.dot));
      this.liveRegion = root.querySelector(SELECTORS.live);
      this.progressFill = root.querySelector(SELECTORS.fill);
      this.currentValue = root.querySelector(SELECTORS.current);
      this.totalValue = root.querySelector(SELECTORS.total);
      this.index = Math.max(0, this.steps.findIndex((step) => step.classList.contains('is-active')));
      this.isControlled = false;
      this.isAnimating = false;
      this.accumulatedWheel = 0;
      this.touchStartY = null;
      this.touchCurrentY = null;
      this.isVisible = false;
      this.releaseScrollUntil = 0;
      this.mediaQuery = window.matchMedia('(max-width: 767px), (prefers-reduced-motion: reduce)');

      if (!this.viewport || !this.track || !this.steps.length) {
        return;
      }

      this.onWheel = this.onWheel.bind(this);
      this.onKeydown = this.onKeydown.bind(this);
      this.onTouchStart = this.onTouchStart.bind(this);
      this.onTouchMove = this.onTouchMove.bind(this);
      this.onTouchEnd = this.onTouchEnd.bind(this);
      this.onMediaChange = this.onMediaChange.bind(this);
      this.onResize = this.onResize.bind(this);

      this.setup();
    }

    setup() {
      this.root.style.setProperty('--kp-vn-step-count', this.steps.length);
      if (this.totalValue) {
        this.totalValue.textContent = String(this.steps.length).padStart(2, '0');
      }

      this.steps.forEach((step, stepIndex) => {
        step.dataset.kpVnIndex = String(stepIndex);
      });

      this.dots.forEach((dot, dotIndex) => {
        dot.addEventListener('click', () => {
          this.goToStep(dotIndex, { source: 'nav', focusViewport: true });
        });
      });

      this.viewport.addEventListener('wheel', this.onWheel, { passive: false });
      this.viewport.addEventListener('keydown', this.onKeydown);
      this.viewport.addEventListener('touchstart', this.onTouchStart, { passive: true });
      this.viewport.addEventListener('touchmove', this.onTouchMove, { passive: true });
      this.viewport.addEventListener('touchend', this.onTouchEnd);

      this.intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.target === this.root) {
              this.isVisible = entry.isIntersecting && entry.intersectionRatio > 0.45;
            }
          });
        },
        {
          threshold: [0.25, 0.45, 0.7]
        }
      );
      this.intersectionObserver.observe(this.root);

      this.resizeObserver = new ResizeObserver(() => {
        window.requestAnimationFrame(this.onResize);
      });
      this.resizeObserver.observe(this.root);

      if (typeof this.mediaQuery.addEventListener === 'function') {
        this.mediaQuery.addEventListener('change', this.onMediaChange);
      } else {
        this.mediaQuery.addListener(this.onMediaChange);
      }

      this.updateMode();
      this.goToStep(this.index, { immediate: true, announce: false, source: 'init' });
      this.emit('carousel:ready', {
        activeIndex: this.index,
        totalSteps: this.steps.length,
        controlled: this.isControlled
      });
    }

    onResize() {
      this.updateMode();
      this.updateTrackPosition();
    }

    onMediaChange() {
      this.updateMode();
      this.goToStep(this.index, { immediate: true, announce: false, source: 'media' });
    }

    updateMode() {
      const shouldControl = !this.mediaQuery.matches && this.root.offsetWidth >= 768;
      this.isControlled = shouldControl;
      this.root.classList.toggle('kp-vn--controlled', shouldControl);

      if (!shouldControl) {
        this.isAnimating = false;
      }

      this.steps.forEach((step, stepIndex) => {
        step.setAttribute('aria-hidden', shouldControl ? String(stepIndex !== this.index) : 'false');
      });
    }

    updateTrackPosition() {
      this.root.style.setProperty('--kp-vn-active-index', String(this.index));
    }

    updateUI() {
      const ratio = this.steps.length > 1 ? this.index / (this.steps.length - 1) : 1;
      this.root.style.setProperty('--kp-vn-progress-ratio', ratio.toFixed(4));
      this.updateTrackPosition();

      if (this.currentValue) {
        this.currentValue.textContent = formatIndex(this.index);
      }

      this.steps.forEach((step, stepIndex) => {
        const isActive = stepIndex === this.index;
        step.classList.toggle('is-active', isActive);
        step.setAttribute('aria-hidden', this.isControlled ? String(!isActive) : 'false');
      });

      this.dots.forEach((dot, dotIndex) => {
        const isActive = dotIndex === this.index;
        dot.classList.toggle('is-active', isActive);
        if (isActive) {
          dot.setAttribute('aria-current', 'step');
        } else {
          dot.removeAttribute('aria-current');
        }
      });
    }

    announceStep() {
      if (!this.liveRegion) {
        return;
      }

      const heading = this.steps[this.index].querySelector('.kp-vn__heading');
      const label = heading ? heading.textContent.trim() : `Step ${formatIndex(this.index)}`;
      this.liveRegion.textContent = `Step ${formatIndex(this.index)} of ${String(this.steps.length).padStart(2, '0')}: ${label}`;
    }

    emit(name, detail) {
      this.root.dispatchEvent(
        new CustomEvent(name, {
          bubbles: true,
          detail
        })
      );
    }

    goToStep(targetIndex, options = {}) {
      const { immediate = false, announce = true, focusViewport = false, source = 'api' } = options;
      const nextIndex = Math.max(0, Math.min(targetIndex, this.steps.length - 1));
      const previousIndex = this.index;

      if (nextIndex === previousIndex && !immediate) {
        return false;
      }

      this.index = nextIndex;
      this.updateUI();

      if (!this.isControlled) {
        this.steps[this.index].scrollIntoView({
          block: 'nearest',
          behavior: immediate ? 'auto' : 'smooth'
        });
      }

      if (focusViewport) {
        this.viewport.focus({ preventScroll: true });
      }

      if (announce) {
        this.announceStep();
      }

      if (this.isControlled && !immediate) {
        this.isAnimating = true;
        window.setTimeout(() => {
          this.isAnimating = false;
        }, 820);
      }

      this.emit('carousel:change', {
        activeIndex: this.index,
        previousIndex,
        totalSteps: this.steps.length,
        controlled: this.isControlled,
        source
      });

      return true;
    }

    canCaptureScroll(direction) {
      if (!this.isControlled || !this.isVisible || this.isAnimating) {
        return false;
      }

      if (direction < 0 && this.index === 0) {
        return false;
      }

      if (direction > 0 && this.index === this.steps.length - 1) {
        return false;
      }

      return Date.now() > this.releaseScrollUntil;
    }

    moveBy(direction, source) {
      const didMove = this.goToStep(this.index + direction, { source });

      if (!didMove) {
        this.releaseScrollUntil = Date.now() + 220;
      }

      this.accumulatedWheel = 0;
      return didMove;
    }

    onWheel(event) {
      if (!this.isControlled) {
        return;
      }

      const direction = Math.sign(event.deltaY);
      if (!direction) {
        return;
      }

      if (!this.canCaptureScroll(direction)) {
        return;
      }

      this.accumulatedWheel += event.deltaY;
      const threshold = 42;
      if (Math.abs(this.accumulatedWheel) < threshold) {
        event.preventDefault();
        return;
      }

      event.preventDefault();
      this.moveBy(direction, 'wheel');
    }

    onKeydown(event) {
      const keyDirections = {
        ArrowDown: 1,
        PageDown: 1,
        ArrowUp: -1,
        PageUp: -1
      };

      if (event.key in keyDirections) {
        const direction = keyDirections[event.key];
        const canMoveFurther = direction > 0 ? this.index < this.steps.length - 1 : this.index > 0;

        if (!canMoveFurther && this.isControlled) {
          return;
        }

        event.preventDefault();
        this.moveBy(direction, 'keyboard');
        return;
      }

      if (event.key === 'Home') {
        event.preventDefault();
        this.goToStep(0, { source: 'keyboard' });
        return;
      }

      if (event.key === 'End') {
        event.preventDefault();
        this.goToStep(this.steps.length - 1, { source: 'keyboard' });
      }
    }

    onTouchStart(event) {
      const firstTouch = event.touches[0];
      this.touchStartY = firstTouch ? firstTouch.clientY : null;
      this.touchCurrentY = this.touchStartY;
    }

    onTouchMove(event) {
      const firstTouch = event.touches[0];
      this.touchCurrentY = firstTouch ? firstTouch.clientY : this.touchCurrentY;
    }

    onTouchEnd() {
      if (this.touchStartY === null || this.touchCurrentY === null) {
        return;
      }

      const deltaY = this.touchStartY - this.touchCurrentY;
      const threshold = 56;
      const direction = deltaY > 0 ? 1 : -1;

      if (Math.abs(deltaY) >= threshold) {
        if (this.isControlled) {
          if (this.canCaptureScroll(direction)) {
            this.moveBy(direction, 'touch');
          }
        } else {
          this.goToStep(this.index + direction, { source: 'touch' });
        }
      }

      this.touchStartY = null;
      this.touchCurrentY = null;
    }
  }

  const init = () => {
    document.querySelectorAll(SELECTORS.root).forEach((root) => {
      if (!root.__kpVerticalNarrative) {
        root.__kpVerticalNarrative = new VerticalNarrative(root);
      }
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
