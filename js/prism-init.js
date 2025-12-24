/**
 * Prism.js Initialization and Dynamic Script Loading
 * 
 * This script handles loading Prism.js and its dependencies
 */
(function () {
  // Base CDN URL for Prism.js
  const PRISM_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0';

  // Theme and base scripts
  const baseScripts = [
    { type: 'css', path: `${PRISM_CDN}/themes/prism-solarizedlight.min.css` },
    { type: 'css', path: `${PRISM_CDN}/plugins/toolbar/prism-toolbar.min.css` },
    { type: 'css', path: '/css/prism-custom.css' },
    { type: 'js', path: `${PRISM_CDN}/prism.min.js` }
  ];

  // Languages to load
  const languages = [
    'python',
    'javascript',
    'css',
    'bash',
    'yaml',
    'json',
    'lisp'
  ];

  // Load all base scripts first
  baseScripts.forEach(script => {
    if (script.type === 'css') {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = script.path;
      document.head.appendChild(link);
    } else {
      const scriptEl = document.createElement('script');
      scriptEl.src = script.path;
      document.head.appendChild(scriptEl);
    }
  });

  // Then load all language scripts
  languages.forEach(lang => {
    const scriptEl = document.createElement('script');
    scriptEl.src = `${PRISM_CDN}/components/prism-${lang}.min.js`;
    document.head.appendChild(scriptEl);
  });

  // Wait for DOM content to be loaded
  document.addEventListener('DOMContentLoaded', function () {
    // Load compatibility script after Prism is ready
    const compatScript = document.createElement('script');
    compatScript.src = '/js/prism-compat.js';
    document.head.appendChild(compatScript);

    // Custom clipboard functionality - GitHub style
    setTimeout(() => {
      if (window.Prism) {
        // Initialize Prism
        Prism.highlightAll();

        // Add toolbar and copy button
        document.querySelectorAll('pre > code').forEach(codeBlock => {
          // Make sure the pre has a position relative
          const preBlock = codeBlock.parentElement;
          if (preBlock) {
            // Create toolbar
            const toolbar = document.createElement('div');
            toolbar.className = 'toolbar';

            // Create copy button
            const copyButton = document.createElement('button');
            const span = document.createElement('span');
            span.textContent = 'Copy';
            copyButton.appendChild(span);

            // Add copy functionality
            copyButton.addEventListener('click', () => {
              navigator.clipboard.writeText(codeBlock.textContent)
                .then(() => {
                  // Show success state
                  copyButton.classList.add('copy-success');
                  setTimeout(() => {
                    copyButton.classList.remove('copy-success');
                  }, 2000);
                })
                .catch(err => {
                  console.error('Failed to copy: ', err);
                });
            });

            // Add button to toolbar
            toolbar.appendChild(copyButton);

            // Add toolbar to code block container
            if (!preBlock.parentElement.classList.contains('code-toolbar')) {
              const wrapper = document.createElement('div');
              wrapper.className = 'code-toolbar';
              preBlock.parentNode.insertBefore(wrapper, preBlock);
              wrapper.appendChild(preBlock);
              wrapper.appendChild(toolbar);
            } else {
              preBlock.parentElement.appendChild(toolbar);
            }
          }
        });
      }
    }, 300); // Slightly longer delay to make sure everything is loaded
  });
})(); 