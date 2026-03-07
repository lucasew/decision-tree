/**
 * Centralized error reporting function.
 * All code paths that handle unexpected errors MUST funnel through this function.
 *
 * If Sentry or another backend is added later, wire it up here.
 */
export function reportError(error: unknown, context?: Record<string, unknown>): void {
    // Log to console for now, with structured context if available
    if (context) {
        console.error('[Error Reporter]', error, context);
    } else {
        console.error('[Error Reporter]', error);
    }

    // TODO: Wire up to Sentry or similar observability platform
    // Sentry.captureException(error, { extra: context });
}
