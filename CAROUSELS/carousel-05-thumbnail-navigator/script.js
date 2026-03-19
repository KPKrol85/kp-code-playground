(() => {
  const selector = '[data-carousel]';
  const instances = document.querySelectorAll(selector);

  if (!instances.length) {
    return;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const debounce = (callback, delay) => {
    let timeoutId = 0;
    return (...args) => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => callback(...args), delay);
    };
  };

  const slideArtwork = {
    'media/large/atrium-threshold-composition.jpg': {
      accent: '#ccb48c',
      secondary: '#5c6f67',
      shadow: '#211c19',
      horizon: '#ece0c6'
    },
    'media/large/velvet-seating-axis.jpg': {
      accent: '#8d6d62',
      secondary: '#846f52',
      shadow: '#16171b',
      horizon: '#d8c4ad'
    },
    'media/large/stone-metal-joinery-study.jpg': {
      accent: '#b2a28d',
      secondary: '#73777c',
      shadow: '#1b1f23',
      horizon: '#f0e8da'
    },
    'media/large/monolithic-plinth-arrangement.jpg': {
      accent: '#c4b39c',
      secondary: '#6b655f',
      shadow: '#17191e',
      horizon: '#e7dece'
    },
    'media/large/layered-suite-outlook.jpg': {
      accent: '#a7876b',
      secondary: '#5e6879',
      shadow: '#13151a',
      horizon: '#d9cfbf'
    },
    'media/large/cabinet-wall-perspective.jpg': {
      accent: '#a99779',
      secondary: '#60645b',
      shadow: '#14161a',
      horizon: '#e2d4bc'
    }
  };

  const getArtworkPalette = (src) => {
    if (slideArtwork[src]) {
      return slideArtwork[src];
    }

    const hash = Array.from(src).reduce((total, character) => total + character.charCodeAt(0), 0);
    const hue = hash % 360;

    return {
      accent: `hsl(${hue} 24% 68%)`,
      secondary: `hsl(${(hue + 30) % 360} 14% 44%)`,
      shadow: `hsl(${(hue + 300) % 360} 18% 12%)`,
      horizon: `hsl(${(hue + 8) % 360} 42% 90%)`
    };
  };

  const buildSvgDataUri = ({ src, title, description, variant }) => {
    const palette = getArtworkPalette(src);
    const safeTitle = title.replace(/[<&>]/g, '');
    const safeDescription = description.replace(/[<&>]/g, '');
    const dimensions = variant === 'thumb' ? { width: 600, height: 400 } : { width: 1600, height: 1000 };
    const body = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${dimensions.width} ${dimensions.height}" role="img" aria-label="${safeTitle}">
        <defs>
          <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stop-color="${palette.shadow}" />
            <stop offset="48%" stop-color="${palette.secondary}" />
            <stop offset="100%" stop-color="${palette.accent}" />
          </linearGradient>
          <filter id="blur"><feGaussianBlur stdDeviation="18" /></filter>
        </defs>
        <rect width="100%" height="100%" fill="url(#bg)" />
        <circle cx="${dimensions.width * 0.15}" cy="${dimensions.height * 0.18}" r="${dimensions.width * 0.12}" fill="${palette.horizon}" opacity="0.42" filter="url(#blur)" />
        <rect x="${dimensions.width * 0.08}" y="${dimensions.height * 0.12}" width="${dimensions.width * 0.84}" height="${dimensions.height * 0.76}" rx="32" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.12)" />
        <rect x="${dimensions.width * 0.14}" y="${dimensions.height * 0.18}" width="${dimensions.width * 0.46}" height="${dimensions.height * 0.52}" rx="24" fill="rgba(255,255,255,0.08)" />
        <rect x="${dimensions.width * 0.18}" y="${dimensions.height * 0.24}" width="${dimensions.width * 0.28}" height="${dimensions.height * 0.34}" rx="20" fill="rgba(255,255,255,0.16)" />
        <rect x="${dimensions.width * 0.54}" y="${dimensions.height * 0.26}" width="${dimensions.width * 0.2}" height="${dimensions.height * 0.42}" rx="18" fill="rgba(10,12,16,0.24)" />
        <rect x="${dimensions.width * 0.76}" y="${dimensions.height * 0.18}" width="${dimensions.width * 0.08}" height="${dimensions.height * 0.48}" rx="18" fill="rgba(255,255,255,0.12)" />
        <path d="M0 ${dimensions.height * 0.78} C ${dimensions.width * 0.18} ${dimensions.height * 0.68}, ${dimensions.width * 0.34} ${dimensions.height * 0.88}, ${dimensions.width * 0.58} ${dimensions.height * 0.76} S ${dimensions.width * 0.92} ${dimensions.height * 0.67}, ${dimensions.width} ${dimensions.height * 0.78} L ${dimensions.width} ${dimensions.height} L 0 ${dimensions.height} Z" fill="rgba(10,12,16,0.36)" />
        <text x="${dimensions.width * 0.14}" y="${dimensions.height * 0.82}" fill="rgba(255,255,255,0.88)" font-family="Inter, Arial, sans-serif" font-size="${variant === 'thumb' ? 22 : 40}" letter-spacing="${variant === 'thumb' ? 2 : 4}">${safeTitle.toUpperCase()}</text>
        <text x="${dimensions.width * 0.14}" y="${dimensions.height * 0.88}" fill="rgba(255,255,255,0.62)" font-family="Inter, Arial, sans-serif" font-size="${variant === 'thumb' ? 12 : 20}">${safeDescription}</text>
      </svg>
    `;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(body)}`;
  };

  const setupCarousel = (root, instanceIndex) => {
    const viewer = root.querySelector('[data-carousel-viewer]');
    const mainImage = root.querySelector('[data-carousel-image]');
    const title = root.querySelector('[data-carousel-title]');
    const kicker = root.querySelector('[data-carousel-kicker]');
    const description = root.querySelector('[data-carousel-description]');
    const status = root.querySelector('[data-carousel-status]');
    const counter = root.querySelector('[data-carousel-counter]');
    const thumbTrack = root.querySelector('[data-carousel-thumbnails]');
    const prevButton = root.querySelector('[data-carousel-prev]');
    const nextButton = root.querySelector('[data-carousel-next]');
    const loadingIndicator = root.querySelector('[data-carousel-loading]');
    const lightbox = root.querySelector('[data-carousel-lightbox]');
    const lightboxImage = root.querySelector('[data-carousel-lightbox-image]');
    const lightboxCaption = root.querySelector('[data-carousel-lightbox-caption]');
    const lightboxOpen = root.querySelector('[data-carousel-lightbox-open]');
    const lightboxCloseButtons = root.querySelectorAll('[data-carousel-lightbox-close]');
    const thumbs = Array.from(root.querySelectorAll('[data-carousel-thumb]'));
    const stage = root.querySelector('[data-carousel-stage]');
    const state = {
      activeIndex: Math.max(
        0,
        thumbs.findIndex((thumb) => thumb.getAttribute('aria-current') === 'true')
      ),
      touchStartX: 0,
      touchDeltaX: 0,
      lastFocusedElement: null,
      resizeObserver: null,
      hasAnnouncedReady: false
    };

    if (!viewer || !mainImage || !thumbTrack || !thumbs.length) {
      return;
    }

    if (stage) {
      stage.setAttribute('id', `tn-stage-${instanceIndex}`);
    }

    thumbs.forEach((thumb, thumbIndex) => {
      const thumbImage = thumb.querySelector('[data-thumb-image]');
      const thumbSrc = thumb.dataset.thumbSrc || '';
      const largeSrc = thumb.dataset.largeSrc || '';
      const titleText = thumb.dataset.title || `Image ${thumbIndex + 1}`;
      const descriptionText = thumb.dataset.description || '';

      if (stage?.id) {
        thumb.setAttribute('aria-controls', stage.id);
      }

      thumb.dataset.resolvedLarge = buildSvgDataUri({
        src: largeSrc,
        title: titleText,
        description: descriptionText,
        variant: 'large'
      });
      thumb.dataset.resolvedThumb = buildSvgDataUri({
        src: thumbSrc || largeSrc,
        title: titleText,
        description: thumb.dataset.kicker || descriptionText,
        variant: 'thumb'
      });

      if (thumbImage) {
        thumbImage.src = thumb.dataset.resolvedThumb;
        thumbImage.alt = '';
      }
    });

    const emitChangeEvent = (index) => {
      const activeThumb = thumbs[index];
      if (!activeThumb) {
        return;
      }

      root.dispatchEvent(
        new CustomEvent('carousel:change', {
          bubbles: true,
          detail: {
            index,
            title: activeThumb.dataset.title,
            description: activeThumb.dataset.description,
            src: activeThumb.dataset.largeSrc
          }
        })
      );
    };

    const announce = (index) => {
      const activeThumb = thumbs[index];
      if (!activeThumb || !status) {
        return;
      }

      status.textContent = `Image ${index + 1} of ${thumbs.length}: ${activeThumb.dataset.title}`;
    };

    const updateCompactState = () => {
      root.classList.toggle('is-compact', root.clientWidth < 780);
    };

    const syncActiveThumbnail = (index) => {
      thumbs.forEach((thumb, thumbIndex) => {
        const isActive = thumbIndex === index;
        thumb.classList.toggle('is-active', isActive);
        if (isActive) {
          thumb.setAttribute('aria-current', 'true');
        } else {
          thumb.removeAttribute('aria-current');
        }
      });

      thumbs[index]?.scrollIntoView({
        behavior: prefersReducedMotion.matches ? 'auto' : 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    };

    const setLoadingState = (isLoading) => {
      root.classList.toggle('is-loading', isLoading);
      if (loadingIndicator) {
        loadingIndicator.setAttribute('aria-hidden', String(!isLoading));
      }
    };

    const applySlide = (index, options = {}) => {
      const normalizedIndex = (index + thumbs.length) % thumbs.length;
      const activeThumb = thumbs[normalizedIndex];

      if (!activeThumb) {
        return;
      }

      state.activeIndex = normalizedIndex;
      const resolvedLarge = activeThumb.dataset.resolvedLarge || '';
      const altText = activeThumb.dataset.alt || '';
      const titleText = activeThumb.dataset.title || '';
      const kickerText = activeThumb.dataset.kicker || '';
      const descriptionText = activeThumb.dataset.description || '';

      setLoadingState(true);

      const preload = new Image();
      preload.decoding = 'async';
      preload.src = resolvedLarge;

      const commit = () => {
        mainImage.src = resolvedLarge;
        mainImage.alt = altText;
        title.textContent = titleText;
        kicker.textContent = kickerText;
        description.textContent = descriptionText;
        counter.textContent = `${String(normalizedIndex + 1).padStart(2, '0')} / ${String(thumbs.length).padStart(2, '0')}`;
        lightboxImage.src = resolvedLarge;
        lightboxImage.alt = altText;
        lightboxCaption.textContent = `${titleText} — ${descriptionText}`;
        syncActiveThumbnail(normalizedIndex);
        announce(normalizedIndex);
        setLoadingState(false);
        root.classList.add('is-ready');

        if (!options.silent) {
          emitChangeEvent(normalizedIndex);
        }

        if (!state.hasAnnouncedReady) {
          state.hasAnnouncedReady = true;
          root.dispatchEvent(
            new CustomEvent('carousel:ready', {
              bubbles: true,
              detail: {
                instance: instanceIndex,
                count: thumbs.length,
                activeIndex: normalizedIndex
              }
            })
          );
        }
      };

      if (preload.complete) {
        commit();
      } else {
        preload.addEventListener('load', commit, { once: true });
        preload.addEventListener('error', commit, { once: true });
      }
    };

    const moveBy = (delta) => {
      applySlide(state.activeIndex + delta);
    };

    thumbs.forEach((thumb, index) => {
      thumb.addEventListener('click', () => {
        applySlide(index);
      });
    });

    prevButton?.addEventListener('click', () => moveBy(-1));
    nextButton?.addEventListener('click', () => moveBy(1));

    viewer.addEventListener('keydown', (event) => {
      if (lightbox?.open) {
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        moveBy(-1);
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        moveBy(1);
      }
    });

    viewer.addEventListener(
      'touchstart',
      (event) => {
        const touch = event.changedTouches[0];
        state.touchStartX = touch?.clientX || 0;
        state.touchDeltaX = 0;
      },
      { passive: true }
    );

    viewer.addEventListener(
      'touchmove',
      (event) => {
        const touch = event.changedTouches[0];
        state.touchDeltaX = (touch?.clientX || 0) - state.touchStartX;
      },
      { passive: true }
    );

    viewer.addEventListener(
      'touchend',
      () => {
        if (Math.abs(state.touchDeltaX) < 40) {
          return;
        }

        moveBy(state.touchDeltaX > 0 ? -1 : 1);
      },
      { passive: true }
    );

    const closeLightbox = () => {
      if (!lightbox?.open) {
        return;
      }

      lightbox.close();
      state.lastFocusedElement?.focus?.();
    };

    lightboxOpen?.addEventListener('click', () => {
      if (!lightbox) {
        return;
      }

      state.lastFocusedElement = document.activeElement;
      lightbox.showModal();
      root.classList.add('is-lightbox-open');
      lightbox.querySelector('.tn-lightbox__close')?.focus();
    });

    lightbox?.addEventListener('close', () => {
      root.classList.remove('is-lightbox-open');
    });

    lightbox?.addEventListener('cancel', (event) => {
      event.preventDefault();
      closeLightbox();
    });

    lightbox?.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeLightbox();
      }
    });

    lightboxCloseButtons.forEach((button) => {
      button.addEventListener('click', closeLightbox);
    });

    const onResize = debounce(updateCompactState, 100);

    if ('ResizeObserver' in window) {
      state.resizeObserver = new ResizeObserver(onResize);
      state.resizeObserver.observe(root);
    } else {
      window.addEventListener('resize', onResize);
    }

    updateCompactState();
    applySlide(state.activeIndex, { silent: true });
  };

  instances.forEach((root, index) => {
    setupCarousel(root, index);
  });
})();
