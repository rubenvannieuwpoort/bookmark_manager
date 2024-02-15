const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default async function loadCollections() {
	await sleep(1000);
	alert('hello');
	return [
		{
			name: 'My new collection',
			source: 'https://www.google.com/bookmarks.json',
			target: 'bookmarkbar',
			targetFolder: 'My new collection',
			active: true
		},
		{
			name: 'My new collection (2)',
			source: 'https://www.google.com/bookmarks.json',
			target: 'bookmarkbar',
			targetFolder: 'My new collection',
			active: false
		}
	];

	/* let result = await chrome.storage.local.get('collections');
	if ('collections' in result) {
		collections = result['collections'];
	}*/
}
