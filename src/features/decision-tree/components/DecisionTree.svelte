<script lang="ts">
import type {DecisionTree} from "../models/DecisionTree";
import { i18nGet } from "../../../lib/i18n";
import DecisionTreeInput from "./DecisionTreeInput.svelte";
import Decision from "./Decision.svelte";
import DecisionReset from "./DecisionReset.svelte";
import i18n from "../../../lib/i18n";
import { reportError } from "../../../lib/errors/reporter";

async function getDecisionTreeFromURL(url: URL): Promise<DecisionTree | null> {
    try {
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
    } catch (err) {
        reportError(err, { source: "getDecisionTreeFromURL", url: url.toString() })
        throw err;
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
    {reportError(error, { source: "DecisionTree Component Await Block" }) ?? ''}
    <h1>{i18nGet(i18n.error)} {error?.message || error}</h1>
    <DecisionReset />
{/await}
