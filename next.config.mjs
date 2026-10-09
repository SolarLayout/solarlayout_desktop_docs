import { createMDX } from "fumadocs-mdx/next"

const withMDX = createMDX()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  /**
   * Asset prefix — required whenever this site is reachable through another
   * Next.js app's rewrite, and harmless when it is not.
   *
   * `solarlayout_web` rewrites `solarlayout.app/docs` → `DOCS_URL/docs`, and
   * `DOCS_URL` is the docs domain. With no prefix, the proxied HTML emits
   * RELATIVE asset paths (`/_next/static/...`), the browser resolves them
   * against `solarlayout.app`, and they land in solarlayout_web's own chunk
   * namespace — which 404s, leaving the page unstyled and unhydrated. Measured
   * 2026-08-18: apex 404, docs domain 200 for the same CSS file.
   *
   * Setting this to the ABSOLUTE docs origin makes the HTML emit absolute
   * asset URLs, so chunks and CSS load straight from this deployment however
   * the page was reached. Same fix, and the same reasoning, as `mvp_docs`.
   *
   * Set per Vercel environment (see README ▸ Deployment):
   *   Production  NEXT_PUBLIC_ASSET_PREFIX=https://docs.solarlayout.app
   *   Staging     NEXT_PUBLIC_ASSET_PREFIX=https://docs.staging.solarlayout.app
   *
   * Unset (local dev, or a deployment reached only by its own domain) leaves
   * the prefix off, which is correct for direct access. Next self-serves
   * assetPrefix paths, so setting it never breaks direct access either.
   *
   * Two asset classes are deliberately NOT prefixed and still resolve:
   *   - fonts, referenced from inside the CSS, resolve against the CSS file's
   *     own origin — the docs deployment;
   *   - screenshots, emitted as page-relative `<img src="/screenshots/…">`,
   *     rely on solarlayout_web's existing `/screenshots/:path*` rewrite.
   */
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || undefined,

  /**
   * Screenshots are wide, already-compressed PNGs of a desktop window, and
   * there are a lot of them. Serving them straight from /screenshots keeps
   * the deployment free of per-image optimisation cost and of Vercel's
   * image-transformation limits; the `<Screenshot>` component sizes them
   * with real intrinsic dimensions, so layout is stable without the
   * optimiser.
   */
  images: {
    unoptimized: true,
  },

  /**
   * The documentation index lives at `/docs`, where `solarlayout.app/docs` reaches it (#19). The docs domain's own
   * root sends readers there. Not permanent, so a browser never caches it past a later change.
   */
  async redirects() {
    return [{ source: "/", destination: "/docs", permanent: false }]
  },
}

export default withMDX(nextConfig)
