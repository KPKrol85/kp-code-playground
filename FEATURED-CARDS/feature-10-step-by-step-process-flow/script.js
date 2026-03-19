(() => {
  class ProcessFlow {
    constructor(root) {
      this.root = root;
      this.visual = root.querySelector('[data-flow-visual]');
      this.svg = root.querySelector('[data-flow-svg]');
      this.basePath = root.querySelector('[data-flow-path-base]');
      this.progressPath = root.querySelector('[data-flow-path-progress]');
      this.gradient = root.querySelector('linearGradient');
      this.steps = Array.from(root.querySelectorAll('[data-step-card]'));
      this.statusLabels = this.steps.map((step) => step.querySelector('[data-step-status]'));
      this.currentIndex = 0;
      this.instanceId = `kp-process-flow-${Math.random().toString(36).slice(2, 10)}`;
      this.completedIndex = -1;
      this.viewportMode = '';
      this.rafId = 0;
      this.progressValue = 0;
      this.length = 0;
      this.thresholds = Array.from({ length: 11 }, (_, index) => index / 10);
      this.handleMeasure = this.handleMeasure.bind(this);
      this.handleViewportUpdate = this.handleViewportUpdate.bind(this);
      this.handleResize = this.handleResize.bind(this);
      this.init();
    }

    init() {
      if (!this.visual || !this.svg || !this.basePath || !this.progressPath || this.steps.length < 2) {
        return;
      }

      if (this.gradient) {
        this.gradient.id = `${this.instanceId}-gradient`;
        this.progressPath.setAttribute('stroke', `url(#${this.gradient.id})`);
      }

      this.resizeObserver = new ResizeObserver(() => {
        this.handleResize();
      });

      this.resizeObserver.observe(this.root);
      this.steps.forEach((step) => this.resizeObserver.observe(step));

      this.intersectionObserver = new IntersectionObserver(
        () => {
          this.handleViewportUpdate();
        },
        {
          threshold: this.thresholds,
          rootMargin: '-15% 0px -20% 0px',
        }
      );

      this.steps.forEach((step) => this.intersectionObserver.observe(step));
      window.addEventListener('resize', this.handleResize, { passive: true });
      window.addEventListener('orientationchange', this.handleResize, { passive: true });
      window.addEventListener('scroll', this.handleViewportUpdate, { passive: true });

      this.handleMeasure();
      this.handleViewportUpdate();
    }

    handleResize() {
      cancelAnimationFrame(this.rafId);
      this.rafId = requestAnimationFrame(() => {
        this.handleMeasure();
        this.handleViewportUpdate();
      });
    }

    handleMeasure() {
      const visualRect = this.visual.getBoundingClientRect();
      if (!visualRect.width || !visualRect.height) {
        return;
      }

      this.viewportMode = window.matchMedia('(min-width: 760px)').matches ? 'desktop' : 'mobile';
      this.svg.setAttribute('viewBox', `0 0 ${visualRect.width} ${visualRect.height}`);

      const points = this.steps.map((step, index) => this.getStepAnchor(step, index, visualRect));
      const pathData = this.buildPath(points);

      this.basePath.setAttribute('d', pathData);
      this.progressPath.setAttribute('d', pathData);
      this.length = this.progressPath.getTotalLength() || 1;
      this.progressPath.style.strokeDasharray = `${this.length}`;
      this.updateProgressPath();
    }

    getStepAnchor(step, index, visualRect) {
      const rect = step.getBoundingClientRect();
      const relativeLeft = rect.left - visualRect.left;
      const relativeTop = rect.top - visualRect.top;
      const centerX = relativeLeft + rect.width / 2;
      const centerY = relativeTop + rect.height / 2;
      const inset = 16;

      if (this.viewportMode === 'mobile') {
        return {
          index,
          entry: { x: centerX, y: relativeTop + inset },
          exit: { x: centerX, y: relativeTop + rect.height - inset },
          center: { x: centerX, y: centerY },
        };
      }

      const isUpperLane = index % 2 === 0;
      return {
        index,
        entry: isUpperLane
          ? { x: relativeLeft + rect.width * 0.22, y: relativeTop + rect.height - inset }
          : { x: relativeLeft + rect.width * 0.18, y: relativeTop + inset },
        exit: isUpperLane
          ? { x: relativeLeft + rect.width * 0.82, y: relativeTop + rect.height - inset }
          : { x: relativeLeft + rect.width * 0.82, y: relativeTop + inset },
        center: { x: centerX, y: centerY },
      };
    }

    buildPath(points) {
      if (!points.length) {
        return '';
      }

      const commands = [`M ${points[0].center.x} ${points[0].center.y}`];
      commands.push(`L ${points[0].exit.x} ${points[0].exit.y}`);

      for (let index = 0; index < points.length - 1; index += 1) {
        const current = points[index];
        const next = points[index + 1];
        const distanceX = next.entry.x - current.exit.x;
        const distanceY = next.entry.y - current.exit.y;
        const curveBiasX = current.exit.x + distanceX * 0.38;
        const curveBiasY = current.exit.y + distanceY * 0.18;
        const nextBiasX = next.entry.x - distanceX * 0.38;
        const nextBiasY = next.entry.y - distanceY * 0.18;

        commands.push(
          `C ${curveBiasX} ${curveBiasY}, ${nextBiasX} ${nextBiasY}, ${next.entry.x} ${next.entry.y}`
        );
        commands.push(`L ${next.center.x} ${next.center.y}`);

        if (index < points.length - 2) {
          commands.push(`L ${next.exit.x} ${next.exit.y}`);
        }
      }

      return commands.join(' ');
    }

    handleViewportUpdate() {
      cancelAnimationFrame(this.rafId);
      this.rafId = requestAnimationFrame(() => {
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        const completeThreshold = viewportHeight * 0.28;
        const activeTop = viewportHeight * 0.2;
        const activeBottom = viewportHeight * 0.7;

        let completed = -1;
        let current = 0;

        this.steps.forEach((step, index) => {
          const rect = step.getBoundingClientRect();
          if (rect.top <= completeThreshold) {
            completed = index;
          }
          if (rect.top <= activeBottom && rect.bottom >= activeTop && current <= index) {
            current = index;
          }
        });

        current = Math.max(Math.min(current, this.steps.length - 1), 0);
        completed = Math.min(completed, current - 1);
        this.currentIndex = current;
        this.completedIndex = completed;
        this.progressValue = Math.max(0.12, (current + 0.5) / this.steps.length);

        this.steps.forEach((step, index) => {
          const isCompleted = index <= completed;
          const isCurrent = index === current;
          step.classList.toggle('is-completed', isCompleted);
          step.classList.toggle('is-current', isCurrent);
          step.classList.toggle('is-upcoming', !isCompleted && !isCurrent);

          if (this.statusLabels[index]) {
            this.statusLabels[index].textContent = isCompleted
              ? 'Completed'
              : isCurrent
                ? 'Current focus'
                : 'Upcoming';
          }
        });

        this.updateProgressPath();
        this.root.style.setProperty('--kp-process-current-index', String(this.currentIndex));
        this.root.dispatchEvent(
          new CustomEvent('processflowchange', {
            detail: {
              currentIndex: this.currentIndex,
              completedIndex: this.completedIndex,
              totalSteps: this.steps.length,
            },
          })
        );
      });
    }

    updateProgressPath() {
      if (!this.length) {
        return;
      }

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const visibleLength = this.length * this.progressValue;
      this.progressPath.style.opacity = visibleLength > 0 ? '1' : '0';
      this.progressPath.style.strokeDashoffset = `${this.length - visibleLength}`;
      this.progressPath.style.transitionDuration = reducedMotion ? '0.01ms' : '520ms';
    }

    destroy() {
      cancelAnimationFrame(this.rafId);
      window.removeEventListener('resize', this.handleResize);
      window.removeEventListener('orientationchange', this.handleResize);
      window.removeEventListener('scroll', this.handleViewportUpdate);
      this.resizeObserver?.disconnect();
      this.intersectionObserver?.disconnect();
    }
  }

  const instances = Array.from(document.querySelectorAll('[data-process-flow]')).map((root) => new ProcessFlow(root));

  window.addEventListener('beforeunload', () => {
    instances.forEach((instance) => instance.destroy());
  });
})();
