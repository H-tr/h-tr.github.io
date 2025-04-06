/**
 * PrismJS Compatibility Script
 * 
 * This script converts existing code blocks with custom classes to Prism.js format
 */
document.addEventListener("DOMContentLoaded", function() {
  // Find all custom code sections
  const codeSections = document.querySelectorAll('.code-section');
  
  codeSections.forEach(section => {
    const header = section.querySelector('.code-header');
    const title = header ? header.querySelector('h3').textContent : '';
    const pre = section.querySelector('pre');
    
    if (pre) {
      // Create the content from the pre element
      const code = document.createElement('code');
      code.className = 'language-python'; // Default to Python, can be modified if needed
      
      // Add title as a comment at the top of the code if it exists
      if (title) {
        code.textContent = `# ${title}\n${pre.textContent}`;
      } else {
        code.textContent = pre.textContent;
      }
      
      // Clear pre and add the code element
      pre.textContent = '';
      pre.appendChild(code);
      
      // Remove the header as Prism will create its own toolbar
      if (header) {
        header.remove();
      }
    }
  });
  
  // Re-highlight all code blocks
  if (window.Prism) {
    Prism.highlightAll();
  }
}); 