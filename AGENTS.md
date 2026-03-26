# Project Conventions & Guidelines

## Architecture & Structure
- **Domain-Driven Directory Structure**: The project groups code by domain and responsibility (e.g., `src/features/<domain>/`) rather than by file type.
- **Centralized Routing**: Routing and history interception logic is centralized in a shared utility at `src/lib/router/history.ts`, which exports `createHistoryWatcher` to avoid duplicating manual history API patches.
- **Centralized Error Reporting**: All unexpected errors must be funneled through `reportError` in `src/lib/errors/reporter.ts`. No empty catch blocks or direct `console.error` calls are allowed. It's wired to global `error` and `unhandledrejection` window events.
- **Svelte 5 Runes**: The project uses Svelte 5 runes (`$state`, `$derived`, `$effect`, `$props`) for state management and reactivity.

## Tooling & Verification
- **mise.toml**: Tooling and task execution configurations, such as Node version pinning and the `ci` and `test` tasks, are managed via `mise.toml`. Must use `mise` to execute tasks and pin tool versions.
- **Linting & Formatting**: Enforced via `mise run lint`. Includes `svelte-check`.
- **Testing**: Playwright is used for testing. Visual changes require capturing a screenshot using Playwright for frontend verification.

## Development Workflows
- **Markdown & XSS Protection**: Markdown parsing is handled by `marked` and sanitized against XSS using `isomorphic-dompurify` (`DOMPurify.sanitize`) before rendering via Svelte's `@html` tag.
- **Git Staging**: Git staging must be done explicitly per file (`git add <path>`). Mass staging commands (`git add .` or `git add -A`) and committing tooling/bootstrap artifacts are strictly forbidden.

## Agent Specific Rules
- **Role-Based PR Titles**: Must exactly follow format (e.g., `🧹 Janitor: [brief description]`, `🛠️ Refactor: [Description]`, `📝 Docs: [Description]`, `🛡️ Sentinel: [Severity] [Description]`).
- **PR Body Format**: Must include concise sections: `Assumptions`, `Alternatives Not Chosen`, `How To Pivot`, and `Next Knobs`.
- **Agent Journals**: Role-based agents must maintain their respective journals (e.g., `.jules/janitor.md`, `.jules/sentinel.md`), appending a single-sentence entry in the exact format `- YYYY-MM-DD: [reusable insight]` for every corresponding PR.
