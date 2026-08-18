import { defineConfig, devices } from "@playwright/test"

const PORT = 3007
const LOCAL_URL = `http://127.0.0.1:${PORT}`

/**
 * Point the suite at an already-deployed site with
 * `E2E_BASE_URL=https://… bun run test:e2e`.
 *
 * Worth having rather than trusting a local build as a proxy: a deployment can
 * fail in ways a local `next start` cannot — a missing function, a rewrite, a
 * font or image that 404s from a different origin. Verifying the artefact that
 * customers will actually load is the point.
 *
 * Note the filesystem-backed checks (page enumeration, the placeholder brief,
 * link and manifest validation) still read the local content tree, so run this
 * from the same commit that was deployed or they will disagree with the site.
 */
const EXTERNAL_URL = process.env.E2E_BASE_URL
const BASE_URL = EXTERNAL_URL ?? LOCAL_URL

/**
 * Browser tests run against a REAL production build, not the dev server.
 *
 * That matters here: `<Screenshot>` reads the filesystem at build time to
 * decide between an image and a placeholder, and pages are statically
 * generated. A dev-server run would exercise a different code path from the
 * one that ships, so `webServer` builds and serves instead.
 *
 * Deliberately not in CI — CI is build-only, and this needs a browser
 * download plus a full build. Run it locally before a deployment.
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["list"], ["html", { open: "never" }]],

  use: {
    baseURL: BASE_URL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },
  ],

  // Skipped entirely when testing a deployment — there is nothing to serve.
  webServer: EXTERNAL_URL
    ? undefined
    : {
        command: "bun run build && bun run start",
        url: LOCAL_URL,
        reuseExistingServer: !process.env.CI,
        // A cold Next build of ~60 static pages takes a while on a laptop.
        timeout: 240_000,
        stdout: "pipe",
        stderr: "pipe",
      },
})
