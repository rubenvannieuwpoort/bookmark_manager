import type { Collection } from "../bookmarks";

export async function loadCollections() {
	let result = await chrome.storage.local.get('collections');
	if ('collections' in result) {
		return result['collections'];
	}
	return [];
}

export async function saveCollections(collections: Collection[]) {
	chrome.storage.local.set({ collections: collections });
}
