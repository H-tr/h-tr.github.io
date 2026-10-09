/**
 * Site-wide visit total from GoatCounter, shown in the home footer.
 *
 * Fills any element marked [data-visit-count]. The element stays hidden if
 * the counter is unavailable (setting off, network error, ad blocker).
 * GoatCounter caches this number for up to four hours.
 */
document.addEventListener('DOMContentLoaded', () => {
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
});
