/**
 * Represents a single node or a complete, recursively branched decision tree.
 * The tree is navigated by rendering `title` and `description`, then
 * prompting the user to select from the `alternatives`.
 */
export interface DecisionTree {
    /** The primary heading displayed to the user for this decision node. */
    title: i18Led
    /** Optional secondary context or detailed explanation for this node. */
    description?: i18Led
    /**
     * Key-value mapping of subsequent paths.
     * The keys dictate URL segments for navigation, and values provide the next DecisionTree state.
     */
    alternatives?: Record<string, DecisionTree>
}

/**
 * A translatable string payload.
 * Can be a raw string (no localization) or a dictionary mapping locale keys (e.g. `en_US`, `pt_BR`) to text.
 */
export type i18Led = Record<string, string> | string

/**
 * Resolves localized text based on the user's browser language.
 * Falls back to the first available translation or an empty string if the exact locale isn't found.
 *
 * @param txt - The polymorphic string payload to resolve.
 * @returns The resolved text suitable for rendering.
 */
export function i18nGet(txt: i18Led): string {
    if (typeof txt === 'string') {
        return txt;
    }
    const locale = navigator.language || (navigator as any).userLanguage || 'default'
    const localizedKey = locale.replaceAll("-", "_")
    return txt[localizedKey] || Object.values(txt)[0] || ''
}