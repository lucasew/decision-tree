# Project Conventions

## Directory Structure
- `src/lib/`: Shared logic, utilities, and types.
  - `src/lib/types.ts`: TypeScript interfaces and types.
  - `src/lib/i18n.ts`: Internationalization logic and data.
  - `src/lib/router.svelte.ts`: Router state management.
- `src/components/`: Svelte components.

## State Management
- Use Svelte 5 runes (`$state`, `$derived`, `$effect`) for reactivity.
- Use `src/lib/router.svelte.ts` for URL state and navigation. Do not use `window.history.pushState` directly in components; use `router.push()`.

## Testing
- Run tests with `npx playwright test`.
