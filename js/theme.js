/**
 * Light and dark themes.
 *
 * Loaded without `defer` so a saved choice lands on <html> before the first
 * paint. Without a saved choice the page follows the system setting through
 * css/theme.css. The switch reveals the new theme as a circle growing from
 * the button, using a same-document View Transition where supported.
 */
(() => {
    const KEY = 'theme';
    const root = document.documentElement;
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

    try {
        const saved = localStorage.getItem(KEY);
        if (saved === 'dark' || saved === 'light') root.dataset.theme = saved;
    } catch (e) {
        // Storage unavailable: follow the system setting.
    }

    const current = () => root.dataset.theme || (systemDark.matches ? 'dark' : 'light');

    document.addEventListener('DOMContentLoaded', () => {
        const toggle = document.querySelector('.theme-toggle');
        if (!toggle) return;

        const sync = () => {
            const dark = current() === 'dark';
            toggle.classList.toggle('is-dark', dark);
            const label = dark ? 'Switch to light theme' : 'Switch to dark theme';
            toggle.setAttribute('aria-label', label);
            toggle.title = label;
        };

        const apply = theme => {
            root.dataset.theme = theme;
            try {
                localStorage.setItem(KEY, theme);
            } catch (e) {
                // The choice still applies to this page.
            }
            sync();
        };

        toggle.addEventListener('click', () => {
            const next = current() === 'dark' ? 'light' : 'dark';
            const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (!document.startViewTransition || reduceMotion) {
                apply(next);
                return;
            }

            const box = toggle.getBoundingClientRect();
            const x = box.left + box.width / 2;
            const y = box.top + box.height / 2;
            const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

            root.classList.add('theme-switching');
            const transition = document.startViewTransition(() => apply(next));
            transition.ready.then(() => {
                root.animate(
                    { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
                    { duration: 560, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)', pseudoElement: '::view-transition-new(root)' }
                );
            }).catch(() => {});
            transition.finished.finally(() => root.classList.remove('theme-switching'));
        });

        systemDark.addEventListener('change', sync);
        sync();
        toggle.hidden = false;
    });
})();
