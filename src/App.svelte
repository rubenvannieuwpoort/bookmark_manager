<script lang="ts">
	import Item from './components/Item.svelte';
    import type { Collection } from './types/Collection';

	import Fab, { Icon } from '@smui/fab';
	import Textfield from '@smui/textfield';
	import Button, { Label } from '@smui/button';
	import Dialog, { Header, Content, Actions } from '@smui/dialog';
	import Select, { Option } from '@smui/select';
	
	let editingCollection: Collection | null = null;
	let editableTitle = '';
	let dialogOpen = false;

	const newCollectionTemplate: Collection = {
		name: 'My new collection',
		source: '',
		target: 'bookmarkbar',
		targetFolder: 'My new collection',
		active: true
	};

    let collections: Collection[] = [];

	let placeholderCollection: Collection = {...newCollectionTemplate};

	function addNewCollection() {
		editingCollection = null;
		editableTitle = newCollectionTemplate.name;
		placeholderCollection = {...newCollectionTemplate};
		dialogOpen = true;
	}

	function editCollection(collection: Collection) {
		editingCollection = collection;
		editableTitle = collection.name;
		placeholderCollection = {...collection};
		dialogOpen = true;
	}

	function save() {
		placeholderCollection.name = editableTitle;

		if (editingCollection === null) {
			// add the new collection at the end
			collections = [...collections, {...placeholderCollection}]; 
		}
		else {
			// assign to the collection we're editing
			Object.assign(editingCollection, placeholderCollection);
			collections = [...collections];  // to trigger reactivity
		}

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
			<h2 contenteditable="true" bind:textContent={editableTitle}></h2>
		</Header>

		<Content id="fullscreen-content" style="height: 230px;">
			<div>
				<Textfield bind:value={placeholderCollection.source} label="Source URL" style="width: 325px;" />
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
	}

	.buttoncontainer {
		display: flex;
		justify-content: right;
		margin: 10px;
	}
</style>