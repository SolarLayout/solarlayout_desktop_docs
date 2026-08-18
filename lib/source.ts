import { loader } from "fumadocs-core/source"
import { docs } from "collections/server"

/**
 * Source loader for the Fumadocs MDX content tree under `content/docs/`.
 * Used by app/docs to render pages and assemble the sidebar.
 */
export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
})
