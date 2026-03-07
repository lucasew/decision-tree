import type { i18Led } from "../../../lib/i18n";

export interface DecisionTree {
    title: i18Led
    description?: i18Led
    alternatives?: Record<string, DecisionTree>
}