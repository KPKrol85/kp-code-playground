# Immersive Cinematic Video

A standalone premium hero component built for luxury hospitality, travel, destination, and elevated lifestyle landing pages. The package uses a full-viewport cinematic video stage, layered contrast overlays, restrained motion, and concise editorial copy so the atmosphere lands before the visitor reaches deeper page content.

## Component concept

- Full-bleed cinematic hero with a centered, low-density content stack.
- Premium editorial hierarchy: overline, impact headline, short supporting line, and restrained CTA pair.
- Optional ambient sound toggle that remains muted by default and only enables audio after explicit user action.
- Subtle scroll cue to guide continuation without competing with the hero message.

## Video, poster, and fallback strategy

- The hero uses a native HTML5 `<video>` element with `autoplay`, `muted`, `loop`, `playsinline`, and an inline SVG `poster` for graceful loading without depending on a separate poster file.
- JavaScript swaps between a lighter mobile source and a higher-resolution desktop source.
- If autoplay is blocked or video playback fails, the embedded poster artwork and CSS background treatment preserve the premium visual presentation.
- The content remains readable even when only the poster/background image is visible.

## Overlay and readability logic

- Multiple overlay layers manage contrast: a base darkening wash, a vignette, and a bottom fade for the transition into following content.
- Typography is centered and width-constrained to preserve legibility over moving media.
- CTA styles use luminous solid and ghost treatments that stay clear against dark footage.
- Focus-visible states are intentionally bright so keyboard users can track interaction targets over the cinematic background.

## Motion and sound behavior

- Foreground content reveals with a restrained staggered fade-up and blur-to-sharp sequence.
- A minimal parallax treatment is applied only to the media layer and only when motion preferences and pointer conditions allow it.
- Ambient sound is muted at load and can be enabled with the sound toggle.
- Reduced-motion users receive immediate content visibility with animations disabled.

## Accessibility decisions

- Semantic structure uses a clear main region, hero section, heading hierarchy, native links, and a native button for the sound toggle.
- The sound control includes `aria-label` and `aria-pressed` updates.
- All controls support keyboard navigation and strong `:focus-visible` treatment.
- Reduced-motion preferences are respected across reveal motion, parallax, and decorative animation.
- The hero remains understandable and readable without JavaScript or without video playback.

## Responsive behavior

- Typography scales with `clamp()` to preserve cinematic impact across viewports.
- On smaller screens, the utility bar recenters, CTA buttons stack, and a lighter video source is preferred.
- The composition keeps text concise and centered so the hero mood remains intact on mobile.

## Customization guidance

- Replace the demo headline, supporting copy, and CTA labels in `index.html`.
- Swap `data-desktop-src`, `data-mobile-src`, and `poster` with your own brand-approved video assets.
- Adjust overlay density, accent color, and typography sizing in `style.css` to fit the brand tone.
- Remove or simplify the sound toggle if the selected media should remain permanently silent.
