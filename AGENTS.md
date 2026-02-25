# Agent Guidelines

## Project Conventions

- **Framework:** This project uses Svelte 5 and TypeScript.
- **Routing:** Routing is handled using a custom implementation utilizing `pushState`/`replaceState` and event listeners (`popstate`, `hashchange`).
- **Data Model:** Core types are defined in `src/Model.ts`. The main interface is `DecisionTree`, which is recursive.
- **Localization:** UI strings are stored in `src/i18n.ts`. `i18Led` type and `i18nGet` helper in `src/Model.ts` handle dynamic text localization.
- **Documentation:** Use JSDoc for all exported functions, interfaces, and complex logic. Explain the *why* and *how*, not just the *what*.
- **Linting:** Run `mise run lint` (which executes `npm run check`) to verify types and code quality.

## Key Locations

- `src/Model.ts` -> Core types and localization helper.
- `src/i18n.ts` -> Static localization strings.
- `src/components/DecisionTree.svelte` -> Main component that fetches and renders the tree.
- `src/components/Decision.svelte` -> Renders the current node and handles navigation.
