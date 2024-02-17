# Bookmark manager

Work in progress!

Simple extension to easily import collections of bookmarks. Written in Svelte. Currently only Chrome is supported.


### Building

```
npm run build
```

After building, the `public` folder can be imported by clicking 'load unpacked' in the 'manage extensions' view in Chrome.


### To do
- Add types everywhere (yeah, I know, programming without types and then adding them later is kind of the wrong way around 😅)
- Handle error paths
  - Handle invalid URL
  - Handle invalid JSON
- Remove bookmarks after toggling a collection to inactive
  - If this leaves an empty folder, remove this folder
- Test on other browsers (Firefox, Opera, Edge, ...)