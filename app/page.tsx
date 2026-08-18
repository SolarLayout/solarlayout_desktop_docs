/**
 * Root `/` — delegates to the shared `DocsLanding` component, which also
 * renders at `/docs` via the `(landing)` route group, so both entry
 * points show the same index.
 */
import { DocsLanding } from "@/components/DocsLanding"

export default function HomePage() {
  return <DocsLanding />
}
