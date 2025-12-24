/**
 * Blog post enhancements
 */
document.addEventListener('DOMContentLoaded', function() {
  initTextTOC();
});

/**
 * Text-based TOC with progressive disclosure
 * H3 items only appear when their parent H2 section is active
 */
function initTextTOC() {
  const content = document.querySelector('.blog-post-content');
  if (!content) return;

  const headings = content.querySelectorAll('h2, h3');
  if (headings.length < 3) return;

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

    let text = heading.textContent.trim();
    if (text.length > 28) text = text.substring(0, 26) + '…';

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
      window.scrollTo({ top: heading.offsetTop - 100, behavior: 'smooth' });
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
      if (s.el.offsetTop <= pos) current = s;
    }

    // Find which H2 section we're in
    let activeH2 = null;
    for (const h2 of h2Sections) {
      if (h2.el.offsetTop <= pos) activeH2 = h2;
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