# Bookmark manager

Work in progress!

Simple extension to easily import collections of bookmarks. Written in Svelte. Currently only Chrome is supported.


### Building

```
npm run build
```

After building, the `public` folder can be imported by clicking 'load unpacked' in the 'manage extensions' view in Chrome.


### To do
- Handle error paths (invalid URL, invalid JSON)
- Test on other browsers (Firefox, Opera, Edge, ...)
- Instead of using the first child of the root to save the bookmark folder, let the user select the target folder. For this we need a treeview such as one of
  - https://framework7.io/docs/treeview
  - https://carbondesignsystem.com/components/tree-view/usage/