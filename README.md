# [h-tr.github.io](https://h-tr.github.io)

Personal academic website of **Hu Tianrun**, PhD student at SoC, NUS. Plain HTML, CSS and JavaScript with no build step.

---

## Structure

```bash
├── index.html            # Home
├── publication/          # Publications
├── project/              # Projects
├── blog/
│   ├── index.html        # Post and Survey lists
│   ├── template.html     # Starting point for a new post or survey
│   ├── posts/
│   └── surveys/          # AI-generated literature surveys
├── teaching/             # Service
├── resume/               # Resume
├── css/
│   ├── theme.css         # Light and dark colors, icons, theme switch (every page)
│   ├── site.css          # Shell of the six section pages (type, nav, page transitions)
│   ├── <page>.css        # One per section page (home, publication, project, teaching, resume)
│   ├── blog.css          # Blog index, posts and surveys
│   ├── references.css    # Citations and reference lists
│   └── prism-custom.css  # Code blocks, loaded on demand
├── js/
│   ├── theme.js          # Saved theme before first paint, theme switch (every page)
│   ├── site.js           # Section pages (transitions, nav underline, visit count, lazy videos, blog tabs)
│   ├── blog.js           # Posts and surveys (contents, Prism and KaTeX on demand, lazy videos, page count)
│   ├── prism-init.js     # Syntax highlighting, loaded by blog.js
│   └── references.js     # Citation tooltips
├── media/
│   ├── icons.svg         # Icon sprite (Font Awesome Free)
│   └── ...               # Images, videos, documents
├── robots.txt
├── sitemap.xml
└── llms.txt              # Site summary for language models
```

A new post or survey starts from `blog/template.html`. Once it is published, list it in `blog/index.html` (and in the Blog JSON-LD in its head), `sitemap.xml` and `llms.txt`.

## Local Preview

```bash
python -m http.server 8000 --bind 127.0.0.1
```

Then open [http://127.0.0.1:8000](http://127.0.0.1:8000). Paths are root-absolute, so serve the repository root.
