document.addEventListener('DOMContentLoaded', () => {
    // Add transition overlay to the body
    const overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    document.body.appendChild(overlay);

    // Initialize the page (make it visible with animation)
    document.body.classList.add('page-visible');

    // Intercept all internal navigation links
    document.querySelectorAll('a').forEach(link => {
        // Skip external links, anchor links, or non-HTTP links
        if (
            link.hostname !== window.location.hostname ||
            link.getAttribute('href').startsWith('#') ||
            link.getAttribute('href').startsWith('mailto:') ||
            link.getAttribute('target') === '_blank'
        ) {
            return;
        }

        link.addEventListener('click', e => {
            e.preventDefault();
            const targetHref = link.getAttribute('href');
            
            // Start the exit animation
            document.body.classList.remove('page-visible');
            document.body.classList.add('page-exit');
            
            // After animation completes, navigate to the new page
            setTimeout(() => {
                window.location.href = targetHref;
            }, 50); // Match this with the CSS transition duration
        });
    });

    // When navigating back with browser history
    window.addEventListener('pageshow', event => {
        if (event.persisted) {
            // Page was loaded from browser cache (e.g., back button)
            document.body.classList.remove('page-exit');
            document.body.classList.add('page-visible');
        }
    });
}); 