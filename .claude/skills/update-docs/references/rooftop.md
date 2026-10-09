# SolarLayout Rooftop — product reference for `update-docs`

## Where things are

| What | Path |
|---|---|
| Fact sheet | `docs/PRODUCT_FACTS.rooftop.md`. Its header records the commit it was verified at ("Verified against `main` at `<sha>`"); `product-changes.mjs` reads it as the baseline. Each part ends with *Known-stale*, *Facts we do not have* and *Product issues noticed* |
| Citation check | `node scripts/check-rooftop-facts-citations.mjs` (`ROOFTOP_REPO=<path>` when the checkout is not `../rooftop-design-app`). It reads the sheet's short prefixes (`WEB`, `API`, `CORE`, `HELP`, then `docs/`, `plan/`, `infra/`, `apps/api/tests/`), ranges and lists. Like the BESS check, it proves the cited line exists, not that it still says the fact |
| Pages | `content/rooftop/**`, served at `/docs/rooftop/**` (nav: `content/rooftop/meta.json`, in the order of the approved tree) |
| What's new | `content/rooftop/whats-new.mdx`: one dated entry per update that changes what users meet, newest first, no version numbers |
| Screenshot manifest | `content/rooftop/screenshots.ts` → images under `public/screenshots/rooftop/…`; ids always `rooftop-`-prefixed |
| Product repository | `SolarLayout/rooftop-design-app`, normally `../rooftop-design-app`: the browser app `apps/web`, its in-app help `apps/web/content/help` (31 topics), the API `apps/api/src/rooftop_api`, the engine `apps/api/src/rooftop_core` |
| The app | https://rooftop.solarlayout.app (staging https://rooftop.staging.solarlayout.app) |
| Releases | None tagged: `main` is deployed by hand to staging and production. Ask the user which merges are live before a What's new entry says so |

## The reader and the tree

The reader is a rooftop installer, C&I solar EPC, design consultant or sales engineer: someone who knows rooftop PV, not
software. Read the writing guide's section "Writing for the SolarLayout Rooftop tree" before writing; its rules in short:

- **SolarLayout Rooftop**, then *Rooftop*. Never "Rooftop Desktop", a tool, the web version or the cloud product.
- A browser app on a phone, a tablet or a computer. The action is **Open Rooftop** (`rooftop.solarlayout.app`); it is
  *added to the home screen*, never installed or downloaded. Files the app makes are downloaded; the app is not.
- Access, said one way: "Free, no account needed. Your designs are kept on this device." Pages that touch access, saving
  or sharing say what follows: a design on one device is not on another; the `.rtd` project file carries it across.
- Where data goes is said in plain words, never as a technical inventory.
- *Rooftop solar* or *rooftop PV*, never a bare "rooftops". Never *bankable*.
- A Rooftop page never names, links or compares SolarLayout Desktop or BESS Desktop. "SolarLayout" alone, the company,
  is fine.

`check-pages.mjs --product rooftop` enforces the words it can (install, download the app, sign in, the wrong names,
bankable, the other products, links into their trees).

## The in-app help and the docs

The app's help topics (`apps/web/content/help/**.mdx`) are its own words, kept true by the product repo's
`docs/help-upkeep.md`. The docs go deeper (walkthroughs, the engineering, troubleshooting) and never contradict them; each
topic links to its page. When an audit finds a topic that disagrees with the code, it goes in the sheet's *Known-stale*
list and the user is told: the fix belongs in the product repo, in a pull request of its own.

A change to the help alone is a lead, not a fact: the code it describes is what the fact sheet cites.

## What counts as a product change

`product-changes.mjs --product rooftop` lists merges touching `apps/web/` and `apps/api/src/`. Most Rooftop pull requests
say in their description what the user meets and which help topics changed: use that as a lead to the areas to audit.
Skip changes to tests, tools, the check, the design boards and `plan/`.

## Screenshots: taken in a browser

Rooftop runs in the browser, so screenshots are taken with Playwright from the live app, never by hand:

1. Production (`rooftop.solarlayout.app`) for what is deployed. For merges not yet deployed, the product repo's test stack
   (`bun dev:bg --profile test` there; the web port is in `.dev/test/pids.json`), and say so in the PR.
2. Desktop 1440 × 900 at a device scale of 2 unless the page is about a phone or tablet layout; then 390 × 844 or
   834 × 1194, emulating touch.
3. Start from a clean browser profile. The standard design is the demo (**Open the demo** on Home). A state that needs
   another design is seeded into the browser's storage (database `rooftop`, store `designs`; the open design's id under
   the local-storage key `rooftop.open-design`), as the product repo's own capture scripts do.
4. Wait for the run to land (the vitals show numbers, nothing says "Updating") before capturing.
5. Write the manifest entry (`what`, `state`) so the frame can be taken again, and delete any image no entry references.

## Gates

```
node .claude/skills/update-docs/scripts/check-pages.mjs --product rooftop
node scripts/check-rooftop-facts-citations.mjs
bun run lint && bun run typecheck && bun run build
```

## Other products and trees

`content/docs/**` (SolarLayout Desktop) and `content/bess/**` (BESS Desktop) are out of scope for a Rooftop update: don't
touch them. The shared shell (the index at `/docs`, the product switcher, search) changes only when Rooftop's place in it
does.
