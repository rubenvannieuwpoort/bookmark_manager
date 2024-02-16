import type { Bookmark } from "../bookmarks";

export async function setBookmarks(bookmarks: Bookmark[], path: string) {
    console.log(`importing bookmarks to "${path}":`);
    console.log(bookmarks);

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
    console.log(`removing bookmarks from "${path}":`);
    console.log(bookmarks);
}
