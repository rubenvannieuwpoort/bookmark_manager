import type { Bookmark } from "../bookmarks";

export async function setBookmarks(bookmarks: Bookmark[], path: string) {
	// TODO: handle error paths
	// TODO: consistent indentation
	// TODO: can we use async/await here?
	chrome.bookmarks.create({ title: path, parentId: '1' }, (folder) => {
		bookmarks.forEach((bookmark) => {
			chrome.bookmarks.create({
				parentId: folder.id,
				title: bookmark.name,
				url: bookmark.url,
			});
		});
	});
}

export async function removeBookmarks(bookmarks: Bookmark[], path: string) {
	// TODO
	console.log(`removing bookmarks from "${path}":`);
	console.log(bookmarks);
}
