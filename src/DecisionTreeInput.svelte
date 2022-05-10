<script lang="ts">
import DecisionTree from "./DecisionTreeModel";

let url = ""
function handleClick() {
    let urlParams = new URLSearchParams(window.location.search)
    urlParams.set("tree", url)
    window.location.search = urlParams.toString()
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
    let urlParams = new URLSearchParams(window.location.search)
    urlParams.set("tree", btoa(JSON.stringify(dummyState)))
    window.location.search = urlParams.toString()
}
</script>

<h1>URL da decision tree</h1>
<input bind:value={url} placeholder="URL">
<button on:click={handleClick}>Carregar</button>
<button on:click={setupDummyState}>Dummy</button>