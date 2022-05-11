<script lang="ts">
import type {DecisionTree} from "../Model";
import DecisionTreeInput from "./DecisionTreeInput.svelte";

import decisionTreeStore from "../stores/decisionTreeStore";
import Decision from "../components/Decision.svelte";
import DecisionReset from "../components/DecisionReset.svelte";

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
