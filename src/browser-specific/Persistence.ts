import type { Collection } from "../bookmarks";

export async function loadCollections(): Promise<Collection[]> {
	let result = await browser.storage.local.get('collections');
	if ('collections' in result) {
		return result['collections'];
	}
	return [];
}

export async function saveCollections(collections: Collection[]): Promise<void> {
	await browser.storage.local.set({ collections: collections });
}
