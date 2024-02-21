import App from './App.svelte';

// @ts-ignore
window.browser = typeof window.browser === 'undefined' ? window.chrome : window.browser;

const app: App = new App({
	target: document.body
});

export default app;
