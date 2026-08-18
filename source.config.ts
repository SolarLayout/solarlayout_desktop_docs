import { defineConfig, defineDocs } from "fumadocs-mdx/config"
import { metaSchema, pageSchema } from "fumadocs-core/source/schema"

// Explicit schemas — these surface the `body` (MDX component), `toc`,
// and `full` fields on `page.data` so the page handler can render
// without TS errors. Canonical pattern per the v16 create-fumadocs-app
// scaffold.
export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
})

export default defineConfig({
  mdxOptions: {
    // MDX options
  },
})
