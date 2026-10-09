# solarlayout_desktop_docs — Claude Code context

Product documentation site for SolarLayout's products: **SolarLayout Desktop**
(`content/docs/`, landing `/docs/solarlayout`) and **BESS Desktop**
(`content/bess/`, `/docs/bess`), with SolarLayout Rooftop (`/docs/rooftop`) to
come. `/docs` is the company-level index. Built with Next.js + Fumadocs;
content is MDX on disk.

## Before touching content

1. Read `docs/WRITING_GUIDE.md` — voice, structure, components, linking rules.
2. Read `docs/PRODUCT_FACTS.md` — **the only permitted factual source** for the
   desktop pages (`docs/PRODUCT_FACTS.bess.md` for BESS). If a number, label or
   behaviour is not there, verify it in the product repository
   (`PVlayout_Advance`: `apps/solarlayout-desktop/` and `packages/solar-core/`;
   `apps/bess-tool/` for BESS) and add it to the fact sheet with a `file:line`
   citation before writing it.
   For SolarLayout Rooftop pages (`/docs/rooftop`) the fact sheet is
   `docs/PRODUCT_FACTS.rooftop.md`, citing the `rooftop-design-app` repository.
3. Never repeat anything in `PRODUCT_FACTS.md` §18 (known-stale sources). The
   product's in-app F1 guide is one of them. Never describe a §20 product
   issue as behaviour.
4. Pages describe the product as it is. No change-log prose ("now", "no
   longer", "new", "previously"). History goes only on the release-notes page.

## Updating the docs after product changes — use the `update-docs` skill

This repo has a project skill for exactly this job:
**`/update-docs solarlayout`** or **`/update-docs bess`**
(`.claude/skills/update-docs/`; the human guide is
[`UPDATE_DOCS_USING_SKILL.md`](UPDATE_DOCS_USING_SKILL.md)). It finds what
merged in the product repo since the fact sheet was last verified, audits it
against the code, updates the fact sheet first, handles the screenshots,
writes and reviews the pages, runs the gates and opens a PR.

**Invoke the skill** whenever a request is about the docs catching up with
the product: "update / sync / refresh the docs", "document the new
<feature>", "the product shipped / fixed …", "bring the docs up to main",
"re-verify the fact sheet", "are the docs out of date?" (plan-only). Don't
improvise a partial version of the workflow. Its steps — fact sheet first,
audits against current code, screenshot capture, independent review — are
what keep these docs correct. If the product isn't clear from the request,
ask which one (SolarLayout Desktop or BESS Desktop); one product per run.

**Nudge instead of invoking** when the request looks like a product change
but is phrased as a page edit. For example, "change the default on the
Cables page to 0.5" or "add the new Earthing field to the page". Explain in
one or two sentences that product facts must come from the code through the
fact sheet, and offer `/update-docs <product>` scoped to that change. The
skill handles a single change without the full fan-out. If the user still
wants just the edit, verify the fact in the product code, add it to the fact
sheet with a citation, then edit the page.

**No skill needed** for edits that don't change product facts: wording,
typos, structure, links, styling, site code. Still follow
`docs/WRITING_GUIDE.md`, and run
`node .claude/skills/update-docs/scripts/check-pages.mjs --product <p>` before
the build.

## Screenshots are never pending

`content/screenshots.ts` is the SolarLayout manifest (`content/bess/screenshots.ts`
for BESS); every entry has its PNG under `public/screenshots/`, and
`bun run test:e2e` fails otherwise. SolarLayout images are recaptured with the
product repository's `tools/docs_site_shots.py` on Windows with a real display
(see the product's `CAPTURING_SCREENSHOTS.md` and the skill's
`references/solarlayout.md`) — never a desktop screen-grab, never the
maximised window. BESS images are captured by hand from
`docs/bess-screenshot-index.xlsx`. Delete stale files; do not leave an old
image behind a new id.

## Gates

```bash
bun run lint && bun run typecheck && bun run build   # CI runs these
BESS_REPO=../PVlayout_Advance bun run test:e2e        # run locally before a deploy
bun run screenshots:index                             # refresh docs/screenshot-index.xlsx (:bess for BESS)
```

Deployment is manual (`.github/workflows/deployment.yml`); pushing never deploys.
