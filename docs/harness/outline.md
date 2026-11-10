# Outline

Every survey has four sections in the same order (the user's rule, 2026-11-10).

| Section | Role | Harness page |
| --- | --- | --- |
| 1. The scientific problem | What the survey discusses and tries to understand. Motivation, question, formulation, running example | [Problem](problem.md) |
| 2. Challenges and gaps | Why the question is hard, and where the literature is empty | [Challenges](challenges.md) |
| 3. Solutions in robotics | How people in robotics address the problem | [Solutions](solutions.md) |
| 4. Other fields | How other fields solve similar problems with the same abstraction and formulation | [Other fields](other-fields.md) |

The Citation and References blocks follow, as `blog/template.html` defines.

## Rules

- Do not add, drop or reorder the four sections without the user's word. A closing outlook
  section needs the user's word.
- Write the argument of the whole survey in one paragraph before writing any section. Keep the
  paragraph in the working notes.
- Each section opens with a claim. Papers support the claim and do not set the order of the
  text.
- Section 1 names no method before the formulation is complete, except the running example.
- Section 2 uses evidence from any field. Sections 3 and 4 describe the fields.
- A fact appears once in the whole survey.

## Headings

- h2 titles are short noun phrases fitted to the topic, numbered 1 to 4.
- h3 titles are short noun phrases. No colon in any heading, and no "Survey" prefix in h1
  ([`CLAUDE.md`](../../CLAUDE.md)).
- The h1 title comes from the user.

## Relation to `CLAUDE.md`

`CLAUDE.md` takes the section list of a survey from `survey/WRITE/knowledge_survey.md` of the
alpha_review output folder. TBD by the user. Which rule holds for a survey with such a folder,
the four-part order of the harness or the section list of `knowledge_survey.md`.
