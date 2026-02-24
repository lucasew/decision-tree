class Router {
    url = $state(typeof window !== 'undefined' ? new URL(window.location.href) : new URL('http://localhost'));

    constructor() {
        if (typeof window !== 'undefined') {
            const updateUrl = () => {
                this.url = new URL(window.location.href);
            };
            window.addEventListener('popstate', updateUrl);
            window.addEventListener('hashchange', updateUrl);
        }
    }

    push(path: string | URL, state: any = {}) {
        if (typeof window !== 'undefined') {
            window.history.pushState(state, '', path);
            this.url = new URL(window.location.href);
        }
    }

    replace(path: string | URL, state: any = {}) {
        if (typeof window !== 'undefined') {
            window.history.replaceState(state, '', path);
            this.url = new URL(window.location.href);
        }
    }

    back() {
        if (typeof window !== 'undefined') {
            window.history.back();
        }
    }
}

export const router = new Router();
