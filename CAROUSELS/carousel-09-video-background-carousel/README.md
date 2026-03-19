# Video Background Carousel

A premium standalone hero carousel built for cinematic brand storytelling. Each slide behaves like a living scene with full-bleed video, layered overlays for readability, and restrained navigation that keeps the focus on the message.

## Best-fit use cases

- luxury travel and hospitality heroes
- product launches and reveal moments
- agency landing pages and campaign storytelling
- premium editorial or brand-first homepages

## What it does

- Plays only the active slide video while pausing and resetting inactive videos.
- Uses fade-based transitions to avoid harsh movement between scenes.
- Keeps a strong poster-first fallback so the hero still looks premium if video playback is blocked or reduced.
- Supports keyboard navigation, touch swipe gestures, visible focus states, and concise live-region announcements.
- Pauses carousel autoplay on hover, focus within, and when the component is mostly offscreen.
- Emits `carousel:ready` and `carousel:change` custom events for host integration.

## Accessibility

- semantic `section` landmark with an accessible region label
- native buttons for previous/next and pagination
- `aria-live="polite"` announcements for slide changes
- `ArrowLeft` and `ArrowRight` keyboard support
- reduced-motion aware behavior that falls back to calmer poster-led presentation
- no audio and muted video playback only

## Playback and fallback behavior

The carousel tries to play only the active muted video. If autoplay policies, reduced-motion preferences, data-saver conditions, or constrained environments prevent playback, it switches to premium poster-led behavior instead of leaving a broken media experience.

## Responsive behavior

The component is mobile-first, uses `object-fit: cover` for video framing, preserves layout space with a fixed hero height strategy, and adapts content width plus control layout across tablet and desktop breakpoints.

## File structure

- `index.html` – semantic standalone markup and demo content
- `style.css` – fully scoped visual system, responsive layout, and transition styling
- `script.js` – multi-instance carousel logic, playback control, observers, and interaction support
- `README.md` – usage notes and customization guidance

## Customization

Replace the demo video source URLs and poster URLs inside each slide’s `<video>` element. Update headlines, supporting copy, CTA labels, and the pagination labels directly in `index.html`. You can tune autoplay timing through `data-autoplay-delay`, disable carousel autoplay with `data-autoplay="false"`, and refine overlay mood by adjusting the overlay/accent variables in `style.css`.
