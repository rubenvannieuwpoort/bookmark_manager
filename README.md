# Bookmark manager

Work in progress!

Simple extension to easily import collections of bookmarks. Written in Svelte. Currently only Chrome is supported.


### Building

```
npm run build
```

After building, the `public` folder can be imported by clicking 'load unpacked' in the 'manage extensions' view in Chrome.


### To do
- Instead of using the first child of the root of `` to save the bookmark folder, let the user select the target folder. For this we need a treeview such as one of
  - https://framework7.io/docs/treeview
  - https://carbondesignsystem.com/components/tree-view/usage/
- Handle error paths
  - Handle invalid URL
  - Handle invalid JSON
- Remove bookmarks after toggling a collection to inactive
  - If this leaves an empty folder, remove this folder
- Test on other browsers (Firefox, Opera, Edge, ...)