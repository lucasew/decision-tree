<script lang="ts">
import i18n from "../i18n";
import type { DecisionTree } from "../Model";
import { i18nGet } from "../Model";

let url = ""
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

<div class="space-y-6">
    <h1 class="text-3xl font-bold text-center">{i18nGet(i18n.inputLabel)}</h1>

    <div class="form-control w-full">
        <label class="label" for="tree-url">
            <span class="label-text">URL</span>
        </label>
        <input
            id="tree-url"
            type="text"
            bind:value={url}
            placeholder="URL"
            class="input input-bordered w-full"
        />
    </div>

    <div class="flex flex-col sm:flex-row gap-3">
        <button
            on:click={handleClick}
            class="btn btn-primary flex-1"
        >
            {i18nGet(i18n.load)}
        </button>
        <button
            on:click={setupDummyState}
            class="btn btn-secondary flex-1"
        >
            {i18nGet(i18n.example)}
        </button>
    </div>
</div>