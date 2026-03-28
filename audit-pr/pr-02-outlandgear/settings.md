# settings.md — npm scripts documentation

## package.json status
`package.json` detected in project root.

## Scripts

### 1) `build:css`
- **Command:** `postcss css/main.css -o css/main.min.css`
- **What it does:** Runs PostCSS on the main CSS entry and writes a minified/bundled output file.
- **When to use:** Before release/deployment, or when you need an updated production CSS artifact after style changes.

### 2) `build:js`
- **Command:** `esbuild js/app.js --bundle --minify --outfile=js/app.min.js`
- **What it does:** Bundles the JavaScript application starting from `js/app.js` and outputs a minified bundle.
- **When to use:** Before release/deployment, or after JS module changes when generating production output.

### 3) `build`
- **Command:** `npm run build:css && npm run build:js`
- **What it does:** Executes a full production build pipeline in sequence (CSS first, JS second).
- **When to use:** Standard one-command build for release candidates, handoff, and static hosting artifacts.

### 4) `watch:css`
- **Command:** `postcss css/main.css -o css/main.min.css --watch`
- **What it does:** Watches CSS sources and continuously rebuilds `css/main.min.css` when changes are detected.
- **When to use:** During local front-end development focused on styling.

### 5) `watch:js`
- **Command:** `esbuild js/app.js --bundle --minify --outfile=js/app.min.js --watch`
- **What it does:** Watches JavaScript modules and continuously rebuilds `js/app.min.js` when files change.
- **When to use:** During local development focused on interaction/business logic updates.
