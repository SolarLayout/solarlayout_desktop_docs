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
   * root sends readers there. Not permanent, so a browser never caches it past a later change. Rooftop's page "The
   * workspace" became "The five steps" when the app was rebuilt around its steps (V2, 2026-10-13), and Rooftop's pages
   * moved into the sidebar's folders the same day: each old address goes to the page's new one.
   */
  async redirects() {
    return [
      { source: "/", destination: "/docs", permanent: false },
      { source: "/docs/rooftop/workspace", destination: "/docs/rooftop/start/steps", permanent: true },
      { source: "/docs/rooftop/intro", destination: "/docs/rooftop/start/intro", permanent: true },
      { source: "/docs/rooftop/getting-started", destination: "/docs/rooftop/start/getting-started", permanent: true },
      { source: "/docs/rooftop/first-design", destination: "/docs/rooftop/start/first-design", permanent: true },
      { source: "/docs/rooftop/steps", destination: "/docs/rooftop/start/steps", permanent: true },
      { source: "/docs/rooftop/find", destination: "/docs/rooftop/roof/find", permanent: true },
      { source: "/docs/rooftop/array", destination: "/docs/rooftop/steps/array", permanent: true },
      { source: "/docs/rooftop/sun", destination: "/docs/rooftop/steps/sun", permanent: true },
      { source: "/docs/rooftop/strings", destination: "/docs/rooftop/steps/strings", permanent: true },
      { source: "/docs/rooftop/performance", destination: "/docs/rooftop/steps/performance", permanent: true },
      { source: "/docs/rooftop/handover", destination: "/docs/rooftop/steps/handover", permanent: true },
      { source: "/docs/rooftop/present", destination: "/docs/rooftop/show/present", permanent: true },
      { source: "/docs/rooftop/projects", destination: "/docs/rooftop/show/projects", permanent: true },
      { source: "/docs/rooftop/troubleshooting", destination: "/docs/rooftop/reference/troubleshooting", permanent: true },
      { source: "/docs/rooftop/whats-new", destination: "/docs/rooftop/reference/whats-new", permanent: true },
      { source: "/docs/rooftop/support", destination: "/docs/rooftop/reference/support", permanent: true },
    ]
  },
}

export default withMDX(nextConfig)
