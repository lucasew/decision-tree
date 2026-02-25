/**
 * Represents a node in the decision tree.
 * The structure is recursive, where each node can have alternatives (children).
 */
export interface DecisionTree {
    /** The title of the node, localized. Displayed as the main question or statement. */
    title: i18Led
    /** Optional detailed description of the node, localized. Displayed below the title. */
    description?: i18Led
    /**
     * A map of possible choices from this node.
     * Keys are the identifiers for the choices (used in the URL route),
     * and values are the next `DecisionTree` nodes.
     * If undefined or null, this is a leaf node (end of the line).
     */
    alternatives?: Record<string, DecisionTree>
}

/**
 * A localized string which can be a simple string (fallback)
 * or a dictionary of locale codes (e.g., 'en_US', 'pt_BR') to strings.
 */
export type i18Led = Record<string, string> | string


/**
 * Resolves the localized string for the current user's locale.
 *
 * It attempts to match the navigator's language (replacing '-' with '_').
 * If no exact match is found, it falls back to the first available translation
 * or an empty string.
 *
 * @param txt - The localized content to resolve.
 * @returns The resolved string for the current locale.
 */
export function i18nGet(txt: i18Led): string {
    if (typeof txt === 'string') {
        return txt;
    }
    const locale = navigator.language || (navigator as any).userLanguage || 'default'
    const localizedKey = locale.replaceAll("-", "_")
    return txt[localizedKey] || Object.values(txt)[0] || ''
}