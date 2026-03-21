# Geometric Abstract Architectural

A premium standalone hero package for architecture studios, premium property brands, interior design firms, and development-led presentations. The component uses measured geometry, clipped media planes, and blueprint-like linework to communicate order, permanence, and modern spatial discipline.

## Component concept

This hero is built as an architectural composition rather than a standard text-plus-image banner. The layout treats copy, media, metadata, and separators as part of the same structural system so the full hero feels intentional, stable, and commercially credible.

## Layout and geometry logic

The section is organized into five coordinated layers:

1. **Masthead layer** for package identity and project metadata.
2. **Content plane** for the primary narrative, supporting copy, CTA group, and project metrics.
3. **Primary media plane** for the dominant clipped architectural visual.
4. **Support rail** for annotations, material study, and technical detail.
5. **Blueprint skeleton** for visible linework, gridded spacing, and sectional cues.

The asymmetry is controlled rather than dramatic: the content plane establishes weight on the left while the right side offsets the composition with a larger masked image and a narrower technical rail.

## Masking strategy

- The primary media block uses a deep-cut polygon mask to create a sectional, drafted silhouette.
- The secondary media block repeats the geometric language with a simplified clipped corner so the visual system stays coherent.
- Layered frame and shadow treatments reinforce the sense that the image planes are embedded in the layout geometry rather than floating rectangles.
- Small-screen breakpoints simplify the masks to preserve clarity and reduce fragility.

## Motion behavior

JavaScript adds restrained enhancements while preserving a strong non-JavaScript baseline:

- staged reveal timing for content, captions, and supporting detail
- blueprint line-draw sequencing on load
- low-amplitude parallax shifts for selected structural layers on pointer move and scroll

The motion is intentionally quiet and measured so the hero remains architectural rather than expressive or playful.

## Accessibility decisions

- semantic `main`, `section`, `header`, `article`, `aside`, and description list structure
- native anchor elements for CTAs
- descriptive `alt` text for both media planes
- strong global `:focus-visible` treatment for keyboard navigation
- progressive enhancement so the full layout remains readable without JavaScript
- reduced-motion handling that disables staged reveals, line drawing, and parallax offsets

## Responsive strategy

- Desktop keeps the intended asymmetry between the content plane, primary image plane, and support rail.
- Tablet collapses the hero to a single-column narrative-first flow while preserving the layered media hierarchy.
- Mobile further simplifies the clipping geometry, stacks CTA controls vertically, and moves captions out of overlays when needed for readability.

## Customization guidance

To adapt this package for another brand or project:

1. Replace the headline, supporting copy, metadata, and annotations in `index.html`.
2. Update the architectural palette variables and line opacity values in `style.css`.
3. Swap the embedded SVG media sources with project photography, renders, or branded stills.
4. Adjust the `clip-path` values if your imagery needs a sharper or softer geometric silhouette.
5. Tune `data-depth` values in `index.html` if you want more or less spatial motion.
