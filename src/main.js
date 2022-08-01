import App from './App.svelte';

if (navigator.wakeLock) {
	navigator.wakeLock.request()
}

var app = new App({
	target: document.body
});

export default app;