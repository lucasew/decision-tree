# Agent Operational Memory

## Core Principles
* The repository follows domain-driven design for file organization.
* Things that change together should live together. Group by domain and responsibility, not by file type.
* All errors must be funneled through a centralized error-reporting function.

## Where Things Live
* `src/features/*` -> Contains domain-specific modules. For instance, `src/features/decision-tree/` has the core decision tree logic, data models, and UI components.
* `src/lib/ui/` -> Reusable generic UI components like `Markdown.svelte`.
* `src/lib/i18n/` -> Internationalization functions and strings.
* `src/lib/router/` -> Routing utilities such as history interception logic.
* `src/lib/errors/` -> Contains centralized error handling like `reporter.ts`.
* `tests/` -> Contains Playwright end-to-end tests.
