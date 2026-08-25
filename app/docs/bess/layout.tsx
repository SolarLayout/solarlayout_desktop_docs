import type { ReactNode } from "react"

/**
 * Metadata-only layer over the whole `/docs/bess` subtree (both the
 * `(landing)` and `(sidebar)` route groups). It renders nothing of its own —
 * it exists so BESS pages are title-branded BESS rather than inheriting the
 * site-wide "SolarLayout Desktop Docs" default/template from the root layout:
 *
 *   - `/docs/bess` (landing, no own title)      → "BESS Desktop Docs"
 *   - `/docs/bess/<slug>` (title: "Simulate")   → "Simulate · BESS Desktop Docs"
 *
 * The sibling `(sidebar)` layout sets no title metadata, so this is the
 * nearest ancestor `default`/`template` for every BESS page.
 */
export const metadata = {
  title: {
    default: "BESS Desktop Docs",
    template: "%s · BESS Desktop Docs",
  },
  description:
    "Documentation for BESS Desktop — the Windows application for hybrid renewable-energy and battery-storage sizing, dispatch simulation, the financial model, and plant layout and single-line diagrams.",
}

export default function BessDocsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
