---
paths:
 - "src/**/*.{ts,tsx}"
---

# Frontend rules

- Use TypeScript for all new frontend files,
- Keep types in a separate file, like  `user.type.ts`.
- Keep styles in a separate file, like `user-menu.modules.css`.
- Use PascalCase for React components , like `UserCard`.
- Use camelCase for variables and functions, like `loadUser`.
- Use `use` prefix for custom hooks, like `useAuth`.
- Keep hooks at the top of the component, do not put hok=oks in `if` blocks.