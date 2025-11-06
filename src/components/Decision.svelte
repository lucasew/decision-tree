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

    function handleBack() {
        window.history.back();
    }

    let resolved = $derived(resolveNode(decisionTree, route));
</script>

{#if route.length > 0}
    <div class="mb-6">
        <button
            onclick={handleBack}
            class="btn btn-ghost btn-sm gap-2 hover:gap-3 transition-all"
        >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar
        </button>
    </div>
{/if}

{#if resolved == null}
    <div class="hero min-h-[300px] bg-base-200 rounded-box">
        <div class="hero-content text-center">
            <div class="max-w-md">
                <div class="text-6xl mb-4">🎯</div>
                <h1 class="text-3xl font-bold">{i18nGet(i18n.endOfLine)}</h1>
                <p class="py-4 text-base-content/70">
                    Você chegou ao final desta árvore de decisão
                </p>
            </div>
        </div>
    </div>
{:else}
    <div class="space-y-8">
        <!-- Breadcrumb -->
        {#if route.length > 0}
            <div class="text-sm breadcrumbs">
                <ul>
                    <li><a href="/" onclick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/'); }}>Início</a></li>
                    {#each route as segment, i}
                        <li class="font-semibold text-primary">{segment}</li>
                    {/each}
                </ul>
            </div>
        {/if}

        <!-- Main content -->
        <div class="space-y-6">
            <div class="prose prose-lg max-w-none">
                <h1 class="!text-5xl !font-extrabold !mb-6 !leading-tight">
                    <Markdown source={i18nGet(resolved.title)} />
                </h1>
                {#if resolved.description}
                    <div class="text-lg leading-relaxed">
                        <Markdown source={i18nGet(resolved.description)} />
                    </div>
                {/if}
            </div>

            {#if resolved.alternatives != null}
                <div class="divider my-8">
                    <span class="text-base-content/60 font-medium">
                        Escolha uma opção
                    </span>
                </div>

                <div class="grid gap-4">
                    {#each Object.entries(resolved.alternatives) as [key, alternative], index}
                        <button
                            onclick={handleJump(key)}
                            class="group card bg-base-100 hover:bg-base-200 shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer hover:scale-[1.01]"
                        >
                            <div class="card-body gap-3">
                                <div class="flex items-center justify-between">
                                    <div class="badge badge-primary badge-lg font-bold">
                                        {String.fromCharCode(65 + index)}
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-base-content/30 group-hover:text-primary group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                                <div class="text-left space-y-2">
                                    <div class="prose max-w-none">
                                        <h3 class="!text-2xl !font-bold !mb-0 !mt-0 group-hover:text-primary transition-colors">
                                            <Markdown source={i18nGet(alternative.title)}/>
                                        </h3>
                                    </div>
                                    {#if alternative.description}
                                        <div class="prose max-w-none">
                                            <div class="text-base text-base-content/70 !mt-0">
                                                <Markdown source={i18nGet(alternative.description)} />
                                            </div>
                                        </div>
                                    {/if}
                                </div>
                            </div>
                        </button>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
{/if}
