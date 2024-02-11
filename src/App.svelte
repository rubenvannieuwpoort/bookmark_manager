<script lang="ts">
	import Item from './components/Item.svelte';
    import type { SyncPoint } from './types/SyncPoint';

    let content: SyncPoint[] = [
		{
			name: 'First bookmark',
			source: 'asdfsadfadsf',
			active: true
		},
		{
			name: 'Second bookmark',
			source: 'asdfsadfadsf',
			active: false
		},
		{
			name: 'Third bookmark',
			source: 'asdfsadfadsf',
			active: true
		},
    ]
</script>

<main>
	<div class="container">
		{#each content as item}
			<Item Item={item} />
		{/each}
	</div>
</main>

<style>
	.container {
		width: 500px;
		height: 500px;
		border: 1px solid black;
	}
</style>