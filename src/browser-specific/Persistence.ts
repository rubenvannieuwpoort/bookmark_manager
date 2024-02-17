import type { Collection } from "../bookmarks";
import browser from '../browser-polyfill';

export async function loadCollections() {
	let result = await browser.storage.local.get('collections');
	if ('collections' in result) {
		return result['collections'];
	}
	return [];
}

export async function saveCollections(collections: Collection[]) {
	browser.storage.local.set({ collections: collections });
}
