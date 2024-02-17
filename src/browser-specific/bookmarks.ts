import type { Bookmark } from "../bookmarks";
import browser from '../browser-polyfill';

export async function setBookmarks(bookmarks: Bookmark[], path: string): Promise<undefined> {
	// TODO: if a folder with this name already exists, that folder should be used
	var folder = await browser.bookmarks.create({ title: path, parentId: '1' });
	bookmarks.forEach((bookmark) =>
		browser.bookmarks.create({
			parentId: folder.id,
			title: bookmark.name,
			url: bookmark.url,
		})
	);
}

export async function removeBookmarks(bookmarks: Bookmark[], path: string) {
	// TODO
	console.log(`removing bookmarks from "${path}":`);
	console.log(bookmarks);
}
