# Writing

The rules for every sentence of a survey and for replies to the user. A survey is in English.
The sources of the rules are the user's standing rules for the blog and
[`CLAUDE.md`](../../CLAUDE.md).

## The argument comes first

- Plan before writing. For each paragraph, fix the claim, the facts and the citations, and
  decide the one place of each fact in the survey.
- State the point of a paragraph in the first sentence. State the key idea of a section before
  the details.
- Papers support the argument and do not structure the argument. A paragraph walking through
  papers one by one has no claim.
- Connect sentences with real logic (because, so, but, while). Do not pack unrelated facts
  into one sentence, and do not write strings of choppy sentences.
- When the text announces a count, name every item.
- Every sentence adds information. Do not announce the next step of the text ("The table
  gives", "Three points follow").
- Use no analogy and no metaphor. Do not write about a mechanism without understanding the
  mechanism.
- Hold the length steady when deepening the content. A survey has no ceiling on length, and a
  longer text still says each thing once.
- Treat the user's review questions as checks on the text. Fix the substance, and do not
  answer the questions one by one in the survey.

## Pronouns and direct statements

The user's rule, 2026-11-10. The rule holds for the survey, the harness and replies.

- Use as few pronouns as possible. Repeat the noun. Wrong, "It cannot show that it asks for
  enough". Right, "A checker cannot show that the specification asks for enough".
- Do not write "we", "our" or "us". Name the actor, for example "the survey", "the search" or
  "the table".
- Do not start a sentence with "it", "they", "this" or "these" alone. Write "this check" or
  "these systems", or name the thing.
- Do not use "its" or "their" where the noun fits. Write "the planner of the system".
- Keep "that" and "which" only where a clause needs one. Prefer two statements to one sentence
  with a long relative clause.
- Use direct language. State each fact as a statement with a named subject, an active verb
  and an object. Wrong, "It turns out that there is no system that tests". Right, "No system
  tests".
- No hedging phrases, no rhetorical questions and no openings such as "it is worth noting",
  "there is" or "one can see". State weak evidence as a fact, for example "The number comes
  from one preprint".

## Precision

- Never use a strong word of the topic without the reference of the word. A survey on
  verification never writes "verified" or "safe" alone. The text says which object, against
  which specification, in which model.
- Keep the result of a method apart from the claim the reader may infer. "Accepted by the
  checker" is not "correct".
- When the text names a group of methods, the next sentence states the open part of the
  group, in concrete terms.
- Mark an inference of the survey as an inference.

## Writing about a paper

- Give the fixed facts of the section ([solutions](solutions.md#facts-for-each-work),
  [other fields](other-fields.md#describing-a-mechanism)).
- Label a number from a preprint, a workshop paper, a project page or a second-hand source
  ([literature](literature.md#numbers)).
- Say what each paper establishes and what each paper does not. No praise.

## Formal passages

State the tuple or the equation on a display line, then one short item for each symbol. Use
notation only where notation carries an argument. Do not restate a table in symbols.

## Punctuation and headings

- Use as few colons and em dashes as possible. Prefer periods, commas and parentheses. No em
  dash in place of a comma.
- No colon in h1, h2 or h3, and no "Survey" prefix in h1. Headings are short noun phrases.

## Checks before an edit is done

1. Each new sentence about a paper agrees with the abstract, and the index has the read date.
2. Each number has a source and a label.
3. No fact appears twice.
4. No pronoun remains where a noun fits, and no sentence starts with a bare "it" or "this".
5. Each strong word names a reference.
6. The sections match the [outline](outline.md).
7. The HTML follows [`CLAUDE.md`](../../CLAUDE.md) ([workflow](workflow.md#the-html)).
8. The length did not grow without new content.

## Replies to the user

Give the conclusion first, in plain English and the terms of the term list. Deliver review
notes and reading notes in the reply, not in a repository file.
