/**
 * Prism.js code highlighting, loaded by js/blog.js (with css/prism-custom.css)
 * only on pages with <code class="language-*"> blocks.
 *
 * Loads Prism and the grammars the page uses from the CDN, highlights, then
 * attaches a copy button to each block. The button's icon comes from the
 * /media/icons.svg sprite and turns into a check (with the .copy-success
 * class) for a moment after copying.
 */
(function () {
  const PRISM_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0';

  // Grammars on top of those in prism.min.js (markup, css, clike, javascript).
  // Only the ones a page uses are fetched, in parallel, so none of them may
  // depend on another (cpp, for one, would need c loaded first).
  const languages = ['python', 'bash', 'yaml', 'json', 'lisp'];

  // Copy and check icons from the /media/icons.svg sprite
  const ICON_VIEWBOX = { copy: '0 0 512 512', check: '0 0 448 512' };

  function setIcon(svg, id) {
    svg.setAttribute('viewBox', ICON_VIEWBOX[id]);
    svg.firstChild.setAttribute('href', '/media/icons.svg#' + id);
  }

  function spriteIcon(id) {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('class', 'icon');
    svg.setAttribute('aria-hidden', 'true');
    svg.appendChild(document.createElementNS(ns, 'use'));
    setIcon(svg, id);
    return svg;
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.async = true; // not queued behind KaTeX's ordered scripts (js/blog.js)
      s.onload = () => resolve();
      s.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.head.appendChild(s);
    });
  }

  function attachCopyButtons() {
    document.querySelectorAll('pre > code[class*="language-"]').forEach(codeBlock => {
      const pre = codeBlock.parentElement;
      if (pre.parentElement.classList.contains('code-toolbar')) return;

      const wrapper = document.createElement('div');
      wrapper.className = 'code-toolbar';

      const toolbar = document.createElement('div');
      toolbar.className = 'toolbar';

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.setAttribute('aria-label', 'Copy code');
      const icon = spriteIcon('copy');
      btn.appendChild(icon);

      btn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(codeBlock.textContent);
          setIcon(icon, 'check');
          btn.classList.add('copy-success');
          clearTimeout(btn._resetTimer);
          btn._resetTimer = setTimeout(() => {
            setIcon(icon, 'copy');
            btn.classList.remove('copy-success');
          }, 1600);
        } catch (err) {
          console.error('Copy failed:', err);
        }
      });

      toolbar.appendChild(btn);
      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);
      wrapper.appendChild(toolbar);
    });
  }

  // Read by Prism as it loads, so it waits for highlightAll below
  window.Prism = window.Prism || {};
  window.Prism.manual = true;

  const used = languages.filter(l => document.querySelector('.language-' + l));

  (async () => {
    try {
      await loadScript(`${PRISM_CDN}/prism.min.js`);
      await Promise.all(used.map(l =>
        loadScript(`${PRISM_CDN}/components/prism-${l}.min.js`).catch(e => console.warn(e.message))
      ));
      Prism.highlightAll();
      attachCopyButtons();
    } catch (err) {
      console.error('Prism init failed:', err);
    }
  })();
})();
