<script lang="ts">
	import Item from './components/Item.svelte';
	import Fab, { Icon } from '@smui/fab';
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

		<div class="buttoncontainer">
			<Fab mini on:click={() => alert('hai')}>
				<Icon tag="svg" viewBox="0 0 448 512">
					<path fill="currentcolor" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
				</Icon>
			</Fab>
		</div>
	</div>
</main>

<style>
	.container {
		width: 500px;
		height: 500px;
		border: 1px solid black;
	}

	.buttoncontainer {
		display: flex;
		justify-content: right;
		margin: 10px;
	}

</style>