# Survey agent guide

This file is the entry point of the agent harness for writing surveys under `blog/surveys/`.
The harness says how to write any survey. The harness holds no content of a particular survey.
Later explicit user instructions take precedence. The rules below always apply. Each rule
links to a page in [`docs/harness/`](docs/harness/) with the details. Read the page before
working in the area of the page.

## Always

- A survey follows four parts in order (the user's rule, 2026-11-10). The scientific problem,
  the challenges and the gaps, the solutions in robotics, and the solutions of other fields for
  the same abstraction. See [outline](docs/harness/outline.md).
- State the scientific problem first. Say what the survey discusses and tries to understand,
  before any method. See [problem](docs/harness/problem.md).
- Motivate a survey by a need. Never motivate a survey by a new capability alone ("X can now
  do Y") (the user's rule, 2026-11-10). See [problem](docs/harness/problem.md#motivation).
- Give one formulation, and place every paper in the formulation. See
  [problem](docs/harness/problem.md#formulation).
- A challenge says why the question is hard, with evidence. A gap is a place without published
  work, with the search behind the claim. Keep challenges and gaps apart. See
  [challenges](docs/harness/challenges.md).
- Describe a robotics work by fixed facts, the same facts for every work, and close each group
  with the open part of the group. See [solutions](docs/harness/solutions.md).
- Bring in a work of another field only through the shared abstraction. Name the role in the
  formulation, the robot counterpart and the part without transfer. See
  [other fields](docs/harness/other-fields.md).
- Read the abstract page of a paper before writing about the paper. Record the reading in the
  source index of the survey. An unread source does not enter the survey. See
  [literature](docs/harness/literature.md).
- Every number has a source and a label. See [literature](docs/harness/literature.md#numbers).
- Report negative results and evidence against the thesis of the survey with the same weight
  as the support. See [challenges](docs/harness/challenges.md#conflicting-evidence).
- Use one term for one thing, from the term list of the survey. See
  [terms](docs/harness/terms.md).
- Write in English, with fluent prose and the argument first, few colons and no em dashes. See
  [writing](docs/harness/writing.md).
- Use as few pronouns as possible and repeat the noun. Write direct statements with a named
  subject and an active verb. No "we", and no sentence starting with "it" or "this" alone (the
  user's rule, 2026-11-10). See
  [pronouns and direct statements](docs/harness/writing.md#pronouns-and-direct-statements).
- The content of a particular survey (source index, term list, plan, reading notes) stays out
  of the harness and out of the repository. See [workflow](docs/harness/workflow.md).
- The survey HTML follows [`CLAUDE.md`](CLAUDE.md) and `blog/template.html`. Commit on `main`
  only on the user's request, and ask before a push. See [workflow](docs/harness/workflow.md).

## Where the details are

| Page | Contents | Read before |
| --- | --- | --- |
| [Problem](docs/harness/problem.md) | How to state the motivation, the question, the formulation, the sub-questions, the running example and the scope | Writing the first section, or placing a paper |
| [Challenges](docs/harness/challenges.md) | How to write a challenge with evidence, a gap with a search, and conflicting evidence | Writing the second section, or claiming an open problem |
| [Solutions](docs/harness/solutions.md) | How to group and describe the work in robotics | Writing the third section, or adding a robotics paper |
| [Other fields](docs/harness/other-fields.md) | How to find, describe and map the mechanisms of other fields | Writing the fourth section, or proposing a transfer |
| [Outline](docs/harness/outline.md) | The four sections, the role of each section, the rules for headings | Adding, moving or renaming a section |
| [Literature](docs/harness/literature.md) | Reading, verifying and searching sources, the source index, the rules for numbers | Any search, and any sentence about a paper |
| [Writing](docs/harness/writing.md) | Argument, pronouns, precision, punctuation, the checks before an edit is done | Writing any text |
| [Terms](docs/harness/terms.md) | How to keep the term list of a survey | Writing any text |
| [Workflow](docs/harness/workflow.md) | Files, the order of work, the HTML, the working notes outside the repository, Git | Creating or changing a file, committing, pushing |
