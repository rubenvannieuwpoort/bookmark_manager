<script lang="ts">
	import Item from './components/Item.svelte'

    let content = [
        'Hello, world',
        'Goodbye, world',
		'This is yet another item'
    ]
</script>

<main>
	<div>
		{#each content as item}
			<Item>{item}</Item>
		{/each}
	</div>
</main>

<style>
</style>