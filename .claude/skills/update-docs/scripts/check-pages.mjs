#!/usr/bin/env node
// Fast rule check for one product's pages — run it before the build.
//
//   node .claude/skills/update-docs/scripts/check-pages.mjs --product solarlayout|bess|rooftop [--files a.mdx,b.mdx]
//
// ERRORS (exit 1): things that break the build or a written rule —
//   unescaped `{word}` in prose (MDX evaluates it: build/prerender fails),
//   VERIFY/TODO/TBD/FIXME left in, code identifiers or PR/issue numbers,
//   another product named, banned platforms/tiers/GitHub (and, for Rooftop, its
//   own banned words), a <Screenshot id>
//   missing from the manifest or its PNG missing, an internal link to a page
//   that is not in a meta.json.
// WARNINGS: change-log phrasing ("now", "no longer", …) — many hits are fine
//   (geometry, sequence); read each one — and #anchors whose heading slug
//   could not be found.
import fs from "node:fs"
import path from "node:path"

const root = process.cwd()
const args = Object.fromEntries(process.argv.slice(2).reduce((acc, a, i, all) => {
  if (a.startsWith("--")) acc.push([a.slice(2), all[i + 1]])
  return acc
}, []))
// Each tree stands alone (docs/WRITING_GUIDE.md, "Three products"): a page never names another product. "SolarLayout"
// alone is the supplier and is allowed everywhere.
const TREES = {
  solarlayout: {
    tree: "content/docs", base: "/docs", manifest: "content/screenshots.ts",
    other: /\bBESS\b|battery energy storage|SolarLayout Rooftop/i,
    releases: "content/docs/releases.mdx",
  },
  bess: {
    tree: "content/bess", base: "/docs/bess", manifest: "content/bess/screenshots.ts",
    other: /SolarLayout[ .]Desktop|SolarLayout (?:app|application)\b|SolarLayout Rooftop/,
    releases: "content/bess/releases.mdx",
  },
  rooftop: {
    tree: "content/rooftop", base: "/docs/rooftop", manifest: "content/rooftop/screenshots.ts",
    other: /SolarLayout[ .]Desktop|SolarLayout (?:app|application)\b|\bBESS\b/,
    releases: "content/rooftop/whats-new.mdx",
    // Rooftop is a browser app (the writing guide's Rooftop section): added to the home screen, never installed or
    // downloaded; named SolarLayout Rooftop, then Rooftop, never a desktop, web or cloud version or a tool.
    banned: /\binstall(?:s|ed|ing|ation)?\b|\bdownload (?:the app|the application|Rooftop|SolarLayout Rooftop)\b|Rooftop Desktop|\bweb version\b|\bcloud (?:product|version)\b|\brooftop tool\b|\bsign(?:-| )in\b|\bbankable\b/i,
  },
}
const P = TREES[args.product]
if (!P) { console.error("Usage: --product solarlayout|bess|rooftop [--files a.mdx,b.mdx]"); process.exit(2) }

const walk = (d) => !fs.existsSync(d) ? [] : fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? walk(path.join(d, e.name)) : e.name.endsWith(".mdx") ? [path.join(d, e.name)] : [])
const treeDir = path.join(root, P.tree)
// For solarlayout, content/docs does not contain the bess tree; for bess, only content/bess.
let files = walk(treeDir)
if (args.files) files = args.files.split(",").map((f) => path.resolve(root, f.trim()))
if (!files.length) { console.log(`No pages in ${P.tree} yet.`); process.exit(0) }

// Pages listed in meta.json files → the set of valid internal URLs.
function metaPages(dir, urlBase) {
  const out = new Set()
  const metaPath = path.join(dir, "meta.json")
  if (!fs.existsSync(metaPath)) return out
  const meta = JSON.parse(fs.readFileSync(metaPath, "utf8"))
  for (const p of meta.pages || []) {
    if (p.startsWith("---") || p.startsWith("[")) continue
    const sub = path.join(dir, p)
    if (fs.existsSync(sub) && fs.statSync(sub).isDirectory()) {
      if (fs.existsSync(path.join(sub, "index.mdx"))) out.add(`${urlBase}/${p}`)
      for (const u of metaPages(sub, `${urlBase}/${p}`)) out.add(u)
    } else if (fs.existsSync(sub + ".mdx")) {
      out.add(p === "index" ? urlBase : `${urlBase}/${p}`)
    }
  }
  if (fs.existsSync(path.join(dir, "index.mdx"))) out.add(urlBase)
  return out
}
const valid = metaPages(treeDir, P.base)
const otherTree = new Set(Object.entries(TREES).filter(([k]) => k !== args.product)
  .flatMap(([, t]) => [...metaPages(path.join(root, t.tree), t.base)]))

const manifestSrc = fs.readFileSync(path.join(root, P.manifest), "utf8")
const manifest = new Map()
for (const m of manifestSrc.matchAll(/id:\s*"([^"]+)",\s*file:\s*"([^"]+)"/g)) manifest.set(m[1], m[2])

const slug = (h) => h.toLowerCase().replace(/`/g, "").replace(/<[^>]+>/g, "")
  .replace(/[^\p{L}\p{N}\s_-]/gu, "").trim().replace(/\s/g, "-")
const headingsOf = new Map()
const headings = (file) => {
  if (!headingsOf.has(file)) {
    const src = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : ""
    const hs = new Set([...src.matchAll(/^#{2,6}\s+(.+?)\s*$/gm)].map((m) => slug(m[1])))
    for (const m of src.matchAll(/\bid="([^"]+)"/g)) hs.add(m[1])
    headingsOf.set(file, hs)
  }
  return headingsOf.get(file)
}
const urlToFile = (url) => {
  const rel = url.replace(/^\/docs\/bess/, "content/bess").replace(/^\/docs\/rooftop/, "content/rooftop")
    .replace(/^\/docs(?=\/|$)/, "content/docs")
  return [path.join(root, rel + ".mdx"), path.join(root, rel, "index.mdx")].find((f) => fs.existsSync(f))
}

const CHANGELOG = /\b(now reads|now shows|now has|now uses|is now|are now|no longer|previously|new in|has been (?:replaced|renamed|removed)|we changed|since version|in this release|was renamed|formerly|anymore)\b/i
const CODEISH = /\b[\w-]+\.py\b|\b_on_[a-z_]+|\bMainWindow\b|\bPR #\d+|\bissue #\d+|\b(?:self|params)\.[a-z_]+/
const BANNED = /\bGitHub\b|\bmacOS\b|\bLinux\b|Pro Plus|\bPro edition\b/
const errors = [], warns = []

for (const file of files) {
  const rel = path.relative(root, file).replace(/\\/g, "/")
  const isReleases = path.resolve(file) === path.resolve(root, P.releases)
  const src = fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n")
  let inFence = false, inFront = false
  src.split("\n").forEach((line, i) => {
    const at = `${rel}:${i + 1}`
    if (i === 0 && line === "---") { inFront = true; return }
    if (inFront) { if (line === "---") inFront = false; return }
    if (/^\s*```/.test(line)) { inFence = !inFence; return }
    if (inFence) return
    const prose = line.replace(/`[^`]*`/g, "``")                 // drop inline code
    const text = prose.replace(/\{\/\*.*?\*\/\}/g, "")            // drop MDX comments
    if (/^\s*(import|export)\s/.test(line)) return
    // An expression like {old} or {n} in prose — but not JSX attributes (={…}) or {/* */}.
    for (const m of text.matchAll(/(^|[^=\w])\{\s*([A-Za-z_][\w .]*)\s*\}/g)) {
      if (/^\s*</.test(text) && /=\{/.test(text)) continue
      errors.push(`${at}  unescaped {${m[2]}} — MDX evaluates it; write &lt;${m[2]}&gt;`)
    }
    if (/\b(VERIFY|TODO|TBD|FIXME|XXX)\b/.test(line)) errors.push(`${at}  leftover ${line.match(/\b(VERIFY|TODO|TBD|FIXME|XXX)\b/)[1]}`)
    if (CODEISH.test(prose)) errors.push(`${at}  code identifier / PR number: ${prose.match(CODEISH)[0]}`)
    if (BANNED.test(text)) errors.push(`${at}  banned term: ${text.match(BANNED)[0]}`)
    if (P.other.test(text.replace(/https?:\/\/\S+/g, ""))) errors.push(`${at}  names another product: ${text.match(P.other)[0]}`)
    if (P.banned?.test(text.replace(/https?:\/\/\S+/g, ""))) errors.push(`${at}  banned for this product: ${text.match(P.banned)[0]}`)
    if (!isReleases && CHANGELOG.test(text)) warns.push(`${at}  change-log phrasing? "${text.match(CHANGELOG)[0]}" — ${text.trim().slice(0, 110)}`)
    for (const m of line.matchAll(/<Screenshot\s+id="([^"]+)"/g)) {
      const f = manifest.get(m[1])
      if (!f) errors.push(`${at}  <Screenshot id="${m[1]}"> not in ${P.manifest}`)
      else if (!fs.existsSync(path.join(root, "public/screenshots", f))) errors.push(`${at}  ${m[1]}: public/screenshots/${f} missing`)
    }
    for (const m of line.matchAll(/\]\((\/docs[^)\s#]*)(#[^)\s]+)?\)|href="(\/docs[^"#]*)(#[^"]+)?"/g)) {
      const url = (m[1] || m[3]).replace(/\/$/, "")
      const hash = m[2] || m[4]
      if (!valid.has(url)) {
        if (otherTree.has(url)) errors.push(`${at}  links into another product's tree: ${url}`)
        else errors.push(`${at}  link to a page not in any meta.json: ${url}`)
        continue
      }
      if (hash) {
        const target = urlToFile(url)
        if (target && !headings(target).has(hash.slice(1))) warns.push(`${at}  anchor ${url}${hash} not found among headings`)
      }
    }
  })
  const front = (src.match(/^---\n([\s\S]*?)\n---/) || [])[1] || ""
  if (!/^title:\s*\S/m.test(front) || !/^description:\s*\S/m.test(front)) errors.push(`${rel}  frontmatter needs title and description`)
  if (!isReleases && !/<Cards>|## Where to go next/.test(src)) warns.push(`${rel}  no closing <Cards> block`)
}

for (const w of warns) console.log("warn  " + w)
for (const e of errors) console.log("ERROR " + e)
console.log(`\n${files.length} page(s): ${errors.length} error(s), ${warns.length} warning(s).`)
process.exit(errors.length ? 1 : 0)
