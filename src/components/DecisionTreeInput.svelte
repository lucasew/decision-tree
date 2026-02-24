<script lang="ts">
import i18n from "../lib/i18n";
import type { DecisionTree } from "../lib/types";
import { i18nGet } from "../lib/i18n";
import { router } from "../lib/router.svelte";

let url = $state("")
function handleClick() {
    let u = new URL(router.url.toString())
    u.searchParams.set('tree', url)
    router.push(u)
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
    let u = new URL(router.url.toString())
    u.searchParams.set("tree", btoa(JSON.stringify(dummyState)))
    router.push(u)
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
                class="btn btn-primary btn-lg"
                disabled={!url}
            >
                {i18nGet(i18n.load)}
            </button>
            <button
                onclick={setupDummyState}
                class="btn btn-outline btn-lg"
            >
                {i18nGet(i18n.example)}
            </button>
        </div>
    </div>
</div>
