export interface DecisionTree {
    title: i18Led
    description?: i18Led
    alternatives?: Record<string, DecisionTree>
}

export type i18Led = Record<string, string> | string


export function i18nGet(txt: i18Led): string {
    if (typeof txt === 'string') {
        return txt;
    }
    const locale = navigator.language || (navigator as any).userLanguage || 'default'
    const localizedKey = locale.replaceAll("-", "_")
    return txt[localizedKey] || Object.values(txt)[0] || ''
}