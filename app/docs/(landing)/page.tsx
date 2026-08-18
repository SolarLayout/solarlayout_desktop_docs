/**
 * `/docs` index — a full-width landing surface, NOT the Fumadocs
 * auto-generated docs root.
 *
 * Sibling route group `(sidebar)` houses the MDX-rendered detail pages
 * under `/docs/<slug>` and gets the full `DocsLayout` chrome (sidebar +
 * TOC). This `(landing)` group is layout-free so the docs index gets a
 * hero treatment matching `/`. Both groups are URL-transparent
 * (parentheses don't appear in the path).
 */
import { DocsLanding } from "@/components/DocsLanding"

export default function DocsIndexPage() {
  return <DocsLanding />
}
