import browser from 'webextension-polyfill';

export type Collection = {
	name: string;    // name in UI
	source: string;  // source URL
	folder: string;  // folder containing the bookmarks
	active: boolean;  //  true to show, false to hide
};

export type Bookmark = {
	name: string;  // name in UI
	url: string;  // source URL
	active: boolean;  //  true to show, false to hide
};

export async function fetchBookmarks(collection: Collection): Promise<Bookmark[]> {
	return (await fetch(collection.source)).json();
}

export async function refreshCache(collection: Collection): Promise<void> {
	await setCache(collection, await fetchBookmarks(collection));
}

async function setCache(collection: Collection, bookmarks: Bookmark[]): Promise<void> {
	var cache = (await browser.storage.local.get('cache'));
	cache = ('cache' in cache) ? cache['cache'] : {};

	cache[collection.source] = bookmarks;
	await browser.storage.local.set({ cache: cache });
}

async function getFromCache(url: string): Promise<Bookmark[] | null> {
	var cache = await browser.storage.local.get('cache');

	if (!('cache' in cache)) {
		return null;
	}

	cache = cache['cache'];
	if (!(url in cache)) {
		return null;
	}

	return cache[url];
}

export async function getBookmarks(collection: Collection): Promise<Bookmark[]> {
	var bookmarks = await getFromCache(collection.source);

	if (bookmarks == null) {
		bookmarks = await fetchBookmarks(collection);
		setCache(collection, bookmarks);
	}

	return bookmarks;
}
