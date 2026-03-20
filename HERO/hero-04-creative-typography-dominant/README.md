# Creative Typography Dominant

A standalone premium hero component where oversized typography acts as the primary image system. The composition is aimed at creative studios, design-led portfolios, and culture-oriented landing pages that need a memorable first impression without relying on photography.

## Component concept

This hero treats the headline as architecture. Large display lines create the main visual mass, while quieter supporting panels and metadata sit around it like editorial annotations. The result is expressive, art-directed, and commercially usable rather than experimental for its own sake.

## Typographic hierarchy strategy

- **Display layer:** A four-line headline uses scale, offset placement, and one outlined word to establish contrast and motion within a static composition.
- **Supporting layer:** A compact content card carries the paragraph, CTAs, and manifesto copy so the interface remains clear and secondary to the headline.
- **Metadata layer:** Project details sit in a slim side panel to reinforce the studio/editorial framing without cluttering the hero.
- **Accent layer:** A restrained bottom marquee and a vertical type rail extend the typographic system without competing with the main headline.

## Composition logic

The layout uses three zones on desktop: metadata, headline, and support content. The headline intentionally breaks the internal grid with offset lines so the typography feels art-directed. On smaller screens the composition is recomposed into a single-column stack, preserving bold scale while removing fragile overlaps and heavy offsets.

## Motion behavior

- Headline fragments, metadata, and supporting content reveal in a short staggered sequence once visible.
- The marquee quietly scrolls to add motion energy at the edge of the hero.
- Hovering or focusing the marquee pauses its movement for readability.
- With reduced-motion enabled, all reveal animation becomes immediate and the marquee stops animating.

## Accessibility decisions

- Semantic landmarks and heading structure are used throughout.
- CTA controls are native links styled as buttons for full keyboard support.
- Strong `:focus-visible` outlines are included to remain visible against the dark expressive background.
- Decorative type treatments such as the background word and vertical rail are hidden from assistive technology when appropriate.
- Reduced-motion preferences are respected for both reveal animation and marquee behavior.

## Responsive strategy

- Major text sizes use `clamp()` to stay fluid between mobile and large desktop breakpoints.
- The headline is recomposed on mobile by removing large offsets rather than simply shrinking the desktop arrangement.
- Side metadata becomes a stacked information block on smaller screens.
- The vertical text rail converts into a horizontal strip for easier reading and better space usage.

## Customization guidance

- Replace the headline lines in `index.html` to adapt the component to a studio name, campaign, or portfolio statement.
- Adjust the outlined line treatment in `style.css` by editing `.typo-hero__line--outline`.
- Update the brand mood quickly by changing the root color variables in `style.css`.
- The marquee phrases can be swapped or removed entirely without affecting the core composition.
- If the component is used in a quieter brand system, reduce `--headline-size` and the background word opacity for a more restrained look.
