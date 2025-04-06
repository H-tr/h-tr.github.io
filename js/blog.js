/**
 * Blog post line spacing fix
 * This script applies proper line spacing to blog post content
 */
document.addEventListener('DOMContentLoaded', function() {
  // Fix paragraph line spacing
  document.querySelectorAll('.blog-post-content p').forEach(function(p) {
    p.style.lineHeight = '1.4';
  });
  
  // Fix list item line spacing
  document.querySelectorAll('.blog-post-content li').forEach(function(li) {
    li.style.lineHeight = '1.4';
  });
  
  // Fix math block line spacing
  document.querySelectorAll('.math-block').forEach(function(math) {
    math.style.lineHeight = '1.4';
  });
}); 