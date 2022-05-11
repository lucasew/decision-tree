<script lang="ts">
    import SvelteMarkdown from 'svelte-markdown';
    import i18n from '../i18n';

    import {DecisionTree, i18nGet } from "../Model";
    import decisionTreeStore from "../stores/decisionTreeStore";
    import locationStore from "../stores/location";

    let url = new URL(window.location.href)
    locationStore.subscribe(u => url = u)
    const route = url.pathname.split('/').slice(1).filter(i => i !== "")

    let decisionTree: Promise<DecisionTree> = Promise.resolve(null);
    decisionTreeStore.subscribe(d => decisionTree = d)

    async function resolveNode(_tree: Promise<DecisionTree>, route: string[]): Promise<DecisionTree> {
        const tree = await _tree
        if (!tree) {
            return null
        }
        if (route.length == 0) {
            return tree
        }
        if (!tree?.alternatives && route.length > 0) {
            return null
        }
        const node = tree?.alternatives[route[0]] || null
        return resolveNode(Promise.resolve(node), route.slice(1))
    }
    function handleJump(key: string) {
        if (url.pathname[url.pathname.length - 1] !== '/') key = `/${key}`
        return () => {
            let u = new URL(url.toString())
            u.pathname += key
            window.history.pushState({}, '', u)
        }
    }
    let resolved = Promise.resolve<DecisionTree>(null)
    $: resolved = resolveNode(decisionTree, route)
</script>

{#await resolved}
    <h1>{i18nGet(i18n.loading)}</h1>
{:then data}
    {#if data == null}
        <h1>{i18nGet(i18n.endOfLine)}</h1>
    {:else}
        <h1>
            <SvelteMarkdown source={i18nGet(data.title)} />
        </h1>
        <p>
            <SvelteMarkdown source={i18nGet(data.description)} />
        </p>
        {#if data.alternatives != null}
            {#each Object.values(data.alternatives) as alternative, i}
                <button on:click={handleJump(Object.keys(data.alternatives)[i])}>
                    <h2>
                        <SvelteMarkdown source={i18nGet(alternative.title)}/>
                    </h2>
                    <SvelteMarkdown source={i18nGet(alternative.description)} />
                </button>
            {/each}
        {/if}
    {/if}
{:catch error}
    <h1>{i18nGet(i18n.error)} {error.message || error}</h1>
{/await}

<style>
    button {
        width: 100%;
    }
</style>