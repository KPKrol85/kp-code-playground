# FleetOps Image Asset Pipeline Map

## Current Asset Structure

The project currently keeps all runtime image-related assets under `assets/`.

```text
assets/
├── images/
│   └── hero/
│       ├── hero-dark.jpg
│       └── hero-light.jpg
├── icons/
│   ├── hamburger-dark.svg
│   ├── hamburger-light.svg
│   ├── logo-512.png
│   ├── logo-black.svg
│   └── logo-white.svg
├── favicon/
│   ├── apple-touch-icon.png
│   ├── favicon-96x96.png
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── site.webmanifest
│   ├── web-app-manifest-192x192.png
│   └── web-app-manifest-512x512.png
├── og-img/
│   ├── og-1200x1200.png
│   └── og-1200x630.png
├── screenshots/
│   ├── screenshot-desktop.png
│   └── screenshot-mobile.png
└── shortcuts/
    ├── dashboard.png
    ├── flota.png
    └── zlecenia.png
```

No `assets/img-src/` or `assets/img/` folders are currently present.

## Detected Runtime Image References

### HTML metadata and icons

- `index.html` references:
  - `assets/og-img/og-1200x630.png`
  - `assets/favicon/favicon.ico`
  - `assets/favicon/favicon.svg`
  - `assets/favicon/favicon-96x96.png`
  - `assets/favicon/apple-touch-icon.png`
  - `assets/favicon/site.webmanifest`

### Manifest assets

- `assets/favicon/site.webmanifest` references:
  - `assets/favicon/web-app-manifest-192x192.png`
  - `assets/favicon/web-app-manifest-512x512.png`
  - `assets/screenshots/screenshot-desktop.png`
  - `assets/screenshots/screenshot-mobile.png`
  - `assets/shortcuts/dashboard.png`
  - `assets/shortcuts/flota.png`
  - `assets/shortcuts/zlecenia.png`

### JavaScript-rendered runtime images

- `scripts/ui/layoutLanding.js` references hero images:
  - `assets/images/hero/hero-light.avif`
  - `assets/images/hero/hero-light.webp`
  - `assets/images/hero/hero-light.jpg`
  - `assets/images/hero/hero-dark.avif`
  - `assets/images/hero/hero-dark.webp`
  - `assets/images/hero/hero-dark.jpg`
- `scripts/ui/layoutLanding.js`, `scripts/ui/marketingPages.js`, `scripts/ui/layoutApp.js`, and `scripts/router.js` reference theme-aware logo and menu icons:
  - `assets/icons/logo-black.svg`
  - `assets/icons/logo-white.svg`
  - `assets/icons/hamburger-light.svg`
  - `assets/icons/hamburger-dark.svg`
- `scripts/router.js` also references:
  - `assets/icons/logo-02.svg`

## Detected Missing Referenced Assets

The following runtime references point to files that are not currently present in the repository:

- `assets/images/hero/hero-light.avif`
- `assets/images/hero/hero-light.webp`
- `assets/images/hero/hero-dark.avif`
- `assets/images/hero/hero-dark.webp`
- `assets/icons/logo-02.svg`

The current hero `<picture>` markup still has JPG fallbacks that exist:

- `assets/images/hero/hero-light.jpg`
- `assets/images/hero/hero-dark.jpg`

## Asset Categories

### Source-like hero images

The current `assets/images/hero/*.jpg` files appear to be the source/runtime fallback images for the landing hero.

- `hero-light.jpg` - 900x1440, referenced by `scripts/ui/layoutLanding.js`
- `hero-dark.jpg` - 900x1440, referenced by `scripts/ui/layoutLanding.js`

These are the primary candidates for a future source/output split.

### Optimized runtime images

The code already expects optimized hero variants:

- AVIF
- WebP
- JPG fallback

However, only the JPG fallback files are currently present under `assets/images/hero/`.

### SVG icons

The SVG files under `assets/icons/` are active runtime assets and should remain SVG:

- `logo-black.svg`
- `logo-white.svg`
- `hamburger-light.svg`
- `hamburger-dark.svg`

They should not be rasterized by the image optimization pipeline.

### PNG icon

- `assets/icons/logo-512.png` is present but was not detected in runtime references during this audit.
- It should be treated as unclear until a future reference check confirms whether it is needed for external tooling, documentation, or planned icon generation.

### Favicons and manifest icons

Files under `assets/favicon/` are active browser/PWA assets referenced by `index.html` and `site.webmanifest`.

They should remain in `assets/favicon/` and should not be mixed into the general image optimization output folder.

### Open Graph assets

- `assets/og-img/og-1200x630.png` is referenced by `index.html`.
- `assets/og-img/og-1200x1200.png` is present but was not detected in runtime references during this audit.

Keep Open Graph images separate under `assets/og-img/`.

### PWA screenshots

Files under `assets/screenshots/` are referenced by `site.webmanifest` and should remain separate.

### PWA shortcut icons

Files under `assets/shortcuts/` are referenced by `site.webmanifest` and should remain separate.

## Recommended Target Structure

For the next implementation step, keep specialized browser/PWA/social assets separate and introduce a source/output split only for general content images.

```text
assets/
├── img-src/
│   └── hero/
│       ├── hero-dark.jpg
│       └── hero-light.jpg
├── img/
│   └── hero/
│       ├── hero-dark.avif
│       ├── hero-dark.webp
│       ├── hero-dark.jpg
│       ├── hero-light.avif
│       ├── hero-light.webp
│       └── hero-light.jpg
├── icons/
├── favicon/
├── og-img/
├── screenshots/
└── shortcuts/
```

Recommended role split:

- `assets/img-src/` - original editable image sources.
- `assets/img/` - optimized runtime image outputs.
- `assets/icons/` - SVG and app icon assets, kept separate.
- `assets/favicon/` - favicon and manifest icon surface, kept separate.
- `assets/og-img/` - Open Graph/social sharing images, kept separate.
- `assets/screenshots/` - PWA screenshots, kept separate.
- `assets/shortcuts/` - PWA shortcut icons, kept separate.

## Proposed Optimization Strategy

`sharp` is appropriate for this project because:

- the project is static and does not need a heavy bundler;
- the current hero image markup already expects AVIF, WebP, and JPG variants;
- the production build workflow is already Node-based;
- image outputs can be generated predictably before `npm run build` copies assets into `dist/`.

Recommended future behavior:

- Install `sharp` as a dev dependency only when implementing the pipeline.
- Add a small Node script such as `optimize-images.js`.
- Read source images from `assets/img-src/`.
- Write optimized runtime images to `assets/img/`.
- Keep SVG icons as SVG and exclude them from raster optimization.
- Keep favicon, manifest, screenshots, shortcuts, and Open Graph assets outside the first general image pipeline unless a later step defines a separate workflow for those categories.

Recommended output formats:

- Photos: AVIF + WebP + JPG fallback.
- Transparent raster PNGs: AVIF + WebP + PNG fallback.
- SVG icons: keep SVG, do not rasterize.

## Suggested Future NPM Scripts

Future scripts should stay minimal:

```json
{
  "optimize:images": "node optimize-images.js",
  "build": "npm run optimize:images && node build-dist.js"
}
```

If the user wants build speed to remain fully manual, `build` can stay as `node build-dist.js` and image optimization can be run explicitly before production builds:

```json
{
  "optimize:images": "node optimize-images.js",
  "build": "node build-dist.js"
}
```

The safer default for production consistency is to run image optimization as part of `build`.

## Recommended Migration Order

1. Add `sharp` as a dev dependency.
2. Create `assets/img-src/` and move only the confirmed hero JPG source images into `assets/img-src/hero/`.
3. Create an image optimization script that generates `assets/img/hero/hero-light.*` and `assets/img/hero/hero-dark.*`.
4. Update landing hero references from `assets/images/hero/` to `assets/img/hero/`.
5. Resolve the missing `assets/icons/logo-02.svg` reference in `scripts/router.js`.
6. Run a runtime reference check to confirm all image references resolve.
7. Update `build-dist.js` only if needed so `dist/` copies the optimized runtime image folder.
8. After verification, remove or archive the old `assets/images/` folder only if it is no longer referenced.

## Dist Handling Notes

The current build copies the full `assets/` folder into `dist/`.

After the future image pipeline is implemented:

- `dist/` should contain optimized runtime outputs from `assets/img/`.
- `dist/` does not need original source images from `assets/img-src/`.
- `build-dist.js` should avoid copying `assets/img-src/` into production output.
- Specialized folders should continue to be copied unless a dedicated optimization step is introduced for them:
  - `assets/icons/`
  - `assets/favicon/`
  - `assets/og-img/`
  - `assets/screenshots/`
  - `assets/shortcuts/`

## Current Non-Blocking Notes

- Documentation mentions under `README.md` were treated as context only, not runtime truth.
- No image files were moved, renamed, optimized, or deleted in this step.
- No dependencies, build scripts, runtime references, or `dist/` files were modified in this step.
