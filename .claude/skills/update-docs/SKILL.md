---
name: update-docs
description: Bring this repo's product documentation up to date after product changes — SolarLayout Desktop (content/docs, docs/PRODUCT_FACTS.md), BESS Desktop (content/bess, docs/PRODUCT_FACTS.bess.md) or SolarLayout Rooftop (content/rooftop, docs/PRODUCT_FACTS.rooftop.md). Finds what merged in the product repo (PVlayout_Advance, or rooftop-design-app for Rooftop) since the fact sheet was last verified, audits it against the code, updates the fact sheet first, recaptures or re-briefs the screenshots, writes and revises pages, reviews them, runs the gates and opens a PR. Use it whenever someone asks to update, sync, refresh or re-verify the docs, document new product features or PRs, bring the docs up to product main, or says the product changed / shipped / fixed issues — even if they don't say "update-docs". Invoke as /update-docs solarlayout, /update-docs bess or /update-docs rooftop.
argument-hint: solarlayout | bess | rooftop
---

# Update the product docs after product changes

This repo documents three products from two product repos, normally sibling
checkouts: SolarLayout Desktop and BESS Desktop from `../PVlayout_Advance`,
SolarLayout Rooftop from `../rooftop-design-app`.

| Argument | Product | Read now |
|---|---|---|
| `solarlayout` | SolarLayout Desktop | [references/solarlayout.md](references/solarlayout.md) |
| `bess` | BESS Desktop | [references/bess.md](references/bess.md) |
| `rooftop` | SolarLayout Rooftop | [references/rooftop.md](references/rooftop.md) |

If the argument is missing and the request doesn't make the product obvious,
ask. Update one product per run and per PR — the trees ship on different
schedules and must never cross-reference each other.

The agent briefs this workflow fans out to are in
[references/briefs.md](references/briefs.md). Two scripts do the mechanical
parts: `scripts/product-changes.mjs` (what changed) and
`scripts/check-pages.mjs` (page rules). Run them from the docs repo root.

## The rules that make these docs trustworthy

Read `CLAUDE.md`, `docs/WRITING_GUIDE.md` and the product's fact sheet before
touching content. The rules below exist because readers are engineers who
act on the numbers — a wrong default or a stale label costs them a wrong
design.

- **The fact sheet is the only permitted source for pages.** Every fact in it
  cites the product code as `path:line`. Update the fact sheet first, then
  write pages from it. PR descriptions, READMEs, docstrings, tooltips and the
  in-app help are leads, not sources — they go stale, and the fact sheet's
  stale-sources section lists the known offenders.
- **Pages describe the product as it is.** No change-log prose ("now", "no
  longer", "new", "previously", "has been replaced"). History lives only on
  the release-notes page, and only as the product reference describes.
- **Product defects are not behaviour.** When an audit finds a bug, record it
  in the fact sheet's product-issues section, keep it out of the pages (state
  only the correct route), and tell the user.
- **Screenshots are never pending.** How images are made differs per product
  — see the product reference.
- **The product repo is read-only**, except for changes to the capture tool,
  which go on a product branch as their own product PR.
- **Nothing deploys.** The deliverable is a PR against `main` of this repo.
- **Decisions that are the user's stay the user's:** release labels and
  dates, whether the code or a tooltip is "right" when they disagree, whether
  to hold a PR for captures. Ask; don't guess.

## Workflow

### 0. Set up

- Read the product reference file.
- Pull the product repo's `main` (read-only). Create a docs branch
  `docs/<product>-update-<YYYY-MM-DD>` from an up-to-date `main`.
- Use your scratch directory for audit reports, briefs, captures and probe
  scripts — none of it belongs in either repo.

### 1. Find what changed

```
node .claude/skills/update-docs/scripts/product-changes.mjs --product <p> --fetch
```

It reads the baseline commit from the fact sheet header (or the date the
sheet was last committed), lists every first-parent commit on product `main`
since then that touches the product's paths, and shows which release tags
contain each. `--fetch` updates only remote-tracking refs and tags; drop it
for a strictly read-only look. Also take in anything the user names (PR or
issue numbers, "we fixed #322–#339"). Skip merges that are docs/specs only
or are not user-visible (tests, CI) once you have looked at them.

If nothing user-visible changed, say so and stop. When the user says
something was fixed or added but it isn't on product `main`, check the
issues, open PRs and branches (`gh issue view`, `gh pr list`), report what you
found, and ask where the change lives. Pages document `main` only, so a fix
that hasn't merged has nothing to document yet. If the change is small
(one or two PRs, a handful of pages), do the audit and writing yourself with
the same rules instead of fanning out.

### 2. Audit against the code

Group the changes into 4–7 feature areas and launch one read-only audit agent
per area, plus a sweep agent for everything user-visible the others don't
own — all in one message, in the background ([Audit brief](references/briefs.md#audit)).
Each writes `<scratch>/audit-<n>-<slug>.md` with (a) facts with citations,
(b) stale docs statements, (c) product bugs, (d) screenshot recipes.

Tell the user what's running while you wait, and use the time for work that
doesn't depend on the results. For SolarLayout, that is reading the capture
tool and planning its changes.

### 3. Update the fact sheet

One writer only ([Fact-sheet writer brief](references/briefs.md#fact-sheet-writer)),
because parallel edits to one file collide. When it finishes, spot-check the
new sections and resolve anything the audits disagreed on by reading the
code yourself. Commit the fact sheet on its own. Record:
- the re-verification line (`re-verified <date> against main at <sha>`);
- new stale product strings;
- product issues;
- which release contains what.

### 4. Screenshots

Follow the product reference. For SolarLayout: extend the capture tool on a
product branch, run the full capture on Windows, and verify frames at 100 %.
Then install them into `public/screenshots/` and update the manifest text,
and commit. For BESS: write precise capture briefs, regenerate the worklist,
and hand off to the user. For Rooftop: take them yourself with Playwright from
the live app (or the product's test stack for merges not yet deployed), as its
reference says, and look at every frame before it goes in.

### 5. Write and revise pages

- Write the shared [page-writer brief](references/briefs.md#page-writer) to
  your scratch directory.
- Split the work into disjoint file groups by topic. Each new page goes to
  the writer who owns its topic, together with its folder's `meta.json`.
- Launch one writer per group. You keep the release notes and the screenshot
  manifest, so no two agents ever edit the same file.

When writers report product facts they confirmed in code, add them to the
fact sheet. When they report wrong screenshot alt text, fix the manifest.

### 6. Review

Launch two or three [reviewers](references/briefs.md#reviewer) over disjoint
sets that together cover every changed page. They fix pages directly and
report fact-sheet errors — they have found real ones. Verify each claimed
fact-sheet error in the product code before correcting the sheet. Apply
their notes on the release entry yourself.

### 7. Gates

```
node .claude/skills/update-docs/scripts/check-pages.mjs --product <p>
bun run lint && bun run typecheck && bun run build
BESS_REPO=<product repo> bun run test:e2e
bun run screenshots:index            # or screenshots:index:bess
node scripts/check-rooftop-facts-citations.mjs   # Rooftop
```

The page checker fails on what breaks the build or a written rule:
unescaped `{placeholder}` braces, VERIFY/TODO left in, code identifiers,
banned terms, unknown screenshot ids, links to pages outside the nav. Its
warnings (change-log phrasing, anchors) need a human read — "columns no
longer line up" is geometry, not history. Also check the product's video
worklist for `say` lines the fact changes made stale.

### 8. Release notes

Per the product reference. Ask the user for the label, the date, and whether
the changes are released yet. Say only what the reader gets, and give changes
that alter results their own heading.

### 9. Commit and open the PR

Commit in logical steps:
1. the fact sheet;
2. the screenshots and manifest;
3. the release notes;
4. the pages;
5. any fact-sheet corrections from writing and review.

Push and open a PR. Its body covers:
- the fact-sheet changes;
- pages added and revised;
- screenshots replaced, added and deleted, with how they were captured;
- the gate results;
- a list of product issues for the owner, pointing at the fact sheet's
  product-issues section.

Offer to file the product issues. If the user says yes, follow the
[product-issue brief](references/briefs.md#product-issue).

## Traps seen before

- **MDX braces.** `*"Saved {path}"*` in prose compiles to a JavaScript
  expression and fails the build or prerender. Write `&lt;path&gt;`.
- **Audit leads go stale within days.** Re-verify every lead, including the
  ones in a resume prompt or an earlier audit.
- **Code reading misses runtime truth, both ways.** When a claim decides what
  a page says, run the real code headless where it is cheap. Probes have
  confirmed "probable" bugs and also refuted confident ones.
- **The fact sheet can be wrong too.** Reviewers found three wrong facts in
  one pass (which AC rating the plant capacity uses, CAD layer export, the
  SLD title block). Treat review findings about the sheet as leads and check
  them in the code.
- **Tooltips and docstrings are not facts.** Several stayed stale after the
  behaviour changed. When one contradicts the code, the code wins, the string
  goes in the stale-sources section, and the user decides which is intended.
- **A missing baseline hides most of the work.** If the fact sheet header has
  no "verified against `main` at `<sha>`" line, find out when the product
  sections were really checked. A later commit may have touched only one
  section. Always write the line this time.
- **A passing citation check isn't a correct citation.** The checks confirm
  that `file:line` exists, not that the line still says what the fact claims.
  When a cited file has grown, re-anchor every citation to it rather than
  trusting the check.
- **Commit messages are leads too.** One named the wrong tab for a new field.
- **Tag ≠ docs label.** The app shows `vX.Y.Z` from tag `…-vX.Y.Z.0`, but the
  release-notes labels are the owner's choice.
- **Screenshot state leaks.** A forced state (a busy banner, a status
  message) captured mid-phase shows up in every later frame. Capture it last
  and clear it.
- **One product per PR.** BESS PRs merged in the same window are a separate
  update.
