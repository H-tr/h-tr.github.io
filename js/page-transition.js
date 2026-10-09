/**
 * Page transitions and the nav underline.
 *
 * Loaded without `defer` so the fallback classes land on <html> before the
 * first paint. Browsers with cross-document View Transitions are animated
 * entirely by css/transitions.css; everything else gets a short fade.
 */
(() => {
    const root = document.documentElement;
    const supportsViewTransitions = 'PageRevealEvent' in window;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const useFallback = !supportsViewTransitions && !reduceMotion;
    const FLAG = 'pt-nav';
    const EXIT_MS = 180;

    if (useFallback) {
        root.classList.add('pt-fallback');
        try {
            if (sessionStorage.getItem(FLAG) === '1') {
                sessionStorage.removeItem(FLAG);
                root.classList.add('pt-enter');
            }
        } catch (e) {
            // Storage can be unavailable (private mode); skip the entry fade.
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        initNavUnderline();
        if (useFallback) initFallback();
    });

    /* The underline lives inside the active link and follows the pointer by
       translating and scaling relative to that link. */
    function initNavUnderline() {
        const nav = document.querySelector('nav');
        const indicator = nav && nav.querySelector('.nav-indicator');
        if (!indicator) return;
        const home = indicator.parentElement;

        const moveTo = link => {
            if (link === home) {
                indicator.style.transform = '';
                return;
            }
            const from = home.getBoundingClientRect();
            const to = link.getBoundingClientRect();
            const dx = to.left - from.left;
            const dy = to.bottom - from.bottom;
            const scale = to.width / from.width;
            indicator.style.transform = `translate(${dx}px, ${dy}px) scaleX(${scale})`;
        };

        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('mouseenter', () => moveTo(link));
            link.addEventListener('focus', () => moveTo(link));
        });
        nav.addEventListener('mouseleave', () => moveTo(home));
        nav.addEventListener('focusout', event => {
            if (!nav.contains(event.relatedTarget)) moveTo(home);
        });
    }

    function initFallback() {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => root.classList.remove('pt-enter'));
        });

        document.addEventListener('click', event => {
            const link = event.target.closest('a');
            if (!link || !isPageLink(link, event)) return;
            event.preventDefault();
            try {
                sessionStorage.setItem(FLAG, '1');
            } catch (e) {
                // Navigation still works without the entry fade.
            }
            root.classList.add('pt-exit');
            setTimeout(() => {
                window.location.href = link.href;
            }, EXIT_MS);
        });

        window.addEventListener('pageshow', event => {
            if (event.persisted) root.classList.remove('pt-exit', 'pt-enter');
        });
    }

    function isPageLink(link, event) {
        if (event.defaultPrevented || event.button !== 0) return false;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
        if (link.target && link.target !== '_self') return false;
        if (link.hasAttribute('download')) return false;
        if (link.origin !== window.location.origin) return false;
        const href = link.getAttribute('href') || '';
        if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return false;
        // Same page with only a different hash: let the browser scroll.
        if (link.pathname === window.location.pathname && link.search === window.location.search) return false;
        return true;
    }
})();
