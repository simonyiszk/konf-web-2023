// Disable old service worker
if (navigator && "serviceWorker" in navigator) {
	navigator.serviceWorker.ready.then((registration) => {
		registration.unregister();
	});
}
