# Workflow

The files of a survey, the order of work, the HTML, the working notes and Git.

## Files

| Path | Contents |
| --- | --- |
| [`AGENTS.md`](../../AGENTS.md) | The entry point of the harness |
| [`CLAUDE.md`](../../CLAUDE.md) | The rules for every survey HTML of the blog. `CLAUDE.md` imports `AGENTS.md` |
| `docs/harness/` | The harness. General rules only, with no content of a particular survey (the user's rule, 2026-11-10) |
| `blog/surveys/<slug>.html` | One survey |
| `blog/template.html` | The structure every survey copies |

## Working notes

Each survey has working notes outside the repository. The notes hold the content of the
particular survey.

| Note | Contents | Rules |
| --- | --- | --- |
| Plan | The motivation, the question, the formulation, the sub-questions, the scope, the one-paragraph argument, the section list | [Problem](problem.md), [outline](outline.md) |
| Source index | Every source with status and read date, and every search | [Literature](literature.md#the-source-index) |
| Term list | The terms of the survey | [Terms](terms.md) |
| Group tables | The fixed facts of each work, the challenges with evidence, the gaps with searches, the map | [Solutions](solutions.md), [challenges](challenges.md), [other fields](other-fields.md) |

Location. For a topic with an alpha_review output folder, the notes go in the folder
(`/media/run/Work/Research/alpha_review/output/<topic>/`). Otherwise the notes go in the
session scratchpad, and the reply to the user gives the full path. TBD by the user, a permanent
place for notes of surveys without an alpha_review folder.

Never put notes, drafts or a draft review of the user into the repository (the user's rule).

## The order of work

1. Write the plan and confirm the motivation, the question, the scope and the title with the
   user.
2. Build the source index. Verify the sources of one section
   ([literature](literature.md#before-a-source-enters-the-survey)).
3. Run the searches for the gaps ([challenges](challenges.md#gaps)).
4. Update the notes with the changes from reading.
5. Plan the section, then write the section ([writing](writing.md)).
6. Run the [checks](writing.md#checks-before-an-edit-is-done).
7. Repeat for the next section. Work on one section at a time.

Change the notes first and the survey second, so the two agree.

## The HTML

[`CLAUDE.md`](../../CLAUDE.md) holds the rules. In short.

- Copy the head block, the body wrapper, the article and the script references of
  `blog/template.html`. Add no other head metadata.
- No inline `<script>` and no `style=""`.
- Use only the classes of `css/blog.css` and `css/references.css`.
- Tables go in `blog-table-wrapper` and `blog-table`. The question goes in a `blog-callout`.
  Display math goes in `math-block`.
- Cite as `[n]`, with the references in `references-list` in alphabetical order.

A published survey also needs an entry in `blog/index.html`, `sitemap.xml` and `llms.txt`.
Add the entries only on the user's request to publish. An entry in `blog/index.html` alone is
enough for the local preview.

## Git

- Commit directly on `main`, with no feature branch (the user's rule).
- Commit only on the user's request, and ask before every push.
- One change in each commit, with a message in the imperative mood in the style of the
  repository history, and the attribution line of the agent at the end.
- The repository is public, and GitHub Pages serves the repository. A pushed harness page is
  readable by anyone.
