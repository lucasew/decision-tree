import type { i18Led } from "./Model";

/**
 * Core translation dictionary mapping logical text identifiers (e.g. `endOfLine`)
 * to either a specific localized string or another mapping of locales to strings.
 *
 * Used alongside `i18nGet` from `Model.ts`, which defaults to extracting
 * the user's navigator language, converting hyphens to underscores (e.g., 'pt-BR' -> 'pt_BR'),
 * and falling back to the first available translation if an exact match is missing.
 */
let i18n: Record<string,i18Led> = {
    loading: {
        'en_US': "Loading...",
        'pt_BR': "Carregando..."
    },
    endOfLine: {
        'en_US': "End of line",
        'pt_BR': "Fim de linha"
    },
    error: {
        'en_US': "Error",
        'pt_BR': "Erro"
    },
    inputLabel: {
        'en_US': "URL or base64 encoded decision tree",
        'pt_BR': "URL da árvore de decisão ou JSON em base64"
    },
    load: {
        'en_US': "Load",
        'pt_BR': "Carregar"
    },
    example: {
        'en_US': "Example",
        'pt_BR': "Exemplo"
    }
}

export default i18n