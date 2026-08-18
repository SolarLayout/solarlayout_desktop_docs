import { createFromSource } from "fumadocs-core/search/server"
import { source } from "@/lib/source"

/**
 * Search backend for the Fumadocs search dialog (Ctrl/Cmd + K).
 *
 * Without this route the dialog still opens and accepts typing, but every
 * query returns nothing — a failure mode that looks like "search is bad"
 * rather than "search is missing", which is why the browser test asserts a
 * real result rather than just that the dialog appears.
 *
 * `createFromSource` builds the index from the same loader the pages render
 * from, so a new page is searchable as soon as it exists — no separate
 * indexing step to forget.
 *
 * This is the one dynamic route on an otherwise fully prerendered site. The
 * alternative — `staticGET` plus a client-side index — would keep the
 * deployment function-free, but the client preset for it is deprecated in
 * Fumadocs v16 and needs extra wiring on the provider. One function is the
 * cheaper trade.
 */
export const { GET } = createFromSource(source)
