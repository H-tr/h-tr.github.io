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

    // KaTeX font-size is controlled in blog.css (1.21em, matching LaTeX default)

  } else {
    console.warn("KaTeX auto-render function (renderMathInElement) not found. Skipping math rendering.");
  }
}); 