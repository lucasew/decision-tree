export interface DecisionTree {
    title: i18Led
    description?: i18Led
    alternatives?: Record<string, DecisionTree>
}

export type i18Led = Record<string, string> | string
