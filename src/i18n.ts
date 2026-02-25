import type { i18Led } from "./Model";

/**
 * Static localization strings for the application UI.
 * Keys represent the UI element or message ID.
 * Values are `i18Led` objects supporting multiple locales.
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