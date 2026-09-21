# SolarLayout Desktop docs revamp — 2026-09-21

**Why.** Between 2026-09-16 and 2026-09-20 the desktop application's interface was
rebuilt (product issues #156, #203, #210, #213): the one long input panel became
five stage tabs under a pinned Generate button; the plot toolbar, the on/off
switch block and the summary table under the plot became view tabs (Layout ·
Summary · Energy · BOM · SLD), a Layers popover and a plant-chip strip; every
dialog was rebuilt on one shell; the start-up window lost its four cards; the
report export became a Word document; a Cables card, an ICR-block DXF, a cable
schedule and an image export appeared; the Auto / Manual string-sizing prompt
became a Size… button. Almost every page and every desktop screenshot on the
docs site described the old interface.

**Method.** Three audits against the shipping code on `main` (input panel,
main window and dialogs, the docs pages themselves), then:

1. `docs/PRODUCT_FACTS.md` re-verified and rewritten where the interface
   changed (§2, §3, §4, §6–§17, §18, §19a). It remains the only permitted
   source for page content.
2. A new screenshot set captured from the real application with the same
   bootstrap as the product's `tools/ui_shots.py` / `tools/docs_screenshots.py`
   (window at 1400 × 900 logical pixels rendered at 2×, dialogs at their own
   size, modal dialogs rendered by patching `QDialog.exec_`), using the bundled
   sample site, a three-plot variant of it, and the supplied `Test.PAN` /
   `Test-S.OND` files. Every previous desktop screenshot was deleted; the BESS
   set was not touched.
3. `content/screenshots.ts` rewritten to the new set. Every entry has a file
   and every page's `<Screenshot id>` resolves, so no page renders a
   "Screenshot pending" placeholder. Images that cannot be produced from the
   application (the Microsoft Store listing, Google Earth, a CAD program, the
   Windows Start menu) are no longer promised; the prose describes them.
4. Pages rewritten or edited per the audit; two pages added for the new
   workspace (`workspace/main-window`, `workspace/views`), one for the Cables
   card (`inputs/cables`), and `exports/pdf-report` replaced by
   `exports/project-report`. A release entry records the rebuild.
5. Repo-level guides (`README.md`, `docs/WRITING_GUIDE.md`) and a `CLAUDE.md`
   brought in line, and a Playwright check added so a referenced screenshot
   without a file fails the suite.

**Not done here.** Screenshots of the Word report opened in Word (no Office on
the capture machine — the drawing pages are shown from the PDF with piles
instead, which reuses the same page builders); the product's in-app F1 guide,
which still describes parts of the old interface (a product change, filed
separately).
