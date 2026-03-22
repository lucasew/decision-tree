import { mount } from 'svelte';
import App from './App.svelte';
import './global.css';
import { reportError } from './lib/errors/reporter';

window.addEventListener('error', (event) => {
	reportError(event.error || event.message, { source: 'window.onerror' });
});

window.addEventListener('unhandledrejection', (event) => {
	reportError(event.reason, { source: 'window.onunhandledrejection' });
});

const app = mount(App, {
	target: document.body,
});

export default app;