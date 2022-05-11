import type { i18Led } from "./Model";

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
        'pt_BR': "URL ou codificado em base64 da árvore de decisão"
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