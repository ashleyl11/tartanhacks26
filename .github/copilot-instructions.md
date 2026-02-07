# Copilot instructions for this repository

This repository is a small static website (HTML/CSS/JS) under the "solid state" folder. The goal of this file is to give AI coding agents the minimal, actionable knowledge to be productive quickly.

Overview
- Project type: static site with client-side JavaScript; no Node.js build or CI configured.
- Primary content: the site lives in the `solid state` directory (note: the directory name contains a space).

Key files and directories
- `solid state/index.html` — main site entry for the "solid state" pages.
- `solid state/assets/js/` — custom JavaScript (includes `main.js`, `maplogic.js`, `map.html` uses these).
- `solid state/config.example.js` and `solid state/config.js` — configuration pattern: copy example to `config.js` and edit locally.
- `solid state/assets/sass/` — SCSS sources; compiled CSS is in `solid state/assets/css/`.

How to run locally (no special tooling)
- Serve the repo root with a local static server, e.g.:

  python3 -m http.server 8000

- Then open `http://localhost:8000/solid%20state/index.html` (space must be URL-encoded).

How to build styles (if you need to change SCSS)
- The project stores SCSS under `solid state/assets/sass`. There is no automated build in repo — use an installed `sass` CLI, e.g.:

  sass "solid state/assets/sass/main.scss":"solid state/assets/css/main.css" --no-source-map --style=expanded

- Commit only the compiled CSS if you change it (this project currently ships compiled CSS in `assets/css`).

Conventions & patterns
- Minimal JS stack: code is jQuery + vanilla JS. Avoid introducing frameworks unless requested.
- Local configuration: do not modify `config.example.js`; instead edit or create `config.js`. Treat `config.js` as developer-local config.
- Assets are referenced with relative paths from the `solid state` HTML files; be careful when moving files because paths are not centralized.

Important quirks
- Folder name contains a space (`solid state`). When scripting or writing shell commands, quote paths or escape spaces.
- There is no package.json, build scripts, or test harness -- assume changes are validated by opening pages in-browser.

Editing guidance for agents
- Prefer small, localized edits. Example: to change map behavior, edit `solid state/assets/js/maplogic.js` and test by serving and opening `solid state/map.html`.
- When adding CSS, prefer editing the SCSS sources and compiling to the existing `assets/css/main.css` so pages continue to reference the compiled file.

PR and commit guidance
- Keep commits focused and small; include screenshots for UI changes when possible.
- Do not remove or drastically refactor `assets/css` compiled files unless you add a reproducible build step.

If something is unclear
- Ask the repository owner whether they want to adopt a build tool (npm/parcel/sass watcher) before large refactors.

End of file
