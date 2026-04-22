# Blog survey guidelines

Rules for writing and editing survey HTML under `blog/surveys/`.

## Punctuation

- Use as few em-dashes (`&mdash;` or `—`) and colons (`:`) as possible. Prefer periods, commas, and parentheses.
- Do not use em-dashes as substitutes for commas.

## Headings

- No colons in h1, h2, or h3. Do not prefix h1 with "Survey:".
- Keep headings short. Use noun phrases without trailing descriptive clauses.
- Match h2 section list and h3 subsection list to the organization of `survey/WRITE/knowledge_survey.md` in the corresponding `/media/run/Work/Research/alpha_review/output/<topic>/` folder. Do not add or remove top-level sections.

## Content length

- There is no ceiling on survey length. Do not truncate for brevity.

## Paper coverage

- Include every genuinely on-topic paper. In addition to the papers curated in `survey/WRITE/`, consult `review.db` (SQLite, `papers` table) in the same folder and add any candidates that are substantively relevant. Judgement calls are fine, do not add off-topic entries just to pad.
- Do not drop or reorder the top-level sections of `knowledge_survey.md`. Integrate additional papers into existing sections or subsections rather than creating new ones.

## HTML structure

- Use the structure defined in `blog/template.html`. Same head block, same body wrapper, same blog-post article, same `<script src>` references at the bottom.
- Do not write inline `<script>` blocks.
- Do not add RSS feeds, Open Graph metadata, Twitter cards, or any head metadata beyond what the template specifies.
- Do not add inline `style=""` attributes.
- Only use classes defined in `css/blog.css` and `css/references.css` (e.g. `blog-callout`, `blog-table`, `blog-table-wrapper`, `taxonomy-tree`, `taxonomy-root`, `taxonomy-branch`, `taxonomy-leaves`, `branch-id`, `branch-label`, `leaf-id`, `citation-section`, `references-section`, `references-header`, `references-list`, `blog-post`, `blog-section`, `blog-post-content`, `blog-post-header`, `blog-post-title`, `blog-post-date`, `back-button`).
