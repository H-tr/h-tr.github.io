/**
 * Prism.js initialization — single source of truth for code blocks.
 *
 * Loads Prism + languages from CDN, waits for them to finish, then
 * highlights and attaches a copy button. State changes for the button
 * are class-based; icon swaps are handled entirely in CSS
 * (see css/prism-custom.css: .toolbar button:before / .copy-success:before).
 */
(function () {
  const PRISM_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0';

  const languages = ['python', 'javascript', 'css', 'bash', 'yaml', 'json', 'lisp'];

  function loadCss(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.async = false; // preserve execution order
      s.onload = () => resolve();
      s.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.head.appendChild(s);
    });
  }

  function domReady() {
    return new Promise(resolve => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', resolve, { once: true });
      } else {
        resolve();
      }
    });
  }

  let buttonsAttached = false;
  function attachCopyButtons() {
    if (buttonsAttached) return;
    buttonsAttached = true;

    // Nuke any pre-existing copy buttons from earlier renderers / cached scripts.
    document.querySelectorAll('.copy-button').forEach(el => el.remove());
    document.querySelectorAll('div.code-block > pre').forEach(pre => {
      const outer = pre.parentElement;
      outer.parentNode.insertBefore(pre, outer);
      outer.remove();
    });

    document.querySelectorAll('pre > code[class*="language-"]').forEach(codeBlock => {
      const pre = codeBlock.parentElement;
      if (!pre) return;
      const alreadyWrapped = pre.parentElement && pre.parentElement.classList.contains('code-toolbar');
      if (alreadyWrapped) {
        // Remove any duplicate toolbars inside the wrapper, keep the first.
        const toolbars = pre.parentElement.querySelectorAll(':scope > .toolbar');
        toolbars.forEach((tb, i) => { if (i > 0) tb.remove(); });
        return;
      }

      const wrapper = document.createElement('div');
      wrapper.className = 'code-toolbar';

      const toolbar = document.createElement('div');
      toolbar.className = 'toolbar';

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.setAttribute('aria-label', 'Copy code');
      const icon = document.createElement('i');
      icon.className = 'fa-regular fa-copy';
      icon.setAttribute('aria-hidden', 'true');
      btn.appendChild(icon);

      btn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(codeBlock.textContent);
          icon.className = 'fa-solid fa-check';
          btn.classList.add('copy-success');
          clearTimeout(btn._resetTimer);
          btn._resetTimer = setTimeout(() => {
            icon.className = 'fa-regular fa-copy';
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

  loadCss(`${PRISM_CDN}/plugins/toolbar/prism-toolbar.min.css`);
  loadCss('/css/prism-custom.css');

  (async () => {
    try {
      await loadScript(`${PRISM_CDN}/prism.min.js`);
      if (window.Prism) {
        Prism.manual = true; // we call highlightAll ourselves
      }
      await Promise.all(languages.map(l =>
        loadScript(`${PRISM_CDN}/components/prism-${l}.min.js`).catch(e => console.warn(e.message))
      ));
      await domReady();

      // Run compat (converts legacy .code-section blocks) before highlighting.
      try {
        await loadScript('/js/prism-compat.js');
      } catch (e) {
        console.warn(e.message);
      }

      if (window.Prism) Prism.highlightAll();
      attachCopyButtons();
    } catch (err) {
      console.error('Prism init failed:', err);
    }
  })();
})();
