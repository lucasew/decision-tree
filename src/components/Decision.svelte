<script lang="ts">
    import Markdown from './Markdown.svelte';
    import i18n from '../i18n';
    import type {DecisionTree} from "../Model";
    import { i18nGet } from "../Model";

    interface Props {
        decisionTree: DecisionTree;
    }

    let { decisionTree }: Props = $props();

    let url = $state(new URL(window.location.href));
    let route = $derived(url.pathname.split('/').slice(1).filter(i => i !== ""));

    // Listen to URL changes
    $effect(() => {
        const updateUrl = () => {
            url = new URL(window.location.href);
        };

        window.addEventListener('popstate', updateUrl);
        window.addEventListener('hashchange', updateUrl);

        return () => {
            window.removeEventListener('popstate', updateUrl);
            window.removeEventListener('hashchange', updateUrl);
        };
    });

    function resolveNode(tree: DecisionTree | null, route: string[]): DecisionTree | null {
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
        return resolveNode(node, route.slice(1))
    }

    function handleJump(key: string) {
        let pathname = url.pathname;
        if (pathname[pathname.length - 1] !== '/') {
            key = `/${key}`;
        }
        return () => {
            let u = new URL(url.toString());
            u.pathname += key;
            window.history.pushState({}, '', u);
        }
    }

    let resolved = $derived(resolveNode(decisionTree, route));
</script>

{#if resolved == null}
    <div class="alert alert-info">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <h1 class="text-xl font-semibold">{i18nGet(i18n.endOfLine)}</h1>
    </div>
{:else}
    <div class="space-y-6">
        <div class="prose prose-lg max-w-none">
            <h1 class="text-4xl font-bold mb-4">
                <Markdown source={i18nGet(resolved.title)} />
            </h1>
            {#if resolved.description}
                <div class="text-base-content/80">
                    <Markdown source={i18nGet(resolved.description)} />
                </div>
            {/if}
        </div>

        {#if resolved.alternatives != null}
            <div class="divider"></div>
            <div class="space-y-3">
                <h2 class="text-xl font-semibold mb-4">Choose an option:</h2>
                {#each Object.entries(resolved.alternatives) as [key, alternative]}
                    <button
                        onclick={handleJump(key)}
                        class="card card-compact w-full bg-base-200 hover:bg-base-300 shadow-md hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-primary"
                    >
                        <div class="card-body text-left">
                            <div class="prose max-w-none">
                                <h3 class="card-title text-2xl mb-2">
                                    <Markdown source={i18nGet(alternative.title)}/>
                                </h3>
                                {#if alternative.description}
                                    <div class="text-base-content/70">
                                        <Markdown source={i18nGet(alternative.description)} />
                                    </div>
                                {/if}
                            </div>
                        </div>
                    </button>
                {/each}
            </div>
        {/if}
    </div>
{/if}
