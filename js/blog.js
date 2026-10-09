/**
 * Posts and surveys: the table of contents, plus what a page needs only
 * sometimes. Prism comes in for code blocks, KaTeX for math, lazy videos
 * play near the screen, and every article loads the GoatCounter page count.
 * The saved light or dark theme is applied earlier by js/theme.js in <head>.
 */

// Registered first so the TOC is built before math renders (KaTeX then
// renders math in the TOC entries too).
document.addEventListener('DOMContentLoaded', function() {
  initTextTOC();
  initLazyVideos();
  initToggles();
});

(() => {
  const KATEX_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.15.3';

  // Auto-render takes the first entry whose left delimiter matches, so
  // $...$ renders as display math. Kept as is to match the published posts.
  const MATH_DELIMITERS = [
    { left: '$', right: '$', display: true },
    { left: '\\[', right: '\\]', display: true },
    { left: '\\(', right: '\\)', display: false },
    { left: '$', right: '$', display: false },
  ];
  // Text that auto-render would turn into math, and the elements it skips
  const MATH_TEXT = /\$[^$]*\$|\\\(|\\\[/;
  const NO_MATH = 'script, noscript, style, textarea, pre, code, option';

  // Ordered scripts run in insertion order (auto-render needs katex.min.js)
  function loadScript(src, ordered) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = !ordered;
      script.onload = resolve;
      script.onerror = () => reject(new Error('Failed to load ' + src));
      document.head.appendChild(script);
    });
  }

  // Placed before the site stylesheets so their rules win (blog.css sizes
  // .katex and sets the code block font)
  function loadCss(href) {
    return new Promise(resolve => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.onload = link.onerror = resolve;
      document.head.insertBefore(link, document.head.querySelector('link[rel="stylesheet"]'));
    });
  }

  function hasMath() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (MATH_TEXT.test(node.data) && !node.parentElement.closest(NO_MATH)) return true;
    }
    return false;
  }

  // Math renders once the page has been parsed and the TOC built
  if (hasMath()) {
    const domReady = new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve));
    Promise.all([
      loadCss(KATEX_CDN + '/katex.min.css'),
      loadScript(KATEX_CDN + '/katex.min.js', true),
      loadScript(KATEX_CDN + '/contrib/auto-render.min.js', true),
      domReady,
    ])
      .then(() => renderMathInElement(document.body, { delimiters: MATH_DELIMITERS, throwOnError: false }))
      .catch(err => console.warn('Math not rendered:', err.message));
  }

  // Code blocks get Prism (js/prism-init.js) and its styles, both requested
  // here to save a round trip. Inserted last, the stylesheet lands first in
  // <head>, ahead of KaTeX's, as before.
  if (document.querySelector('code[class*="language-"], [class*="language-"] code')) {
    loadCss('/css/prism-custom.css');
    loadScript('/js/prism-init.js').catch(err => console.warn(err.message));
  }

  // Page views. GoatCounter itself ignores localhost.
  if (!document.querySelector('script[data-goatcounter]')) {
    const counter = document.createElement('script');
    counter.async = true;
    counter.src = 'https://gc.zgo.at/count.js';
    counter.dataset.goatcounter = 'https://h-tr.goatcounter.com/count';
    document.head.appendChild(counter);
  }
})();

/**
 * Looping videos marked data-lazy (preload="none", no autoplay) play only
 * while near the screen, so they download when the reader gets there.
 * The section pages do the same in js/site.js.
 */
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

/**
 * A button with data-toggle="<id>" shows or hides that element (class
 * .visible) and swaps Show and Hide in its label, as for the vae-dynamics gist.
 */
function initToggles() {
  document.querySelectorAll('button[data-toggle]').forEach(button => {
    const target = document.getElementById(button.dataset.toggle);
    if (!target) return;
    button.addEventListener('click', () => {
      const shown = target.classList.toggle('visible');
      button.textContent = button.textContent.replace(shown ? 'Show' : 'Hide', shown ? 'Hide' : 'Show');
    });
  });
}

/**
 * Text-based TOC with progressive disclosure
 * H3 items only appear when their parent H2 section is active
 */
function initTextTOC() {
  const content = document.querySelector('.blog-post-content');
  if (!content) return;

  const headings = Array.from(content.querySelectorAll('h2, h3'))
    .filter(h => !h.classList.contains('citation-header') && !h.classList.contains('references-header'));
  if (headings.length < 3) return;

  const topOf = el => el.getBoundingClientRect().top + window.scrollY;

  // Create TOC
  const toc = document.createElement('nav');
  toc.className = 'toc';

  const title = document.createElement('div');
  title.className = 'toc-title';
  title.textContent = 'Contents';
  toc.appendChild(title);

  const list = document.createElement('ul');
  list.className = 'toc-list';

  const sections = [];
  const h2Sections = []; // Track H2 sections with their sublists
  let currentH2Data = null;

  headings.forEach(function(heading, i) {
    if (!heading.id) heading.id = 'sec-' + i;

    const text = heading.textContent.trim();

    const link = document.createElement('a');
    link.href = '#' + heading.id;
    link.className = 'toc-link';
    link.textContent = text;

    const li = document.createElement('li');
    li.appendChild(link);

    if (heading.tagName === 'H2') {
      link.classList.add('toc-h2');
      list.appendChild(li);
      currentH2Data = { li: li, sublist: null, el: heading };
      h2Sections.push(currentH2Data);
    } else {
      link.classList.add('toc-h3');

      if (currentH2Data) {
        if (!currentH2Data.sublist) {
          currentH2Data.sublist = document.createElement('ul');
          currentH2Data.sublist.className = 'toc-sublist';
          currentH2Data.li.appendChild(currentH2Data.sublist);
        }
        currentH2Data.sublist.appendChild(li);
      }
    }

    sections.push({ el: heading, link: link, isH2: heading.tagName === 'H2' });

    link.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: topOf(heading) - 100, behavior: 'smooth' });
    });
  });

  toc.appendChild(list);
  document.body.appendChild(toc);

  // Scroll spy with progressive disclosure
  function update() {
    const pos = window.scrollY + 150;

    // Find current section
    let current = sections[0];
    for (const s of sections) {
      if (topOf(s.el) <= pos) current = s;
    }

    // Find which H2 section we're in
    let activeH2 = null;
    for (const h2 of h2Sections) {
      if (topOf(h2.el) <= pos) activeH2 = h2;
    }

    // Update active states
    sections.forEach(s => s.link.classList.remove('active'));
    if (current) current.link.classList.add('active');

    // Show/hide sublists (progressive disclosure)
    h2Sections.forEach(h2 => {
      if (h2.sublist) {
        h2.sublist.classList.toggle('expanded', h2 === activeH2);
      }
    });
  }

  window.addEventListener('scroll', update);
  update();
}
