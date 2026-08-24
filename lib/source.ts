import { loader } from "fumadocs-core/source"
import { docs, bess } from "collections/server"

/**
 * Source loader for the Fumadocs MDX content tree under `content/docs/`.
 * Used by app/docs to render pages and assemble the sidebar.
 */
export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
})

/** Source loader for the BESS Desktop content tree under `content/bess/`. */
export const bessSource = loader({
  baseUrl: "/bess",
  source: bess.toFumadocsSource(),
})
