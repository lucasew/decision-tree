<script lang="ts">
import i18n from "../i18n";
import type { DecisionTree } from "../Model";
import { i18nGet } from "../Model";

let url = $state("")
function handleClick() {
    let u = new URL(window.location.href)
    u.searchParams.set('tree', url)
    window.history.pushState({}, '', u)
}
function setupDummyState() {
    const dummyState: DecisionTree = {
        title: "Teste **eoq** trabson",
        description: "Isso é um **teste**",
        alternatives: {
            a: {
                title: "Alternativa A",
                description: {
                    en_US: "Alternative",
                    pt_BR: "Alternativa"
                }
            },
            b: {
                title: "Alternativa B",
                description: "[Google](https://google.com)"
            }
        }
    }
    let u = new URL(window.location.href)
    u.searchParams.set("tree", btoa(JSON.stringify(dummyState)))
    window.history.pushState({}, '', u)
}
</script>

<div class="space-y-8">
    <!-- Hero section -->
    <div class="text-center space-y-4">
        <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Árvore de Decisão
        </h1>
        <p class="text-lg text-base-content/70 max-w-md mx-auto">
            Navegue por decisões complexas de forma estruturada e visual
        </p>
    </div>

    <div class="divider"></div>

    <!-- Input section -->
    <div class="space-y-4">
        <div class="form-control w-full">
            <label class="label" for="tree-url">
                <span class="label-text text-base font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    {i18nGet(i18n.inputLabel)}
                </span>
            </label>
            <input
                id="tree-url"
                type="text"
                bind:value={url}
                placeholder="https://exemplo.com/tree.json ou base64..."
                class="input input-bordered input-lg w-full text-base"
            />
            <label class="label">
                <span class="label-text-alt text-base-content/60">
                    Cole uma URL ou JSON codificado em base64
                </span>
            </label>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
                onclick={handleClick}
                class="btn btn-primary btn-lg gap-2"
                disabled={!url}
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                {i18nGet(i18n.load)}
            </button>
            <button
                onclick={setupDummyState}
                class="btn btn-outline btn-lg gap-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {i18nGet(i18n.example)}
            </button>
        </div>
    </div>
</div>