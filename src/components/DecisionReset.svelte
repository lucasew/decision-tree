<script lang="ts">
import { router } from "../lib/router.svelte";
</script>

<div class="mt-8">
    <button
        onclick={() => router.push('/')}
        class="btn btn-error btn-lg w-full text-xl"
    >
        Sair
    </button>
</div>
