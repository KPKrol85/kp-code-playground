# Outland Gear build pipeline notes

## Detected entrypoints
- CSS entrypoint used by HTML: `css/main.css`
- JavaScript entrypoint used by HTML: `js/app.js`

## Installed tooling
- `postcss-cli`
- `postcss-import`
- `cssnano`
- `esbuild`

## Available npm scripts
- `npm run build:css` → bundles/minifies CSS from `css/main.css` to `css/main.min.css`
- `npm run build:js` → bundles/minifies JS from `js/app.js` to `js/app.min.js`
- `npm run build` → runs both CSS and JS builds
- `npm run watch:css` → watches and rebuilds CSS
- `npm run watch:js` → watches and rebuilds JS

## Generated production outputs
- `css/main.min.css`
- `js/app.min.js`

## Modified file paths
- `package.json`
- `postcss.config.js`
- `BUILD-PIPELINE.md`
- `css/main.min.css` (generated)
- `js/app.min.js` (generated)
