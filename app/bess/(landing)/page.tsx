/**
 * `/bess` index — a full-width landing surface (layout-free `(landing)` route
 * group), mirroring `/docs`. `/bess/<slug>` gets the DocsLayout chrome via the
 * sibling `(sidebar)` group.
 */
import { BessLanding } from "@/components/BessLanding"

export default function BessIndexPage() {
  return <BessLanding />
}
