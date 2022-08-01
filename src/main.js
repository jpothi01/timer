import App from './App.svelte';
import NoSleep from "./nosleep.min.js"

function wakeLockShim() {
	window.noSleep = new NoSleep()

	// Enable wake lock.
	// (must be wrapped in a user input event handler e.g. a mouse or touch handler)
	document.addEventListener('click', function enableNoSleep() {
		document.removeEventListener('click', enableNoSleep, false);
		window.noSleep.enable();
	}, false);
}

if (navigator.wakeLock) {
	navigator.wakeLock.request('screen').catch(() => wakeLockShim())
} else {
	wakeLockShim()
}

var app = new App({
	target: document.body
});

export default app;