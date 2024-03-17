const collectionStorageKey = 'BookmarkManager_BookmarkCollections' as const;

export type Collection = {
    name: string;
    source: string;
    
    // to keep track of the location in the bookmarks
    parentId: string;
    index: number;

    // containing folder
    mainFolder: BookmarkFolder;
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

export async function activateCollection(collection: Collection): Promise<void> {

    console.log(`removed, saved index ${collection.index}`);
    await addBookmarkNode(collection.mainFolder, collection.parentId, collection.index);
}

async function addBookmarkNode(node: BookmarkNode, parentId: string, index?: number): Promise<string> {
    if ('children' in node) {
        // `node` is a folder
        let folder = await browser.bookmarks.create({
            title: node.name,
            parentId: parentId,
            index: index
        });

        for (let child of node.children) {
            await addBookmarkNode(child, folder.id);
        }

        node.id = folder.id;
    }
    else {
        // `node` is a bookmark
        let bookmark = await browser.bookmarks.create({
            title: node.name,
            url: node.url,
            parentId: parentId,
            index: index
        });

        node.id = bookmark.id;
    }

    return node.id!;
}

export async function deactivateCollection(collection: Collection): Promise<void> {
    // set the index of the collection to index of the first node
    // so we can add it in the same place the next time it is added
    // TODO: add some checks here?
    const mainNode = (await browser.bookmarks.get(collection.mainFolder.id!))[0];
    collection.parentId = mainNode.parentId;
    collection.index = mainNode.index;

    console.log(`removed, saved index ${collection.index}`);

    await browser.bookmarks.removeTree(mainNode.id!);
    delete collection.mainFolder.id;
}

export async function fetchBookmarks(source: string): Promise<BookmarkNode[]> {
    // TODO: handle errors?
    return (await (await fetch(source)).json()) as BookmarkNode[];
}

export async function refreshCollectionContent(collection: Collection): Promise<void> {
    let bookmarks: BookmarkNode[] = await fetchBookmarks(collection.source);
    // TODO: handle errors in fetching bookmarks

    deactivateCollection(collection);
    collection.mainFolder.children = bookmarks;
    activateCollection(collection);
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
    store(collectionStorageKey, collections);
}

async function store(key: string, value: any): Promise<void> {
	await browser.storage.local.set({ [key]: value });
}
