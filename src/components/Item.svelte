<script lang="ts">
	import type { Collection } from '../backend';
	import Card from '@smui/card';
	import Checkbox from '@smui/checkbox';
	import IconButton from '@smui/icon-button';
	import { createEventDispatcher } from 'svelte';

	export let Item: Collection;

	const dispatch = createEventDispatcher();

	let checked: boolean = 'id' in Item.mainFolder && Item.mainFolder.id !== undefined;
</script>

<main>
	<Card class="card" variant="outlined" style={'margin: 5px; padding: 5px;' + ('id' in Item.mainFolder && Item.mainFolder.id !== undefined ? ' color: black;' : ' color: grey;')}>
		<div class="itembody">
			<div>
				<Checkbox bind:checked on:change={() => dispatch('toggle', { checked: checked })} />
			</div>

			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div class="itemtextholder" on:click={() => dispatch('click')}>
				<div class="itemtext">
					{Item.name}
				</div>
			</div>

			<div>
				<IconButton size="button" on:click={() => dispatch('download')}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM216 232V334.1l31-31c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-72 72c-9.4 9.4-24.6 9.4-33.9 0l-72-72c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l31 31V232c0-13.3 10.7-24 24-24s24 10.7 24 24z"/></svg>
				</IconButton>
			</div>
		</div>
	</Card>
</main>

<style>
	.itembody {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 5px;
	}

	.itemtextholder {
		display: flex;
		align-self: stretch;
		align-items: center;
		cursor: pointer;
		flex-grow: 1;
	}

	:global(.card:hover) {
		background-color: #f5f5f5;
	}
</style>
