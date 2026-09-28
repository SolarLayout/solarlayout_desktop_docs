# Briefs for the agents an update fans out to

Copy a brief, fill the `<…>` slots, and hand it to a subagent. Write shared
briefs (page writer, reviewer) to a file in your scratch directory once and
point each agent at the file — it keeps every agent on identical rules and
keeps your own context small.

Every brief names the product (`<PRODUCT>` = SolarLayout Desktop or BESS
Desktop), the docs repo path, the product repo path, the fact-sheet file and
the content tree from the product reference file.

Contents: [Audit](#audit) · [Fact-sheet writer](#fact-sheet-writer) ·
[Page writer](#page-writer) · [Reviewer](#reviewer) ·
[Product issue](#product-issue)

---

## Audit

One per feature area (4–7 areas is typical; group related PRs), plus one
**sweep** agent whose area is "everything user-visible not assigned to the
others". Read-only. General-purpose agents, background, all launched in one
message.

```
You are doing a READ-ONLY factual audit of <PRODUCT> to feed its user
documentation. Do not modify any file in either repo.
Product repo: <PRODUCT_REPO> (main at <SHA>). Docs repo: <DOCS_REPO>; the
pages are <CONTENT_TREE>/**; the fact sheet is <FACTS_FILE> — read the
sections relevant to your topic so you know what is already recorded.

Your topic: <AREA>, merged as <PR list with merge SHAs>. The leads below come
from PR titles and an earlier pass — re-verify each against the CURRENT code;
do not trust PR descriptions:
<leads, if any>

Record from current main, exhaustively: how the feature is reached (menu
paths, buttons, enabled/disabled rules, tooltips); every label, default,
range, unit and option verbatim; every message, banner, status-bar and
dialog text verbatim (with placeholders); behaviour and formulas; what is
saved in the project file and what is not; interactions with other features
(does it mark results out of date? appear in exports/BOM/reports?). Use
`git show <sha> --stat` to find files, then read the current files for exact
strings and line numbers. Tests confirm behaviour. Where cheap and safe, run
the real code headless to confirm a claim, and say you did.

Then docs side: list every statement in the pages and the fact sheet that
your findings contradict or that needs extending, with file:line and the
corrected statement.

Write the report to <SCRATCH>/audit-<n>-<slug>.md and return it. Sections:
(a) facts — each with a product-repo-relative `path:line`, UI strings
verbatim; (b) stale docs statements; (c) product bugs/oddities — NOT to be
documented as behaviour, say how you verified each; (d) screenshot
suggestions — which states to capture and how to reach them (for
SolarLayout: the MainWindow methods/attributes a capture script would call).
Do not guess; say when you are unsure.
```

## Fact-sheet writer

One agent (or you), never several — the fact sheet is one file and parallel
edits collide.

```
Update <FACTS_FILE> in <DOCS_REPO> (branch <BRANCH>; do not commit, do not
switch branches; edit ONLY that file) from the audit reports in <SCRATCH>
(audit-*.md — read all of them in full). Read docs/WRITING_GUIDE.md and the
whole fact sheet first.

Rules: every new or changed fact carries a product-repo `path:line`; UI
strings verbatim; rewrite stale statements rather than leaving old and new;
add sub-numbered sections for new features (keep existing anchors); update
the header's re-verification line to "re-verified <date> against `main` at
`<SHA>`"; add new known-stale product strings to the stale-sources section;
add a "product issues noticed <date> — not behaviour to document" list from
the audits' (c) sections; record which release tag contains each change
(verify with `git tag --contains`). Keep the file's style (tables for fields,
⛔ for "do not document", ⚠️ for traps). Where two audits conflict, open the
code and decide; report what you decided.

Reply with: sections changed/added (new headings), conflicts resolved, facts
you were unsure of.
```

## Page writer

Write the shared brief once to `<SCRATCH>/PAGE-BRIEF.md`, then launch one
agent per disjoint file group ("Read and follow PAGE-BRIEF.md. Your files:
…"). Group by topic so each writer owns whole pages; you keep the release
notes and the screenshot manifest.

```
# Page-writer brief

Docs repo <DOCS_REPO>, branch <BRANCH> (do not switch, do not commit). Pages
are MDX under <CONTENT_TREE>/**.

Read first: CLAUDE.md; docs/WRITING_GUIDE.md (voice, structure, components,
linking — <CONTENT_TREE>/intro.mdx is the style example); <FACTS_FILE> — the
ONLY permitted factual source (read your topics in full, plus the
stale-sources, product-issues and release-mapping sections); the audit
reports in <SCRATCH> — section (b) is a checklist of stale lines in your
files. A fact missing from the fact sheet: confirm it read-only in the
product repo and report it with `path:line`, or leave
`{/* VERIFY: <question> */}` — sparingly.

Hard rules:
- No change-log prose. Pages describe the product as it is — never "now",
  "no longer", "new", "previously", "has been replaced". History lives only on
  the release-notes page, which you must not edit.
- Never name code identifiers, files, classes, PR or issue numbers, versions.
  Never mention the other product, tiers, GitHub, non-Windows platforms.
- Never describe a listed product issue as behaviour or build a workaround on
  it; state only the correct route.
- British spelling in prose; quote UI strings exactly (bold for things clicked
  or filled, ▸ for menu paths).
- In prose, never write a placeholder as {name} — MDX evaluates braces and the
  build fails. Write &lt;name&gt;.
- <Screenshot id> only with ids in <MANIFEST>; never edit the manifest or
  public/ — report wrong alt text instead. Ids you may use: <list new ids>.
- Every internal link must resolve to a page in a meta.json. New pages being
  written in parallel: <list>. Deep-link only to headings you checked.
- Only edit your assigned files; report problems elsewhere.
- Don't run build/lint/typecheck/e2e (others work in parallel). You may run
  `node .claude/skills/update-docs/scripts/check-pages.mjs --product <p>
  --files <your files>`.

Style: lead with what the thing is/does; tables for fields (Field | Default |
Range | What it does, in the application's order); <Steps> for procedures;
one or two <Callout> at most; close with a <Cards> block; frontmatter title
(short, sentence case) and description (< ~160 chars). New pages 120–400
lines.

Report: files changed/created with one line each; product-repo facts you used
that the fact sheet lacks (path:line); VERIFY left; wrong screenshot text;
problems in files you don't own.
```

## Reviewer

After the writers finish. Two or three agents over disjoint file sets that
together cover every changed page, plus the new release-notes entry
(report-only for that one). Reviewers have repeatedly found real errors in
the fact sheet itself — expect it, and verify their claims in code before
changing the sheet.

```
# Review brief

You are an independent fact-checking editor. Read docs/WRITING_GUIDE.md and
<SCRATCH>/PAGE-BRIEF.md (its rules apply). <FACTS_FILE> is the only
permitted source; read the sections for your pages plus the stale-sources,
product-issues and release-mapping sections.

For each assigned page, read the whole page (`git diff main -- <file>` shows
what changed) and check: every factual statement against the fact sheet (fix
it, or confirm in the product repo read-only and report path:line, or
soften to what is supported); stale claims the fact sheet now contradicts;
change-log prose; product issues described as behaviour; code identifiers,
versions, banned terms; links, anchors and screenshot ids (open the PNG if
the prose describes it); style.

Fix problems directly in your files only (minimal edits, keep line endings).
Do not edit the manifest, the fact sheet, the release notes or other files —
report those. Don't run build/lint/typecheck/e2e.

Report: per file, what you fixed; what you could not resolve; product facts
you confirmed that the fact sheet lacks or contradicts (path:line); problems
outside your list.
```

## Product issue

Only when the user asks to file the product issues. Group related findings
(one issue per feature area, not one per string). Reproduce each at runtime
where you can and say which were reproduced and which are from reading the
code. Body sections, in order:

```
## Background        — what the feature is, which PR/issue introduced it, where it was found
                       ("Found during the <date> docs audit (<docs PR>, fact sheet §<n>).
                       Line numbers are at main <sha>.")
## Reproduce         — numbered steps from launch ("Steps to confirm" when not run),
                       probe output in a code block, screenshots inline
## What happens / Expected
## Suggested fix path — numbered, concrete (function names, the check to add, the test to write)
```

Screenshots: capture the bug state from the real app (the same render-to-PNG
bootstrap as the capture tool), push them to an orphan branch
`issue-assets/<issue-number>` in the product repo (one commit, images at the
root — `git hash-object -w`, `git mktree`, `git commit-tree`, push the commit
to `refs/heads/issue-assets/<n>`; nothing touches the working tree), and
embed them as
`![name](https://github.com/<org>/<repo>/blob/issue-assets/<n>/<file>?raw=true)`.
Create the issue first to get its number, then push and edit the body. Link
the filed numbers back into the fact sheet's product-issues section.
