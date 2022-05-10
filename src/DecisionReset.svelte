<script lang="ts">
function handleDecisionStoreReset() {
    let urlParams = new URLSearchParams(window.location.search)
    urlParams.delete("tree")
    window.location.search = urlParams.toString()
}
</script>
<button on:click={() => handleDecisionStoreReset()}>Sair</button>