/**
 * `/docs/bess` index — a full-width landing surface (layout-free `(landing)`
 * route group), mirroring `/docs`. `/docs/bess/<slug>` gets the DocsLayout
 * chrome via the sibling `(sidebar)` group.
 */
import { BessLanding } from "@/components/BessLanding"

// `absolute` bypasses the root layout's "%s · SolarLayout Desktop Docs"
// template — without it the BESS-level default is re-wrapped into
// "BESS Desktop Docs · SolarLayout Desktop Docs". Article pages under
// `(sidebar)` keep the "%s · BESS Desktop Docs" template from the sibling
// `app/docs/bess/layout.tsx`.
export const metadata = {
  title: { absolute: "BESS Desktop Docs" },
}

export default function BessIndexPage() {
  return <BessLanding />
}
