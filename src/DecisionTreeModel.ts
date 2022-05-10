interface DecisionTree {
    title: i18Led
    description?: i18Led
    alternatives?: Record<string, DecisionTree>
}

export type i18Led = Record<string, string> | string

export default DecisionTree

export function i18nGet(txt: i18Led) {
    const locale = navigator.language || (navigator as any).userLanguage || 'default'
    return txt[locale.replaceAll("-", "_")] || txt
}