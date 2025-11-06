<script lang="ts">
import type {DecisionTree} from "../Model";
import { i18nGet } from "../Model";
import DecisionTreeInput from "./DecisionTreeInput.svelte";
import Decision from "../components/Decision.svelte";
import DecisionReset from "../components/DecisionReset.svelte";
import i18n from "../i18n";

async function getDecisionTreeFromURL(url: URL): Promise<DecisionTree | null> {
    const tree = url.searchParams.get("tree")
    if (tree == null) {
        return null
    }
    if (tree.startsWith("http")) {
        const r = await fetch(tree)
        return r.json()
    } else {
        return JSON.parse(atob(tree))
    }
}

let urlKey = $state(0);

// Listen to URL changes
$effect(() => {
    const updateUrl = () => {
        urlKey++;
    };

    window.addEventListener('popstate', updateUrl);
    window.addEventListener('hashchange', updateUrl);

    // Intercept pushState and replaceState
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function(...args) {
        originalPushState.apply(this, args);
        updateUrl();
    };

    history.replaceState = function(...args) {
        originalReplaceState.apply(this, args);
        updateUrl();
    };

    return () => {
        window.removeEventListener('popstate', updateUrl);
        window.removeEventListener('hashchange', updateUrl);
        history.pushState = originalPushState;
        history.replaceState = originalReplaceState;
    };
});

let tree = $derived.by(() => {
    urlKey; // reference urlKey to make this reactive
    return getDecisionTreeFromURL(new URL(window.location.href));
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
