const collectionStorageKey = 'BookmarkManager_BookmarkCollections' as const;

export type Collection = {
    name: string;
    source: string;
    content?: BookmarkNode[];
    ids?: string[];
};

export type BookmarkNode = BookmarkFolder | BookmarkItem;

export type BookmarkFolder = {
    name: string;
    children: BookmarkNode[];
    id?: string;
};

export type BookmarkItem = {
    name: string;
    url: string;
    id?: string;
};

// TODO: remove
export async function getDefaultLocationId(): Promise<string> {
    return '1';
}

export async function activateCollection(collection: Collection, id: string): Promise<void> {
    let ids: string[] = [];
    console.log(collection);
    for (let node of collection.content!) {
        ids.push(await addBookmarkNode(node, id));
    }
    collection.ids = ids;
}

async function addBookmarkNode(node: BookmarkNode, id: string): Promise<string> {
    if ('children' in node) {
        // `node` is a folder
        let folder = await browser.bookmarks.create({
            title: node.name,
            parentId: id
        });

        for (let child of node.children) {
            await addBookmarkNode(child, folder.id);
        }

        return folder.id;
    }
    else {
        // `node` is a bookmark
        let bookmark = await browser.bookmarks.create({
            title: node.name,
            url: node.url,
            parentId: id,
        });

        return bookmark.id;
    }
}

export async function deactivateCollection(collection: Collection): Promise<void> {
    for (let id of collection.ids!) {
        await browser.bookmarks.removeTree(id);
    }
    delete collection.ids;
}

export async function fetchBookmarks(source: string): Promise<BookmarkNode[]> {
    // TODO: handle errors?
    return (await (await fetch(source)).json()) as BookmarkNode[];
}

export async function refreshCollectionContent(collection: Collection): Promise<void> {
    let bookmarks: BookmarkNode[] = await fetchBookmarks(collection.source);
    // TODO: handle errors in fetching bookmarks
    collection.content = bookmarks;
}

export async function loadCollections(): Promise<Collection[]> {
    // TODO: inline load function
    let result = await load(collectionStorageKey);
    return result || [];
}

async function load(key: string): Promise<any> {
	let dict: any = await browser.storage.local.get(key);
	return (key in dict) ? dict[key] : null;
}

export async function storeCollections(collections: Collection[]): Promise<void> {
    console.log(collections);
    store(collectionStorageKey, collections);
}

async function store(key: string, value: any): Promise<void> {
	await browser.storage.local.set({ [key]: value });
}
