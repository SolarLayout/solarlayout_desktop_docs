import { createMDX } from "fumadocs-mdx/next"

const withMDX = createMDX()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  /**
   * Standalone deployment — this site is served from its own domain, NOT
   * proxied through another Next.js app. So no `assetPrefix` (which the
   * sibling `mvp_docs` app needs because it is a multi-zone behind
   * solarlayout.app/docs). Chunks and CSS load from this deployment's own
   * origin.
   */

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
}

export default withMDX(nextConfig)
