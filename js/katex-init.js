document.addEventListener('DOMContentLoaded', function () {
  // Check if KaTeX and auto-render are available
  if (typeof renderMathInElement === 'function') {
    renderMathInElement(document.body, {
      delimiters: [
        { left: "$", right: "$", display: true },        // Block math using $$...$$
        { left: "\\[", right: "\\]", display: true },    // Block math using \[...\]
        { left: "\\(", right: "\\)", display: false },   // Inline math using \(...\)
        { left: "$", right: "$", display: false }         // Inline math using $...$
      ],
      throwOnError: false, // Don't stop rendering on errors
    });

    // Simple fix to make KaTeX math size match surrounding text size
    // Check if the style already exists to avoid duplicates
    if (!document.getElementById('katex-font-size-fix')) {
        const style = document.createElement('style');
        style.id = 'katex-font-size-fix';
        style.textContent = '.katex { font-size: 1em; }';
        document.head.appendChild(style);
    }

  } else {
    console.warn("KaTeX auto-render function (renderMathInElement) not found. Skipping math rendering.");
  }
}); 