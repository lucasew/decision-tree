<script lang="ts">
import {DecisionTree, i18nGet} from "../Model";
import DecisionTreeInput from "./DecisionTreeInput.svelte";

import decisionTreeStore from "../stores/decisionTreeStore";
import Decision from "../components/Decision.svelte";
import DecisionReset from "../components/DecisionReset.svelte";
import i18n from "../i18n";

let tree = Promise.resolve<DecisionTree>(null);
decisionTreeStore.subscribe(t => {
    console.log(t)
    tree = t
})
</script>

{#await tree}
    <h1>{i18nGet(i18n.loading)}</h1>
{:then decisionTreeVal}
    {#if decisionTreeVal == null}
        <DecisionTreeInput/>
    {:else}
        <Decision/>
        <DecisionReset />
    {/if}
{:catch error}
    <h1>{i18nGet(i18n.error)} {error.message || error}</h1>
    <DecisionReset />
{/await}
