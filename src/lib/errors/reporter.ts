/**
 * Centralized error reporter.
 * All unexpected errors MUST be funneled through this module.
 * Never call console.error or Sentry.captureException directly at the call site.
 */

interface ErrorContext {
    [key: string]: any;
}

export function reportError(error: unknown, context?: ErrorContext): void {
    // If Sentry was available: Sentry.captureException(error, { extra: context });
    // Since it's not, we log securely to the console for tracking without masking.

    const errorDetails = error instanceof Error
        ? { message: error.message, stack: error.stack, name: error.name }
        : { message: String(error) };

    const payload = {
        error: errorDetails,
        context: context || {},
        timestamp: new Date().toISOString()
    };

    // Use console.error directly ONLY here, inside the centralized reporter.
    console.error('[Centralized Error Reporter]', payload);
}
