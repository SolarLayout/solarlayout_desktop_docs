import { DocsLayout } from "fumadocs-ui/layouts/notebook"
import type { ReactNode } from "react"
import { rooftopBaseOptions, productTabs } from "@/lib/layout.shared"
import { rooftopSource } from "@/lib/source"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={rooftopSource.getPageTree()}
      {...rooftopBaseOptions}
      tabs={productTabs("rooftop", rooftopSource.getPages().map((p) => p.url))}
    >
      {children}
    </DocsLayout>
  )
}
