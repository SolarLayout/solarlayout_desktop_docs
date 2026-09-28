#!/usr/bin/env node
// List what changed in the product repo since the docs were last verified.
//
//   node .claude/skills/update-docs/scripts/product-changes.mjs \
//     --product solarlayout|bess [--repo ../PVlayout_Advance] [--since <commit|date>] [--fetch]
//
// Walks `main`'s first-parent history (merge commits and squash-merged
// commits alike), keeps the commits that touch the product's paths, and prints
// a Markdown table: commit, date, PR, title, files touched in the product
// paths, and which release tags already contain it. Without --since, the
// baseline is read from the fact sheet header ("… `main` at `abc1234`") and,
// failing that, from the date the fact sheet was last committed.
import { execFileSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"

const PRODUCTS = {
  solarlayout: {
    facts: "docs/PRODUCT_FACTS.md",
    paths: ["apps/solarlayout-desktop/", "packages/solar-core/", "packages/solar-ui/",
            "tools/docs_site_shots.py"],
    tagPrefix: "solarlayout-v",
  },
  bess: {
    facts: "docs/PRODUCT_FACTS.bess.md",
    paths: ["apps/bess-tool/"],
    tagPrefix: "bess-v",
  },
}

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, all) => {
    if (a.startsWith("--")) acc.push([a.slice(2), all[i + 1]?.startsWith("--") ? true : all[i + 1]])
    return acc
  }, []),
)
const product = PRODUCTS[args.product]
if (!product) {
  console.error("Usage: --product solarlayout|bess [--repo PATH] [--since COMMIT|YYYY-MM-DD] [--fetch]")
  process.exit(2)
}
const docsRoot = process.cwd()
const repo = path.resolve(args.repo || path.join(docsRoot, "..", "PVlayout_Advance"))
if (!fs.existsSync(path.join(repo, ".git"))) {
  console.error(`No git checkout at ${repo}. Pass --repo.`)
  process.exit(2)
}
const git = (...a) => execFileSync("git", a, { cwd: repo, encoding: "utf8", maxBuffer: 1 << 26 }).trim()
const docsGit = (...a) => execFileSync("git", a, { cwd: docsRoot, encoding: "utf8" }).trim()

// Baseline.
let since = typeof args.since === "string" ? args.since : null
let sinceWhy = "--since"
if (!since) {
  const head = fs.readFileSync(path.join(docsRoot, product.facts), "utf8").slice(0, 4000)
  const m = head.match(/`main`\s+at\s+`([0-9a-f]{7,40})`/)
  if (m) { since = m[1]; sinceWhy = `${product.facts} header` }
  else {
    // No verified commit recorded. The date of the sheet's LAST commit is a
    // trap: later commits may have touched only a few sections (BESS: access
    // wording on 2026-09-10/16, while the app itself was verified ~08-24). Use
    // the date the sheet was CREATED — listing too much beats missing changes —
    // and say so loudly.
    const created = docsGit("log", "--diff-filter=A", "--format=%cs", "--", product.facts).split("\n").pop()
    const last = docsGit("log", "-1", "--format=%cs", "--", product.facts)
    since = created
    sinceWhy = `the date ${product.facts} was created — its header records no verified commit`
    console.error(`WARNING: ${product.facts} has no "re-verified … against \`main\` at \`<sha>\`" line.\n` +
      `  Using its creation date ${created} (last edited ${last}). Check which sections were verified\n` +
      `  when, pass --since if you know better, and add the verified-at line in this update.`)
  }
}
const isDate = /^\d{4}-\d{2}-\d{2}$/.test(since)
const range = isDate ? ["--since", since, "origin/main"] : [`${since}..origin/main`]

// Fetching updates only remote-tracking refs and tags (never the working tree
// or a branch); it is opt-in so a read-only investigation can skip it.
if (args.fetch) {
  try { git("fetch", "-q", "origin", "main", "--tags") } catch { console.error("fetch failed; using local refs") }
}
const lines = git("log", "--first-parent", "--format=%H%x09%cs%x09%s", ...range).split("\n").filter(Boolean)

const rows = []
for (const line of lines) {
  const [sha, date, subject] = line.split("\t")
  const parents = git("rev-list", "--parents", "-n", "1", sha).split(" ").slice(1)
  const base = parents[0]
  if (!base) continue
  const files = git("diff", "--name-only", base, sha).split("\n").filter(Boolean)
  const hit = files.filter((f) => product.paths.some((p) => f.startsWith(p)))
  if (!hit.length) continue
  let pr = (subject.match(/#(\d+)/) || [])[1] || ""
  let title = subject
  if (/^Merge pull request #\d+/.test(subject)) {
    title = git("log", "-1", "--format=%b", sha).split("\n").find((l) => l.trim()) || subject
  }
  const tags = git("tag", "--contains", sha, "--list", `${product.tagPrefix}*`).split("\n").filter(Boolean)
  const docsOnly = hit.every((f) => /\.(md|txt)$/.test(f) || f.includes("/docs/"))
  rows.push({ sha: sha.slice(0, 7), date, pr, title, n: hit.length, tags, docsOnly })
}

console.log(`# ${args.product}: product changes since ${since} (${sinceWhy})\n`)
console.log(`Repo: ${repo} · origin/main at ${git("rev-parse", "--short", "origin/main")} · ` +
            `paths: ${product.paths.join(", ")}\n`)
if (!rows.length) { console.log("No product changes touch these paths. Nothing to update."); process.exit(0) }
console.log("| Commit | Date | PR | Title | Files | In tags |")
console.log("|---|---|---|---|---|---|")
for (const r of rows.reverse()) {
  const tag = r.tags.length ? r.tags[0] + (r.tags.length > 1 ? ` (+${r.tags.length - 1})` : "") : "**unreleased**"
  console.log(`| \`${r.sha}\` | ${r.date} | ${r.pr ? "#" + r.pr : "—"} | ${r.title.replace(/\|/g, "\\|")}` +
              `${r.docsOnly ? " _(docs/specs only)_" : ""} | ${r.n} | ${tag} |`)
}
const unreleased = rows.filter((r) => !r.tags.length).length
console.log(`\n${rows.length} change(s); ${unreleased} not in any ${product.tagPrefix}* tag yet.`)
