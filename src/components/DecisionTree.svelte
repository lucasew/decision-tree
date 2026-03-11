<script lang="ts">
/**
 * Root orchestrator component for the application.
 * Bootstraps the `DecisionTree` state based on URL search parameters.
 * When the tree is loaded successfully, it dynamically swaps the UI
 * between the `DecisionTreeInput` (when uninitialized) and the `Decision` view.
 */
import type {DecisionTree} from "../Model";
import { i18nGet } from "../Model";
import DecisionTreeInput from "./DecisionTreeInput.svelte";
import Decision from "../components/Decision.svelte";
import DecisionReset from "../components/DecisionReset.svelte";
import i18n from "../i18n";

/**
 * Attempts to parse the decision tree payload from the `?tree=` query param.
 * Differentiates between a remote source to be fetched and inline base64 data.
 *
 * @param url - The fully qualified active URL payload.
 * @returns The parsed DecisionTree structure, or null if no parameter exists.
 */
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

let tree = $state<Promise<DecisionTree | null>>(getDecisionTreeFromURL(new URL(window.location.href)));

// Listen to URL changes
$effect(() => {
    const updateUrl = () => {
        tree = getDecisionTreeFromURL(new URL(window.location.href));
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
