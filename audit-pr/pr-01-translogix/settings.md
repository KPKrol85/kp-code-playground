# settings.md

## package.json scripts reference

`package.json` detected in project.

| Script name | Command | What it does | When to use it |
|---|---|---|---|
| `dev:css` | `npm run build:css` | Alias that runs CSS build. | Quick local CSS rebuild. |
| `build:css` | `postcss assets/css/style.css -o assets/css/style.min.css` | Processes modular CSS via PostCSS and outputs minified stylesheet. | Before dist build or deployment packaging. |
| `deploy:css` | `npm run build:css` | Runs the CSS build pipeline (same behavior as `build:css`). | When deployment workflow expects CSS rebuild only. |
| `verify:assets` | `node scripts/verify-assets.js` | Checks project asset references/integrity according to custom script logic. | After asset path changes and before release. |
| `img:opt` | `node scripts/optimize-images.js` | Runs image optimization workflow for project images. | After adding/replacing large images. |
| `check:html` | `html-validate "**/*.html"` | Validates all HTML files with html-validate rules. | HTML quality gate (local/CI). |
| `check:links` | `node scripts/check-local-links.js` | Scans local `href/src` in root HTML files and fails on missing local targets. | After editing links/assets and before E2E. |
| `pretest:e2e` | `npm run check:links` | Pre-hook executed automatically before `test:e2e`. | Runs implicitly when launching E2E. |
| `check:a11y` | `start-server-and-test "http-server . -p 8080" http://127.0.0.1:8080 "pa11y-ci --config .pa11yci.json"` | Serves project locally and runs pa11y-ci accessibility checks. | Accessibility regression check in QA/CI. |
| `check` | `npm run check:html && npm run check:a11y` | Combined quality command for HTML + a11y checks. | Standard pre-merge quality run. |
| `test:e2e` | `playwright test` | Executes Playwright end-to-end suite. | Functional regression testing. |
| `test:e2e:ui` | `playwright test --ui` | Runs Playwright in interactive UI mode. | Local test debugging and selective reruns. |
| `test:e2e:report` | `playwright show-report` | Opens the latest Playwright HTML report. | Review E2E run details after tests. |
| `lhci` | `npx --yes @lhci/cli@0.14.0 autorun --config=./lighthouserc.json` | Runs Lighthouse CI with repository config. | Performance/SEO/best-practices auditing in CI or local QA. |
| `check:budget` | `node scripts/check-budgets.js` | Gzip budget validation based on `perf-budgets.json`. | Verify asset size limits before release. |
| `build:js` | `node scripts/build-js.js` | Builds `assets/js/main.min.js` from `assets/js/main.js` using project minify script. | Before dist packaging or release bundle creation. |
| `build:assets` | `npm run build:css && npm run build:js` | Builds both minified CSS and minified JS assets. | Standard pre-dist asset build step. |
| `build:dist` | `npm run build:assets && node scripts/build-dist.js` | Creates `dist/`, copies required files/assets, rewrites HTML/SW references to minified assets. | Generate deployable static package. |
| `build` | `npm run build:dist` | Top-level build alias for full dist package generation. | Default release build command. |
