import type { i18Led } from "./types";

export function i18nGet(txt: i18Led): string {
    if (typeof txt === 'string') {
        return txt;
    }
    const locale = navigator.language || (navigator as any).userLanguage || 'default'
    const localizedKey = locale.replaceAll("-", "_")
    return txt[localizedKey] || Object.values(txt)[0] || ''
}

const i18n: Record<string, i18Led> = {
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

export default i18n;
