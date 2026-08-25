import fs from "node:fs"
import path from "node:path"

// Citations look like: apps/bess-tool/bess_tool/seci_bess_gui.py:1234
const CITE = /\bapps\/bess-tool\/[\w./-]+\.py:(\d+)\b/g
const FACTS = path.join(process.cwd(), "docs", "PRODUCT_FACTS.bess.md")
const REPO = process.env.BESS_REPO
if (!REPO) {
  console.error("Set BESS_REPO to the PVlayout_Advance checkout path.")
  process.exit(2)
}

const lineCounts = new Map()
function lines(rel) {
  if (lineCounts.has(rel)) return lineCounts.get(rel)
  const abs = path.join(REPO, rel)
  const n = fs.existsSync(abs) ? fs.readFileSync(abs, "utf8").split("\n").length : -1
  lineCounts.set(rel, n)
  return n
}

const src = fs.readFileSync(FACTS, "utf8")
const bad = []
src.split("\n").forEach((line, i) => {
  for (const m of line.matchAll(CITE)) {
    const rel = m[0].split(":")[0]
    const ln = Number(m[1])
    const total = lines(rel)
    if (total === -1) bad.push(`${FACTS}:${i + 1}  missing file: ${rel}`)
    else if (ln < 1 || ln > total) bad.push(`${FACTS}:${i + 1}  ${rel}:${ln} out of range (1..${total})`)
  }
})

if (bad.length) {
  console.error(`Dangling BESS fact citations:\n  ${bad.join("\n  ")}`)
  process.exit(1)
}
console.log("All BESS fact citations resolve.")
