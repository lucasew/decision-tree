<script lang="ts">
import i18n from "../i18n";

import { DecisionTree, i18nGet } from "../Model";

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

<h1>{i18nGet(i18n.inputLabel)}</h1>
<input bind:value={url} placeholder="URL">
<button on:click={handleClick}>{i18nGet(i18n.load)}</button>
<button on:click={setupDummyState}>{i18nGet(i18n.example)}</button>