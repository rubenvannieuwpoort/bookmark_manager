<script lang="ts">
	import Item from './components/Item.svelte';
    import type { Collection } from './types/Collection';

	import Fab, { Icon } from '@smui/fab';
	import Textfield from '@smui/textfield';
	import Button, { Label } from '@smui/button';
	import Dialog, { Header, Content, Actions } from '@smui/dialog';
	import IconButton from '@smui/icon-button';
    import type { SyncPoint } from './types/SyncPoint';

    let collections: Collection[] = [
		{
			name: 'First bookmark',
			source: 'asdfsadfadsf',
			target: 'bookmarkbar',
			targetFolder: 'My active collection!',
			active: true
		},
		{
			name: 'My non-active collection',
			source: 'http://nonactivecollection.com',
			target: 'other',
			targetFolder: '(Non-active... )',
			active: false
		}
    ];
</script>

<main>
	<div class="container">
		{#each content as item}
			<Item
				Item={item}
				on:click={() => alert('click')}
				on:toggle={() => alert('toggle')}
				on:download={() => alert('download')}
			/>
		{/each}

		<div class="buttoncontainer">
			<Fab mini on:click={() => alert('hai')}>
				<Icon tag="svg" viewBox="0 0 448 512">
					<path fill="currentcolor" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
				</Icon>
			</Fab>
		</div>
	</div>

	<!-- This should be moved to its own component, but I can't make that work... -->
	<Dialog
		bind:open
		fullscreen
		aria-labelledby="fullscreen-title"
		aria-describedby="fullscreen-content"
	>
		<Header>
			<h2 contenteditable="true">Hello there</h2>
			<IconButton size="mini">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
			</IconButton>
		</Header>
		<Content id="fullscreen-content">
			<Textfield bind:value={text} label="URL" />
		</Content>
		<Actions>
			<Button action="reject">
				<Label>Save</Label>
			</Button>
			<Button action="accept" defaultAction>
				<Label>Cancel</Label>
			</Button>
		</Actions>
	</Dialog>
</main>

<style>
	.container {
		width: 350px;
		height: 400px;
		border: 1px solid black;
	}

	.buttoncontainer {
		display: flex;
		justify-content: right;
		margin: 10px;
	}
</style>