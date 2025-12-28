/**
 * Modern Reference System
 * Handles interactive citations with tooltips and smooth scrolling
 */

(function () {
    'use strict';

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initReferences);
    } else {
        initReferences();
    }

    function initReferences() {
        // Get all reference list items
        const refItems = document.querySelectorAll('.references-list li');

        if (refItems.length === 0) {
            return; // No references on this page
        }

        // Store reference texts for tooltips
        const refTexts = Array.from(refItems).map((item, index) => {
            // Clone the item to manipulate it
            const clone = item.cloneNode(true);

            // Remove any backlinks from the clone
            const backlinks = clone.querySelectorAll('.ref-backlink');
            backlinks.forEach(link => link.remove());

            // Get the text content
            let text = clone.textContent.trim();

            // Truncate if too long
            if (text.length > 200) {
                text = text.substring(0, 200) + '...';
            }

            return text;
        });

        // Add IDs to reference items if they don't have them
        refItems.forEach((item, index) => {
            if (!item.id) {
                item.id = `ref-${index + 1}`;
            }
        });

        // Find and convert all citation patterns in the text
        convertCitations(refTexts);

        // Add smooth scroll behavior
        addSmoothScroll();
    }

    function convertCitations(refTexts) {
        // Find all text nodes in the blog content
        const content = document.querySelector('.blog-post-content');
        if (!content) return;

        // Get all sections except the references section
        const sections = content.querySelectorAll('.blog-section');

        sections.forEach(section => {
            // Skip if this is the references section
            if (section.querySelector('.references-list')) return;

            // Process text nodes in this section
            processTextNodes(section, refTexts);
        });
    }

    function processTextNodes(element, refTexts) {
        // Create a tree walker to find all text nodes
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function (node) {
                    // Skip if parent is already a cite element or in references
                    if (node.parentElement.classList.contains('cite') ||
                        node.parentElement.closest('.references-section')) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    // Only accept text nodes that contain citation patterns
                    if (/\[\d+(?:,\s*\d+)*\]/.test(node.textContent)) {
                        return NodeFilter.FILTER_ACCEPT;
                    }
                    return NodeFilter.FILTER_REJECT;
                }
            }
        );

        const textNodes = [];
        let node;
        while (node = walker.nextNode()) {
            textNodes.push(node);
        }

        // Process each text node
        textNodes.forEach(textNode => {
            const text = textNode.textContent;
            const regex = /\[(\d+(?:,\s*\d+)*)\]/g;

            if (!regex.test(text)) return;

            // Reset regex
            regex.lastIndex = 0;

            const fragment = document.createDocumentFragment();
            let lastIndex = 0;
            let match;

            while ((match = regex.exec(text)) !== null) {
                // Add text before the citation
                if (match.index > lastIndex) {
                    fragment.appendChild(
                        document.createTextNode(text.substring(lastIndex, match.index))
                    );
                }

                // Parse citation numbers
                const citationNumbers = match[1].split(',').map(n => n.trim());

                if (citationNumbers.length > 1) {
                    // Multiple citations - create a group
                    const group = document.createElement('span');
                    group.className = 'cite-group';

                    citationNumbers.forEach((num, idx) => {
                        const cite = createCiteElement(num, refTexts);
                        group.appendChild(cite);
                    });

                    fragment.appendChild(group);
                } else {
                    // Single citation
                    const cite = createCiteElement(citationNumbers[0], refTexts);
                    fragment.appendChild(cite);
                }

                lastIndex = regex.lastIndex;
            }

            // Add remaining text
            if (lastIndex < text.length) {
                fragment.appendChild(
                    document.createTextNode(text.substring(lastIndex))
                );
            }

            // Replace the text node with the fragment
            textNode.parentNode.replaceChild(fragment, textNode);
        });
    }

    function createCiteElement(num, refTexts) {
        const cite = document.createElement('a');
        cite.className = 'cite';
        cite.href = `#ref-${num}`;
        cite.textContent = num;
        cite.setAttribute('aria-label', `Citation ${num}`);
        cite.setAttribute('data-ref', num);

        // Add tooltip if reference text exists
        const refIndex = parseInt(num) - 1;
        if (refTexts[refIndex]) {
            const tooltip = document.createElement('span');
            tooltip.className = 'cite-tooltip';
            tooltip.textContent = refTexts[refIndex];
            cite.appendChild(tooltip);

            // Adjust tooltip position if near edge
            cite.addEventListener('mouseenter', function () {
                const rect = cite.getBoundingClientRect();
                const tooltipRect = tooltip.getBoundingClientRect();

                if (rect.left < 150) {
                    tooltip.classList.add('tooltip-left');
                } else {
                    tooltip.classList.remove('tooltip-left');
                }
            });
        }

        // Add click tracking for backlinks
        cite.addEventListener('click', function (e) {
            // Store the citation location for backlink
            const refItem = document.getElementById(`ref-${num}`);
            if (refItem) {
                // Check if backlink already exists
                let backlink = refItem.querySelector(`.ref-backlink[data-from="${cite.getAttribute('data-cite-id')}"]`);

                if (!backlink) {
                    // Create unique ID for this citation instance
                    const citeId = `cite-${num}-${Date.now()}`;
                    cite.setAttribute('id', citeId);
                    cite.setAttribute('data-cite-id', citeId);

                    // Create backlink
                    backlink = document.createElement('a');
                    backlink.className = 'ref-backlink';
                    backlink.href = `#${citeId}`;
                    backlink.setAttribute('data-from', citeId);
                    backlink.setAttribute('aria-label', 'Back to citation');
                    backlink.title = 'Back to citation';

                    refItem.appendChild(backlink);
                }
            }
        });

        return cite;
    }

    function addSmoothScroll() {
        // Ensure smooth scrolling is enabled
        document.documentElement.style.scrollBehavior = 'smooth';

        // Add offset for fixed headers if any
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();

                    // Calculate offset (adjust if you have a fixed header)
                    const offset = 20;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Update URL hash
                    history.pushState(null, null, href);
                }
            });
        });
    }

    // Handle initial hash on page load
    window.addEventListener('load', function () {
        if (window.location.hash) {
            const target = document.querySelector(window.location.hash);
            if (target) {
                setTimeout(() => {
                    const offset = 20;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }, 100);
            }
        }
    });

})();
