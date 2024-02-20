<script lang="ts">
	import { setBookmarks, removeBookmarks } from './browser-specific/bookmarks';
	import { loadCollections, saveCollections } from './browser-specific/Persistence';
	import { refreshCache, getBookmarks } from './bookmarks';
	import type { Collection, Bookmark } from './bookmarks';

	import { onMount } from 'svelte';
	import Item from './components/Item.svelte';

	import Fab, { Icon } from '@smui/fab';
	import Textfield from '@smui/textfield';
	import Button, { Label } from '@smui/button';
	import Dialog, { Title, Header, Content, Actions } from '@smui/dialog';
	import CircularProgress from '@smui/circular-progress';

	let idx: number = 0;

	let deleteConfirmationOpen: boolean = false;
	let editableTitle: string = '';
	let editDialogOpen: boolean = false;
	let loading: boolean = false;

	const newCollectionTemplate: Collection = {
		name: 'My new collection',
		source: '',
		folder: 'My new collection',
		active: false
	};

	let collections: Collection[] = [];
	
	onMount(async () => {
		loading = true;
		loadCollections().then((loadedCollections) => {
			collections = loadedCollections;
			loading = false;
		});
	});

	let placeholderCollection: Collection = {...newCollectionTemplate};

	function addNewCollection(): void {
		idx = -1;
		editCollection(newCollectionTemplate);
	}

	function editIndex(i: number): void {
		idx = i;
		editCollection(collections[i]);
	}

	function editCollection(collection: Collection): void {
		editableTitle = collection.name;
		placeholderCollection = {...collection};
		editDialogOpen = true;
	}

	function save(): void {
		placeholderCollection.name = editableTitle;

		if (idx == -1) {
			// add the new collection at the end
			collections = [...collections, {...placeholderCollection}]; 
		}
		else {
			// replace the edited collection
			collections = collections.slice(0, idx).concat(
				[{...placeholderCollection}], collections.slice(idx + 1)
			);
		}

		editDialogOpen = false;
		saveCollections(collections);
	}

	function cancelEdit() {
		editDialogOpen = false;
	}

	function confirmDelete() {
		deleteConfirmationOpen = true;
	}

	function cancelDelete() {
		deleteConfirmationOpen = false;
	}

	function remove() {
		collections = collections.slice(0, idx).concat(collections.slice(idx + 1));
		deleteConfirmationOpen = false;
		editDialogOpen = false;
		saveCollections(collections);
	}

	async function update(idx: number) {
		refreshCache(collections[idx]);
	}

	async function stateChanged(collection: Collection) {
		var bookmarks: Bookmark[] = await getBookmarks(collection);

		if (collection.active) {
			await setBookmarks(bookmarks, collection.folder);
		}
		else {
			await removeBookmarks(bookmarks, collection.folder);
		}
	}
</script>

<main>
	<div class="container">
		{#if loading}
			<div style="display: flex; flex-wrap: wrap; height: inherit; justify-content: center; align-content: center;">
				<CircularProgress style="height: 48px; width: 48px;" indeterminate />
			</div>
		{:else}
		{#each collections as collection, idx}
			<Item
				Item={collection}
				on:click={() => editIndex(idx)}
				on:toggle={(e) => { collection.active = e.detail.checked; stateChanged(collection); }}
				on:download={() => update(idx)}
			/>
			{/each}

			<div class="buttoncontainer">
				<Fab mini on:click={addNewCollection}>
					<Icon tag="svg" viewBox="0 0 448 512">
						<path fill="currentcolor" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
					</Icon>
				</Fab>
			</div>
		{/if}
	</div>

	<!-- Edit dialog. Should be moved to its own component, but I can't make that work... -->
	<Dialog
		bind:open={editDialogOpen}
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
				<Textfield bind:value={placeholderCollection.folder} label="Target folder" style="width: 300px;" />
			</div>

			{#if idx >= 0}
				<div style="display: flex; flex-wrap: wrap; height: 90px; justify-content: center; align-content: center;">
					<Button variant="unelevated" on:click={confirmDelete} style="background-color: red;">
						<Label>Delete</Label>
					</Button>
				</div>
			{/if}
		</Content>

		<Actions>
			<Button on:click={save}>
				<Label>Save</Label>
			</Button>
			<Button on:click={cancelEdit}>
				<Label>Cancel</Label>
			</Button>
		</Actions>
	</Dialog>

	<!-- Deletion confirmation dialog -->
	<Dialog
		bind:open={deleteConfirmationOpen}
		aria-labelledby="default-focus-title"
		aria-describedby="default-focus-content"
	>
		<Title id="default-focus-title">Are you sure?</Title>
		<Content id="default-focus-content">
			Are you sure you want to delete this collection?
		</Content>
		<Actions>
			<Button on:click={remove}>
				<Label>Delete</Label>
			</Button>
			<Button on:click={cancelDelete}>
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
