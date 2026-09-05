# Claude Code in Terminal

A minimal React + TypeScript web app built with Vite 8 that serves as the runnable demo in the
*Claude Code — AI Crash Course for Developers*. The page is a single screen built from the Vite
React-TS template: a hero section featuring React + Vite logos, an interactive counter, and a
set of docs/community links — all intentionally small so it's easy to experiment with while
learning how Claude Code edits, builds, and runs a real project.

## Overview

The app renders one page with two stacked areas:

- **Hero** (`#center`) — the "Claude code in terminal" heading, React/Vite/hero images, and a
  **counter button** (`Count is N`). Clicking it increments state, which is the quickest way to
  see **Hot Module Replacement (HMR)** in action.
- **Next steps** (`#next-steps`) — two link cards pointing to the **Documentation** (Vite, React)
  and **Connect with us** (GitHub, Discord, X.com, Bluesky) sites, using SVG icons pulled from a
  sprite sheet.

## Features

- **HMR demo** — the page text explicitly points to `src/App.tsx`; edit and save to hot-reload
  instantly without a full refresh.
- **Interactive counter** — a `type="button"` that uses `useState`; each click re-renders the
  count and demonstrates React state driving the UI.
- **No `<form>` elements** — the button is `type="button"`, so there's no submit/reload behavior.
- **Dark-mode capable** — global styles in `index.css` respond to `prefers-color-scheme`.
- **SVG icon sprite** — `public/icons.svg` ships all icons (docs, social, GitHub, Discord, X,
  Bluesky) as `<use href="/icons.svg#...">` references instead of many files.
- **Zero added dependencies** — only `react` and `react-dom` at runtime.

## Tech stack

| Layer      | Choice                                                        |
| ---------- | ------------------------------------------------------------- |
| Build      | Vite 8                                                        |
| UI         | React 19 (single component, `useState` counter)               |
| Language   | TypeScript ~6.0 (strict, `verbatimModuleSyntax`)              |
| Styling    | Plain CSS — `App.css` (page) + `index.css` (global, dark mode) |
| Linting    | oxlint (`react`, `typescript`, `oxc` plugins)                 |

## Project structure

```
claude-code-in-terminal/
├── index.html                      # SPA shell (mounts #root, loads /src/main.tsx)
├── public/
│   ├── favicon.svg                 # site icon
│   └── icons.svg                   # SVG sprite (docs/social/GitHub/Discord/X/Bluesky)
├── package.json                    # scripts + dependencies
├── vite.config.ts                  # Vite config (React plugin)
├── tsconfig.json                   # TypeScript project references
├── tsconfig.app.json               # App/component type-checking
├── tsconfig.node.json              # Config-file type-checking (vite.config.ts)
├── .oxlintrc.json                  # oxlint rules (react/typescript/oxc)
├── README.md                       # getting-started reference
└── src/
    ├── main.tsx                    # React entry point (StrictMode + createRoot)
    ├── index.css                   # global styles + prefers-color-scheme dark mode
    ├── App.css                     # page-specific styles (hero, links, counters)
    ├── App.tsx                     # the whole page: hero, counter, next-steps links
    └── assets/                     # hero.png, react.svg, vite.svg
```

The app keeps everything in a single `App.tsx` component — that is deliberate for this demo
app (contrast with the sibling `claude-code-tip-calculator`, which is split into per-folder
components + `utils/`).

## Getting started

Requirements: a modern Node.js. Vite 8 needs **Node 20.19+** (or 22.12+).

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (hot reload)
npm run dev

# 3. Open the printed URL (http://localhost:5173 by default)
```

Edit `src/App.tsx` and save to watch HMR update the page live.

To build and preview a production bundle:

```bash
npm run build     # type-checks (tsc -b) then bundles with Vite → dist/
npm run preview   # serves the built dist/ locally
```

## Scripts

| Script            | Command                 | What it does                                            |
| ----------------- | ----------------------- | ------------------------------------------------------- |
| `npm run dev`     | `vite`                  | Dev server with hot module replacement                  |
| `npm run build`   | `tsc -b && vite build`  | Strict type-check, then production bundle to `dist/`    |
| `npm run lint`    | `oxlint`                | Lint with oxlint (`react`, `typescript`, `oxc` rules)   |
| `npm run preview` | `vite preview`          | Serve the production build locally                      |

## Testing

There are **no automated tests** in this app — as a minimal template demo it relies on the two
built-in quality gates instead:

```bash
npm run build   # TypeScript type-check (tsc -b) + Vite build
npm run lint    # oxlint
```

The sibling `claude-code-tip-calculator` app shows a working Vitest + React Testing Library
setup (with `npm test` / `npm run test:watch`) if you want to bring the same setup here later.