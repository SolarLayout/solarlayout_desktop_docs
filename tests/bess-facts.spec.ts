import { test, expect } from "@playwright/test"
import { execFileSync } from "node:child_process"

test("every BESS fact-sheet citation resolves to a real file:line", () => {
  let out = ""
  try {
    out = execFileSync("node", ["scripts/check-bess-facts-citations.mjs"], {
      encoding: "utf8",
      env: { ...process.env },
    })
  } catch (e) {
    throw new Error((e as { stderr?: string }).stderr || String(e))
  }
  expect(out).toContain("All BESS fact citations resolve.")
})
