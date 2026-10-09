import fs from "node:fs"
import path from "node:path"

// SolarLayout Rooftop's fact sheet cites the rooftop-design-app repository with short prefixes (the sheet's own table):
// WEB/lib/brand/brand.ts:7, CORE/demo.py:2,8,21-31, docs/deployment.md:11-13. Every cited file must exist and every cited
// line must fall inside it. Like the BESS check, it proves the place exists, not that the line still says the fact.
const PREFIX = {
  WEB: "apps/web",
  API: "apps/api/src/rooftop_api",
  CORE: "apps/api/src/rooftop_core",
  HELP: "apps/web/content/help",
}
const CITE = /\b(WEB|API|CORE|HELP|docs|plan|infra|apps\/api\/tests)\/([\w.\-/[\]()]+?\.[a-z]+):(\d[\d,\-–]*)/g
const FACTS = path.join(process.cwd(), "docs", "PRODUCT_FACTS.rooftop.md")
const REPO = process.env.ROOFTOP_REPO || path.join(process.cwd(), "..", "rooftop-design-app")
if (!fs.existsSync(path.join(REPO, "apps", "web"))) {
  console.error(`No rooftop-design-app checkout at ${REPO}. Set ROOFTOP_REPO to its path.`)
  process.exit(2)
}

const lineCounts = new Map()
function lines(rel) {
  if (!lineCounts.has(rel)) {
    const abs = path.join(REPO, rel)
    lineCounts.set(rel, fs.existsSync(abs) ? fs.readFileSync(abs, "utf8").split("\n").length : -1)
  }
  return lineCounts.get(rel)
}

const bad = []
let count = 0
fs.readFileSync(FACTS, "utf8").split("\n").forEach((line, i) => {
  for (const m of line.matchAll(CITE)) {
    const [, head, tail, spec] = m
    const rel = `${PREFIX[head] ?? head}/${tail}`
    const total = lines(rel)
    count += 1
    if (total === -1) {
      bad.push(`${FACTS}:${i + 1}  missing file: ${rel}`)
      continue
    }
    const numbers = spec.split(",").flatMap((part) => part.split(/[-–]/)).filter(Boolean).map(Number)
    const out = numbers.filter((n) => n < 1 || n > total)
    if (out.length) bad.push(`${FACTS}:${i + 1}  ${rel}:${out.join(",")} out of range (1..${total})`)
  }
})

if (bad.length) {
  console.error(`Dangling Rooftop fact citations:\n  ${bad.join("\n  ")}`)
  process.exit(1)
}
console.log(`All ${count} Rooftop fact citations resolve.`)
