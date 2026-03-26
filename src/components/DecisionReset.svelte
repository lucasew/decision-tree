<script lang="ts">
/**
 * @module DecisionReset
 * Provides a UI affordance for returning to the root of the application
 * and unmounting any active decision trees.
 *
 * Invokes a `history.pushState` to `'/'` which clears the active `tree`
 * search param URL variable and triggers root-level `popstate`/`replaceState`
 * watchers (e.g., inside `DecisionTree.svelte` and `App.svelte`).
 */
</script>

<div class="mt-8">
    <button
        onclick={() => window.history.pushState({}, '', '/')}
        class="btn btn-error btn-lg w-full text-xl"
    >
        Sair
    </button>
</div>