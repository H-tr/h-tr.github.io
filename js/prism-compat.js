/**
 * Converts legacy `.code-section` markup into Prism-compatible
 * <pre><code class="language-python"> blocks. Called by prism-init.js
 * after DOMContentLoaded and before Prism.highlightAll().
 */
(function () {
  document.querySelectorAll('.code-section').forEach(section => {
    const header = section.querySelector('.code-header');
    const title = header ? header.querySelector('h3')?.textContent : '';
    const pre = section.querySelector('pre');
    if (!pre) return;

    const code = document.createElement('code');
    code.className = 'language-python';
    code.textContent = title ? `# ${title}\n${pre.textContent}` : pre.textContent;

    pre.textContent = '';
    pre.appendChild(code);
    if (!pre.className.includes('language-')) pre.className += ' language-python';

    if (header) header.remove();
  });
})();
