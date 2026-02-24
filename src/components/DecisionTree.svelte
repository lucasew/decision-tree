<script lang="ts">
import type {DecisionTree} from "../lib/types";
import { i18nGet } from "../lib/i18n";
import i18n from "../lib/i18n";
import DecisionTreeInput from "./DecisionTreeInput.svelte";
import Decision from "./Decision.svelte";
import DecisionReset from "./DecisionReset.svelte";
import { getDecisionTreeFromURL } from "../lib/tree";
import { router } from "../lib/router.svelte";

let tree = $derived(getDecisionTreeFromURL(router.url));
</script>

{#await tree}
    <h1>{i18nGet(i18n.loading)}</h1>
{:then decisionTreeVal}
    {#if decisionTreeVal == null}
        <DecisionTreeInput/>
    {:else}
        <Decision decisionTree={decisionTreeVal} />
        <DecisionReset />
    {/if}
{:catch error}
    <h1>{i18nGet(i18n.error)} {error?.message || error}</h1>
    <DecisionReset />
{/await}
