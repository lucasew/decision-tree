<script lang="ts">
	import DecisionTree from './DecisionTree.svelte';
</script>

<div id="content">
	<DecisionTree />
</div>

<style>
	:global(body) {
		width: 100vw;
		height: 100vh;
		margin: 0px;
		padding: 0px;
	}
	div#content {
		border: 1px solid;
		border-radius: 1rem;
		max-width: max(600px, 80vw);
		margin-left: auto;
		margin-right: auto;
		margin-top: 10vh;
		padding: 0.5rem;
	}
</style>