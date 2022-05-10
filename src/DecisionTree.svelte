<script lang="ts">
import DecisionTree from "./DecisionTreeModel";
import DecisionTreeInput from "./DecisionTreeInput.svelte";

import decisionTreeStore from "./decisionTreeStore";
import Decision from "./Decision.svelte";
import DecisionReset from "./DecisionReset.svelte";

let tree = Promise.resolve<DecisionTree>(null);
decisionTreeStore.subscribe(t => tree = t)
</script>

{#await tree}
    <h1>Carregando</h1>
{:then decisionTreeVal}
    {#if decisionTreeVal == null}
        <DecisionTreeInput/>
    {:else}
        <Decision/>
        <DecisionReset />
    {/if}
{:catch error}
    <h1>Erro {error.message || error}</h1>
    <DecisionReset />
{/await}
