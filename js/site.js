/**
 * Section pages: page transitions with the nav underline, the visit counter,
 * lazy videos, and on the blog list the post-opening title morph and the
 * Post and Survey tabs.
 *
 * Loaded in <head> without `defer`, so the fallback classes and the
 * pagereveal and pageswap listeners are in place before the first paint.
 * Browsers with cross-document View Transitions are animated entirely by
 * css/site.css (and css/blog.css for opening a post); everything else gets
 * a short fade. Features that touch the page wait for DOMContentLoaded and
 * run only when their elements exist.
 */
(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const useFallback = !('PageRevealEvent' in window) && !reduceMotion;
    const FADE_FLAG = 'pt-nav';
    const FADE_EXIT_MS = 180;

    // Before the first paint
    if (useFallback) startFallbackFade();
    if ('PageRevealEvent' in window) initPostOpening();

    document.addEventListener('DOMContentLoaded', () => {
        initNavUnderline();
        if (useFallback) initFallbackFade();
        initVisitCount();
        initLazyVideos();
        initBlogTabs();
    });

    /* ---------- Fallback fade ---------- */

    // Fade in when the previous page faded out on a link click
    function startFallbackFade() {
        root.classList.add('pt-fallback');
        try {
            if (sessionStorage.getItem(FADE_FLAG) === '1') {
                sessionStorage.removeItem(FADE_FLAG);
                root.classList.add('pt-enter');
            }
        } catch (e) {
            // Storage can be unavailable (private mode); skip the entry fade.
        }
    }

    function initFallbackFade() {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => root.classList.remove('pt-enter'));
        });

        document.addEventListener('click', event => {
            const link = event.target.closest('a');
            if (!link || !isPageLink(link, event)) return;
            event.preventDefault();
            try {
                sessionStorage.setItem(FADE_FLAG, '1');
            } catch (e) {
                // Navigation still works without the entry fade.
            }
            root.classList.add('pt-exit');
            setTimeout(() => {
                window.location.href = link.href;
            }, FADE_EXIT_MS);
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

    /* ---------- Nav underline ---------- */

    // The underline lives inside the active link and follows the pointer by
    // translating and scaling relative to that link.
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

    /* ---------- Visit counter ---------- */

    // Site-wide visit total from GoatCounter for [data-visit-count] (home
    // footer). It stays hidden when the counter is unavailable (setting off,
    // network error, ad blocker). GoatCounter caches the number for up to
    // four hours.
    function initVisitCount() {
        const target = document.querySelector('[data-visit-count]');
        if (!target) return;

        fetch('https://h-tr.goatcounter.com/counter/TOTAL.json')
            .then(response => (response.ok ? response.json() : Promise.reject(response.status)))
            .then(data => {
                const count = typeof data.count === 'number'
                    ? data.count.toLocaleString('en-US')
                    : String(data.count || '').trim();
                if (!count || count === '0') return;
                target.textContent = ` · ${count} visits`;
                target.hidden = false;
            })
            .catch(() => {
                // Leave the footer as is when the counter can't be reached.
            });
    }

    /* ---------- Lazy videos ---------- */

    // Play videos marked data-lazy only while they are on screen, so
    // below-the-fold clips don't compete with the first one for bandwidth.
    function initLazyVideos() {
        const videos = document.querySelectorAll('video[data-lazy]');
        if (!videos.length) return;
        const play = video => video.play().catch(() => {});

        if (!('IntersectionObserver' in window)) {
            videos.forEach(play);
            return;
        }

        const observer = new IntersectionObserver(entries => {
            entries.forEach(({ target: video, isIntersecting }) => {
                if (isIntersecting) play(video);
                else if (!video.paused) video.pause();
            });
        }, { rootMargin: '200px 0px' });

        videos.forEach(video => observer.observe(video));
    }

    /* ---------- Opening a post from the blog list ---------- */

    // The clicked entry's title and date take the view-transition names the
    // post gives its headline and date (post-title, post-date), so the title
    // rises out of the list and grows into the headline. Going back reverses
    // it. The motion itself lives in css/blog.css. Pages without blog entries
    // find nothing to name.
    function initPostOpening() {
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
    }

    /* ---------- Blog tabs ---------- */

    // The Post and Survey lists sit side by side in a track that slides by
    // half its width. The viewport takes the height of the visible list, and
    // the AI notice shows only with the surveys. ?tab=survey opens on the
    // surveys without sliding.
    function initBlogTabs() {
        const track = document.getElementById('blogTabsTrack');
        if (!track) return;
        const viewport = track.parentElement;
        const panels = track.querySelectorAll('.blog-tab-panel');
        const tabs = document.querySelectorAll('.subnav-tab');
        const notice = document.getElementById('aiNotice');
        let current = 0;

        const syncHeight = () => {
            if (panels[current]) viewport.style.height = panels[current].scrollHeight + 'px';
        };

        const switchTo = index => {
            if (index === current) return;
            tabs.forEach(tab => tab.classList.remove('active'));
            tabs[index].classList.add('active');
            track.style.transform = `translateX(-${index * 50}%)`;
            current = index;
            syncHeight();
            if (notice) notice.classList.toggle('visible', index === 1);
        };

        syncHeight();

        if (new URLSearchParams(window.location.search).get('tab') === 'survey') {
            track.style.transition = 'none';
            switchTo(1);
            // Slide again on later switches, once this position has painted
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    track.style.transition = '';
                });
            });
        }

        tabs.forEach(tab => {
            tab.addEventListener('click', () => switchTo(parseInt(tab.dataset.tabIndex, 10)));
        });
        window.addEventListener('load', syncHeight);
        window.addEventListener('resize', syncHeight);
    }
})();
