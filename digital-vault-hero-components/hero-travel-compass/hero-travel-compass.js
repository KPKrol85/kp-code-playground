(() => {
  const root = document.querySelector('.hero-travel-compass');
  if (!root) return;

  const chips = Array.from(root.querySelectorAll('.hero-travel-compass__chip'));
  const itineraryTitle = root.querySelector('[data-itinerary-title]');
  const itineraryDescription = root.querySelector('[data-itinerary-description]');
  const itineraryHighlights = root.querySelector('[data-itinerary-highlights]');
  const bookingWindow = root.querySelector('[data-booking-window]');
  const bookingDuration = root.querySelector('[data-booking-duration]');
  const bookingPrice = root.querySelector('[data-booking-price]');
  const bookingNote = root.querySelector('[data-booking-note]');
  const scenicCard = root.querySelector('[data-scenic-card]');

  const destinationMap = {
    amalfi: {
      title: 'Azure Coastline Escape',
      description: 'Sail between cliffside villages, reserve sunset terraces, and sleep in a restored palazzo above the sea.',
      highlights: [
        'Private transfer from Naples to Positano',
        'Chef-led limoncello and coastal cuisine evening',
        'Sunrise yacht route through Li Galli islands'
      ],
      window: 'April – June',
      duration: '6 nights',
      price: '$3,200 / guest',
      note: 'Includes concierge planning call and personalized activity map.'
    },
    kyoto: {
      title: 'Lantern & Garden Passage',
      description: 'Move from ryokan serenity to hidden tea houses, with seasonal gardens and private cultural hosts.',
      highlights: [
        'Early-entry temple photography route',
        'Kaiseki tasting with neighborhood storyteller',
        'Handcrafted incense workshop in Gion'
      ],
      window: 'October – November',
      duration: '5 nights',
      price: '$2,850 / guest',
      note: 'Perfect for culture-focused escapes with calm pacing.'
    },
    patagonia: {
      title: 'Peaks, Glaciers & Sky',
      description: 'Track dramatic ridgelines, warm up in design-forward lodges, and watch constellations over open valleys.',
      highlights: [
        'Guided trek through Los Glaciares trail corridor',
        'Helicopter glacier flyover and alpine picnic',
        'Night-sky observatory experience'
      ],
      window: 'December – March',
      duration: '7 nights',
      price: '$4,100 / guest',
      note: 'Recommended for active travelers seeking high-impact landscapes.'
    },
    marrakech: {
      title: 'Atlas to Medina Immersion',
      description: 'Blend colorful souks, rooftop riads, and mountain air with curated artisan encounters.',
      highlights: [
        'Private design walk through medina ateliers',
        'Sunset dinner in Agafay desert camp',
        'Atlas foothill wellness hammam ritual'
      ],
      window: 'March – May',
      duration: '4 nights',
      price: '$2,300 / guest',
      note: 'A compact luxury itinerary with rich sensory experiences.'
    }
  };

  const updateDestination = (key) => {
    const data = destinationMap[key];
    if (!data) return;
    if (itineraryTitle) itineraryTitle.textContent = data.title;
    if (itineraryDescription) itineraryDescription.textContent = data.description;
    if (itineraryHighlights) {
      itineraryHighlights.innerHTML = '';
      data.highlights.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        itineraryHighlights.appendChild(li);
      });
    }
    if (bookingWindow) bookingWindow.textContent = data.window;
    if (bookingDuration) bookingDuration.textContent = data.duration;
    if (bookingPrice) bookingPrice.textContent = data.price;
    if (bookingNote) bookingNote.textContent = data.note;
  };

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((btn) => btn.setAttribute('aria-pressed', String(btn === chip)));
      updateDestination(chip.dataset.destination);
    });
  });

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = Array.from(root.querySelectorAll('.hero-travel-compass-reveal'));
  if (!reducedMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  if (!reducedMotion && scenicCard && window.matchMedia('(pointer: fine)').matches) {
    scenicCard.addEventListener('pointermove', (event) => {
      const rect = scenicCard.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      scenicCard.style.transform = `perspective(900px) rotateY(${x * 5}deg) rotateX(${y * -5}deg)`;
    });
    scenicCard.addEventListener('pointerleave', () => {
      scenicCard.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg)';
    });
  }
})();
