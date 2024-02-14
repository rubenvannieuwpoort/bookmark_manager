<script lang="ts">
	import Item from './components/Item.svelte';
    import type { Collection } from './types/Collection';

	import Fab, { Icon } from '@smui/fab';
	import Textfield from '@smui/textfield';
	import Button, { Label } from '@smui/button';
	import Dialog, { Header, Content, Actions } from '@smui/dialog';
	import IconButton from '@smui/icon-button';
	import Select, { Option } from '@smui/select';

	const newCollectionTemplate: Collection = {
		name: 'New collection',
		source: '',
		target: 'bookmarkbar',
		targetFolder: 'My new collection',
		active: true
	};

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

	let placeholderCollection: Collection = {
		name: 'asdfasfd',
		source: '',
		target: 'asdfasf',
		targetFolder: '',
		active: false
	};

	let dialogOpen = false;

	function addNewCollection() {
		placeholderCollection = newCollectionTemplate;
		dialogOpen = true;
	}

	function editCollection(collection: Collection) {
		placeholderCollection = collection;
		dialogOpen = true;
	}

	function save() {
		dialogOpen = false;
	}

	function cancel() {
		dialogOpen = false;
	}
</script>

<main>
	<div class="container">
		{#each collections as collection}
			<Item
				Item={collection}
				on:click={() => editCollection(collection)}
				on:toggle={(e) => collection.active = e.detail.checked}
				on:download={() => alert('download')}
			/>
		{/each}

		<div class="buttoncontainer">
			<Fab mini on:click={addNewCollection}>
				<Icon tag="svg" viewBox="0 0 448 512">
					<path fill="currentcolor" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
				</Icon>
			</Fab>
		</div>
	</div>

	<!-- This should be moved to its own component, but I can't make that work... -->
	<Dialog
		bind:open={dialogOpen}
		fullscreen
		aria-labelledby="fullscreen-title"
		aria-describedby="fullscreen-content"
	>
		<Header>
			<h2 contenteditable="true">{placeholderCollection.name}</h2>
			<IconButton size="mini" on:click={cancel}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
			</IconButton>
		</Header>

		<Content id="fullscreen-content" style="height: 230px;">
			<div>
				<Textfield bind:value={placeholderCollection.source} label="Source URL" style="width: 477px;" />
			</div>
			<div>
				<Select bind:value={placeholderCollection.target} label="Target" style="width: 175px;">
					<Option value="bookmarkbar">Bookmark bar</Option>
					<Option value="otherbookmarks">Other bookmarks</Option>
				</Select>
		
				<Textfield bind:value={placeholderCollection.targetFolder} label="Target folder" style="width: 300px;" />
			</div>
		</Content>

		<Actions>
			<Button on:click={save}>
				<Label>Save</Label>
			</Button>
			<Button on:click={cancel}>
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