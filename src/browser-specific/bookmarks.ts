import type { Bookmark } from "../bookmarks";

export async function setBookmarks(bookmarks: Bookmark[], path: string) {
	// TODO: if a folder with this name already exists, that folder should be used
	var folder = await chrome.bookmarks.create({ title: path, parentId: '1' });
	bookmarks.forEach((bookmark) => {
		chrome.bookmarks.create({
			parentId: folder.id,
			title: bookmark.name,
			url: bookmark.url,
		});
	});
}

export async function removeBookmarks(bookmarks: Bookmark[], path: string) {
	// TODO
	console.log(`removing bookmarks from "${path}":`);
	console.log(bookmarks);
}
