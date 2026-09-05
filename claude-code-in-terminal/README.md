# Claude Code in Terminal — Demo App

A small **React + TypeScript + Vite** demo app used as a runnable example in the
*Claude Code — AI Crash Course for Developers*.

This app intentionally stays minimal so it's easy to experiment with while learning
how Claude Code edits, builds, and runs a real project. The main page ("Claude code in
terminal") shows a hero section and an interactive counter that demonstrates Vite's
Hot Module Replacement (HMR) — edit `src/App.tsx` and save to see the change instantly.

## Getting Started

```bash
npm install     # install dependencies
npm run dev     # start the dev server (HMR enabled)
```

The dev server prints a local URL (e.g. `http://localhost:5173`) — open it in your browser.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Type-check (`tsc -b`) then build for production into `dist/` |
| `npm run lint` | Lint with Oxlint |
| `npm run preview` | Preview the production build locally |

## Project Structure

```
claude-code-in-terminal/
├── index.html            # Vite entry point
├── package.json          # scripts & dependencies
├── src/
│   ├── main.tsx          # React bootstrap
│   ├── App.tsx           # main page (hero + counter)
│   ├── App.css           # main page styles
│   ├── index.css         # global styles
│   └── assets/           # images (hero, React, Vite logos)
└── public/
    ├── favicon.svg
    └── icons.svg         # icon sprites used on the main page
```

## Tech Stack

- **React 19** — UI library
- **TypeScript** — typed JavaScript
- **Vite 8** — dev server & build tool (HMR out of the box)
- **Oxlint** — fast Rust-based linter

## Linting Configuration

This project uses **Oxlint** (`npm run lint`). The config lives in `.oxlintrc.json`.
For a production app, we recommend enabling type-aware lint rules by installing
`oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules)
for the full list of rules and categories.

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev &
build performance. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## License

Part of the *Claude Code — AI Crash Course for Developers* learning material.
Feel free to use and adapt for learning purposes.
