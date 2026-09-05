# Claude Code Tip Calculator

A dependency-light tip calculator web app built with Vite 8 + React 19 + TypeScript. It
runs fully in the browser (no backend), automatically recalculates results as you type, and
ships inside this repo next to the `claude-code-in-terminal` sibling app.

## Overview

The app is a single page with two sections:

- **Tip Calculator** — enter a **Bill** and a **Tip Amount** (whole dollars). The app shows
  the **Tip Percentage** (what percent of the bill the tip is) and the **Total** live, and a
  **Reset** button clears everything back to `0.00`.
- **Split the Bill** — an optional, collapsed-by-default section. Enter the **Number of
  people** and the app shows the **Tip per person** and **Total per person** per-head share.

## Features

- **Live recalculation** — every result updates the moment any input changes (no button needed).
- **Whole-number validation** with inline error messages — inputs accept digits only; letters,
  symbols, signs, and decimals are rejected.
- **Sensible business rules:**
  - Bill cannot be negative.
  - Tip cannot exceed the bill.
  - Number of people must be between **1 and 100** (so per-person amounts never become
    meaningless pennies).
- **Arrow-key stepping** — with an input focused, pressing `▲`/`▼` increases/decreases the
  value by 1 (correctly clamped at the valid range).
- **Collapsible split section** — built with native `<details>`/`<summary>`, no JavaScript
  toggling; keyboard-accessible out of the box.
- **Light/dark mode** — automatic via CSS custom properties and `prefers-color-scheme`.
- **No `<form>` elements** — inputs are controlled React inputs and buttons are
  `type="button"`, so pressing Enter never submits/reloads the page.
- **Zero runtime dependencies beyond React.**

## Tech stack

| Layer      | Choice                                                        |
| ---------- | ------------------------------------------------------------- |
| Build      | Vite 8                                                        |
| UI         | React 19 (hooks: `useState` only, no state library)           |
| Language   | TypeScript ~6.0 (strict, `verbatimModuleSyntax`)              |
| Styling    | Plain CSS with native nesting + custom property design tokens |
| Linting    | oxlint                                                        |
| Tests      | Vitest 5 + React Testing Library + jsdom                      |

## Project structure

```
claude-code-tip-calculator/
├── index.html                      # SPA shell (mounts #root, loads /src/main.tsx)
├── public/
│   └── favicon.svg
├── package.json                    # scripts + dependencies (see below)
├── vite.config.ts                  # Vite config (React plugin)
├── vitest.config.ts                # Test runner config (jsdom, setup, threads pool)
├── tsconfig.json                   # TypeScript project references
├── tsconfig.app.json               # App/component/utility type-checking
├── tsconfig.node.json              # Config-file type-checking (vite.config.ts)
├── .oxlintrc.json                  # oxlint rules (react/typescript/oxc)
└── src/
    ├── main.tsx                    # React entry point (StrictMode + createRoot)
    ├── index.css                   # design tokens, light/dark themes, base styles
    ├── App.css                     # shared component styles (cards, fields, rows, errors)
    ├── App.tsx                     # owns all state + derived values, composes the page
    ├── test/
    │   └── setup.ts                # jest-dom matchers + DOM cleanup between tests
    ├── utils/                      # pure, framework-free logic (unit-tested)
    │   ├── money.ts                # formatCurrency(), roundToCents()
    │   ├── numbers.ts              # isDigitsOnly(), stepValue()
    │   ├── validation.ts           # validateBill/Tip/People(), MAX_PEOPLE
    │   └── calculator.ts           # calculateTip() — all derived values
    └── components/                 # folder-per-component, presentational
        ├── Card/                   # reusable <section class="card">
        ├── PageTitle/              # the blue "Tip Calculator App" banner
        ├── NumberField/            # validated numeric input with error + arrow stepping
        ├── ResultRow/              # label + formatted value row (total variant)
        ├── TipCalculatorCard/      # Bill/Tip inputs, Tip Percentage, Total, Reset
        └── SplitBillCard/          # collapsible split section
```

Every module in `src/` has a co-located `*.spec.ts(x)` test next to it — the component specs
sit in each component's folder, and the utility specs live in `src/utils/`.

## Getting started

Requirements: a modern Node.js. Vite 8 needs **Node 20.19+** (or 22.12+).

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (hot reload)
npm run dev

# 3. Open the printed URL (http://localhost:5173 by default)
```

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
| `npm run lint`    | `oxlint`                | Lint the codebase (react/typescript/oxc rules)          |
| `npm test`        | `vitest run`            | Run the full test suite once (CI-friendly)              |
| `npm run test:watch` | `vitest`             | Watch mode — reruns affected tests on file save         |
| `npm run preview` | `vite preview`          | Serve the production build locally                      |

## Running tests

The suite covers all utilities, every component, and full app integration (rendering,
bill/tip recalculation, per-person splitting, arrow-key stepping, validation messages, and
reset). It runs in jsdom via Vitest + React Testing Library.

**One-shot (CI / single check):**
```bash
npm test
```

**Watch mode** (re-runs on every save):
```bash
npm run test:watch
```
Watch mode is interactive — run it in your own terminal (not a backgrounded task), so it can
stay alive and accept the `f`/`a`/`q` controls.

To run a single file while iterating:
```bash
npx vitest run src/utils/calculator.spec.ts
```

> **Environment note:** `vitest.config.ts` uses the `threads` pool with `isolate: false`.
> This was tuned because the default forked-worker pool times out on this machine. If you hit
> worker startup timeouts on a different setup, try removing those two options.

## Input rules reference

| Field             | Allowed                                  | Error message(s)                              |
| ----------------- | ---------------------------------------- | --------------------------------------------- |
| Bill              | Whole number ≥ 0                          | "cannot be less than 0" / "must be a positive whole number" |
| Tip Amount        | Whole number, ≤ Bill                      | "cannot exceed the bill amount" / "must be a positive whole number" |
| Number of people  | Whole number 1–100                        | "must be at least 1" / "limited to 100 people" / "must be a positive whole number" |

Empty fields are always valid and are treated as `0` (Bill/Tip) or `1` (people) for the math.