/**
 * Centralized error-reporting function.
 *
 * All unexpected errors must funnel through this function.
 * If Sentry is not set up, it logs the error with enough context.
 *
 * @param error The error to report
 * @param context Additional context for the error
 */
export function reportError(error: unknown, context?: Record<string, unknown>) {
    // Note: Sentry or other error reporting integration would be hooked up here.
    // The call site should not know or care which backend is active.

    const timestamp = new Date().toISOString();
    let message = 'Unknown error';
    let stack = '';

    if (error instanceof Error) {
        message = error.message;
        stack = error.stack || '';
    } else if (typeof error === 'string') {
        message = error;
    } else {
        message = JSON.stringify(error);
    }

    // Since console.error must be funneled here, this is the only place it's allowed.
    // In a real Sentry setup, we might also do Sentry.captureException(error, { extra: context })
    console.error(`[${timestamp}] [ERROR] ${message}`, {
        error,
        stack,
        ...context
    });
}
