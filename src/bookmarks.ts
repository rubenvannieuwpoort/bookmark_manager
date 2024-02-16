export type Collection = {
    name: string;    // name in UI
    source: string;  // source URL
    target: string;  // either "bookmarkbar" or "other"
    targetFolder: string;  // folder containing the bookmarks
    active: boolean;  //  true to show, false to hide
};

export type Bookmark = {
    name: string;  // name in UI
    url: string;  // source URL
    active: boolean;  //  true to show, false to hide
};

export async function fetchBookmarks(collection: Collection) {
    console.log('fetching');
    return (await fetch(collection.source)).json();
}

export async function refreshCache(collection: Collection) {
    setCache(collection, await fetchBookmarks(collection));
}

async function setCache(collection, bookmarks) {
    console.log('setting cache');
    var cache = (await chrome.storage.local.get('cache'))['cache'];
    cache[collection.source] = bookmarks;
    chrome.storage.local.set({ cache: cache });
}

export async function getBookmarks(collection: Collection) {
    console.log('getting');
    var cache = (await chrome.storage.local.get(cache))['cache'];

    console.log('cache');
    console.log(cache);

    if (collection.source in cache) {
        console.log('found in cache');
        return cache[collection.source];
    }
    var bookmarks = await fetchBookmarks(collection);
    setCache(collection, bookmarks);
    return bookmarks;
}
