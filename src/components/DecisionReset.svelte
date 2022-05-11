<script lang="ts">
import locationStore from "../stores/location";


function handleDecisionStoreReset() {
    window.history.pushState({}, '', "/")
}
</script>
<button on:click={() => window.history.pushState({}, '', '/')}>Sair</button>