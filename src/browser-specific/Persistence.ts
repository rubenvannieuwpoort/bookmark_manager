import type { Collection } from "../types/Collection";

// const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function loadCollections() {
	let result = await chrome.storage.local.get('collections');
	if ('collections' in result) {
		return result['collections'];
	}
	return null;
}

export async function saveCollections(collections: Collection[]) {
	chrome.storage.local.set({ collections: collections });
}