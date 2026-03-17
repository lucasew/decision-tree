/**
 * Shared utility for Svelte 5 components to watch history changes.
 * Avoids duplicating the monkey-patching of history API across components.
 */
export function createHistoryWatcher(onUrlChange: () => void) {
    window.addEventListener('popstate', onUrlChange);
    window.addEventListener('hashchange', onUrlChange);

    // Intercept pushState and replaceState
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function(...args) {
        originalPushState.apply(this, args);
        onUrlChange();
    };

    history.replaceState = function(...args) {
        originalReplaceState.apply(this, args);
        onUrlChange();
    };

    return () => {
        window.removeEventListener('popstate', onUrlChange);
        window.removeEventListener('hashchange', onUrlChange);
        history.pushState = originalPushState;
        history.replaceState = originalReplaceState;
    };
}
