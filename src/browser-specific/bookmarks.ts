import type { Bookmark } from "../bookmarks";
import browser from 'webextension-polyfill';

export async function setBookmarks(bookmarks: Bookmark[], path: string): Promise<void> {
	// TODO: if a folder with this name already exists, that folder should be used
	var folder = await browser.bookmarks.create({ title: path, parentId: '1' });
	var promises = bookmarks.map((bookmark) =>
		browser.bookmarks.create({
			parentId: folder.id,
			title: bookmark.name,
			url: bookmark.url,
		})
	);
	await Promise.all(promises);
}

export async function removeBookmarks(bookmarks: Bookmark[], path: string): Promise<void> {
	// TODO
	console.log(`removing bookmarks from "${path}":`);
	console.log(bookmarks);
}
