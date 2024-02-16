import type { Bookmark } from "../bookmarks";

export async function setBookmarks(bookmarks: Bookmark[], path: string) {
    console.log(`importing bookmarks to "${path}":`);
    console.log(bookmarks);
}

export async function removeBookmarks(bookmarks: Bookmark[], path: string) {
    console.log(`removing bookmarks from "${path}":`);
    console.log(bookmarks);
}
