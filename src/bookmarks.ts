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

export async function fetchBookmarks(collection: Collection) {
	return (await fetch(collection.source)).json();
}

export async function refreshCache(collection: Collection) {
	setCache(collection, await fetchBookmarks(collection));
}

async function setCache(collection, bookmarks) {
	var cache = (await browser.storage.local.get('cache'));
	cache = ('cache' in cache) ? cache['cache'] : {};

	cache[collection.source] = bookmarks;
	browser.storage.local.set({ cache: cache });
}

async function getFromCache(url) {
	var cache = await browser.storage.local.get(cache);

	if (!('cache' in cache)) {
		return null;
	}

	cache = cache['cache'];
	if (!(url in cache)) {
		return null;
	}

	return cache[url];
}

export async function getBookmarks(collection: Collection) {
	var bookmarks = await getFromCache(collection.source);

	if (bookmarks == null) {
		bookmarks = await fetchBookmarks(collection);
		setCache(collection, bookmarks);
	}

	return bookmarks;
}
