import { createSearchAPI } from "fumadocs-core/search/server"
import { source, bessSource } from "@/lib/source"

/**
 * Search backend for the Fumadocs search dialog (Ctrl/Cmd + K).
 *
 * Without this route the dialog still opens and accepts typing, but every
 * query returns nothing — a failure mode that looks like "search is bad"
 * rather than "search is missing", which is why the browser tests assert a
 * real result rather than just that the dialog appears.
 *
 * The search dialog is global (one `RootProvider`), so a query typed from
 * either `/docs` or `/docs/bess` must be able to find pages in both trees. One
 * `"advanced"` index spans both loaders' pages; each entry carries its own
 * absolute `url`, so a hit navigates to the right product regardless of
 * which tree it came from.
 *
 * This is the one dynamic route on an otherwise fully prerendered site. The
 * alternative — `staticGET` plus a client-side index — would keep the
 * deployment function-free, but the client preset for it is deprecated in
 * Fumadocs v16 and needs extra wiring on the provider. One function is the
 * cheaper trade.
 */
type Loader = typeof source

// Each entry is tagged with its product (the dialog's filter) and carries the product's name as its breadcrumb (the
// label on every result), #19.
const toIndexes = (loader: Loader, tag: string, product: string) =>
  loader.getPages().map((page) => ({
    id: page.url,
    url: page.url,
    title: page.data.title,
    description: page.data.description,
    tag,
    breadcrumbs: [product],
    // structuredData is emitted by fumadocs-mdx for search; it is what the
    // single-source createFromSource used under the hood.
    structuredData: (page.data as { structuredData?: unknown }).structuredData,
  }))

export const { GET } = createSearchAPI("advanced", {
  indexes: [...toIndexes(source, "solarlayout", "SolarLayout Desktop"), ...toIndexes(bessSource, "bess", "BESS Desktop")] as never,
})
