/**
 * Opening a post from the blog list.
 *
 * The clicked entry's title and date take the view-transition names the
 * post gives its headline and date (post-title, post-date), so the title
 * rises out of the list and grows into the headline. Going back reverses
 * it. The motion itself lives in css/blog.css. Loaded without `defer` so
 * the pagereveal listener is ready before the first paint.
 */
(() => {
    if (!('PageRevealEvent' in window)) return;

    const PARTS = [['.blog-title', 'post-title'], ['.blog-date', 'post-date']];

    const entryFor = url => {
        if (!url) return null;
        const path = new URL(url, location.href).pathname;
        for (const link of document.querySelectorAll('.blog-item a[href]')) {
            if (link.origin === location.origin && link.pathname === path) return link.closest('.blog-item');
        }
        return null;
    };

    const name = (entry, on) => {
        for (const [selector, transitionName] of PARTS) {
            const el = entry.querySelector(selector);
            if (el) el.style.viewTransitionName = on ? transitionName : '';
        }
    };

    const onScreen = el => {
        const box = el.getBoundingClientRect();
        return box.bottom > 0 && box.top < window.innerHeight && box.right > 0 && box.left < window.innerWidth;
    };

    // Leaving the list for a post
    window.addEventListener('pageswap', event => {
        if (!event.viewTransition || !event.activation) return;
        const entry = entryFor(event.activation.entry.url);
        if (entry) name(entry, true);
    });

    // Arriving back from a post (or restored from the back-forward cache)
    window.addEventListener('pagereveal', event => {
        document.querySelectorAll('.blog-item').forEach(entry => name(entry, false));
        if (!event.viewTransition || !window.navigation || !navigation.activation) return;

        const from = navigation.activation.from;
        const entry = from && entryFor(from.url);
        const title = entry && entry.querySelector('.blog-title');
        if (!title || !onScreen(title)) return;

        name(entry, true);
        event.viewTransition.finished.finally(() => name(entry, false));
    });
})();
