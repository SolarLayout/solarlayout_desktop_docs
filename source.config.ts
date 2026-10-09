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

export const bess = defineDocs({
  dir: "content/bess",
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
    // Search indexes text only: headings, paragraphs, quotes and table cells, wherever they sit (inside a Callout
    // or a Step too). Fumadocs' default also turns a self-closing component such as <Card title href description />
    // into a block of its raw attributes, which showed in results as "card title: … href: …" (#19).
    remarkStructureOptions: { types: ["heading", "paragraph", "blockquote", "tableCell"] },
  },
})
