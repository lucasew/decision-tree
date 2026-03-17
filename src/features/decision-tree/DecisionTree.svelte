<script lang="ts">
import type {DecisionTree} from "./Model";
import { i18nGet } from "../../lib/i18n/types";
import DecisionTreeInput from "./DecisionTreeInput.svelte";
import Decision from "./Decision.svelte";
import DecisionReset from "./DecisionReset.svelte";
import i18n from "../../lib/i18n/i18n";
import { createHistoryWatcher } from "../../lib/router/history";
import { reportError } from "../../lib/errors/reporter";

async function getDecisionTreeFromURL(url: URL): Promise<DecisionTree | null> {
    const tree = url.searchParams.get("tree")
    if (tree == null) {
        return null
    }
    try {
        if (tree.startsWith("http")) {
            const r = await fetch(tree)
            return await r.json()
        } else {
            return JSON.parse(atob(tree))
        }
    } catch (e) {
        reportError(e, { context: "getDecisionTreeFromURL", treeParam: tree });
        throw e;
    }
}

let tree = $state<Promise<DecisionTree | null>>(getDecisionTreeFromURL(new URL(window.location.href)));

// Listen to URL changes
$effect(() => {
    const updateUrl = () => {
        tree = getDecisionTreeFromURL(new URL(window.location.href));
    };

    return createHistoryWatcher(updateUrl);
});
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
