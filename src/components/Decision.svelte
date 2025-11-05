<script lang="ts">
    import Markdown from './Markdown.svelte';
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
    <div class="flex justify-center items-center py-12">
        <span class="loading loading-spinner loading-lg text-primary"></span>
        <h1 class="text-2xl ml-4">{i18nGet(i18n.loading)}</h1>
    </div>
{:then data}
    {#if data == null}
        <div class="alert alert-info">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <h1 class="text-xl font-semibold">{i18nGet(i18n.endOfLine)}</h1>
        </div>
    {:else}
        <div class="space-y-6">
            <div class="prose prose-lg max-w-none">
                <h1 class="text-4xl font-bold mb-4">
                    <Markdown source={i18nGet(data.title)} />
                </h1>
                <div class="text-base-content/80">
                    <Markdown source={i18nGet(data.description)} />
                </div>
            </div>

            {#if data.alternatives != null}
                <div class="divider"></div>
                <div class="space-y-3">
                    <h2 class="text-xl font-semibold mb-4">Choose an option:</h2>
                    {#each Object.values(data.alternatives) as alternative, i}
                        <button
                            on:click={handleJump(Object.keys(data.alternatives)[i])}
                            class="card card-compact w-full bg-base-200 hover:bg-base-300 shadow-md hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-primary"
                        >
                            <div class="card-body text-left">
                                <div class="prose max-w-none">
                                    <h3 class="card-title text-2xl mb-2">
                                        <Markdown source={i18nGet(alternative.title)}/>
                                    </h3>
                                    <div class="text-base-content/70">
                                        <Markdown source={i18nGet(alternative.description)} />
                                    </div>
                                </div>
                            </div>
                        </button>
                    {/each}
                </div>
            {/if}
        </div>
    {/if}
{:catch error}
    <div class="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <h1 class="text-xl font-semibold">{i18nGet(i18n.error)} {error.message || error}</h1>
    </div>
{/await}