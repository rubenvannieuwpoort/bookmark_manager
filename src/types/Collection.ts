export type Collection = {
    name: string;    // name in UI
    source: string;  // source URL
    target: string;  // either "bookmarkbar" or "other"
    targetFolder: string;  // folder containing the bookmarks
    active: boolean;  //  true to show, false to hide
};
