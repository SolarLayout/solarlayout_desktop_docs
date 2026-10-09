import { DocsLayout } from "fumadocs-ui/layouts/notebook"
import type { ReactNode } from "react"
import { solarlayoutBaseOptions, productTabs } from "@/lib/layout.shared"
import { source } from "@/lib/source"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      {...solarlayoutBaseOptions}
      tabs={productTabs("solarlayout", source.getPages().map((p) => p.url))}
    >
      {children}
    </DocsLayout>
  )
}
