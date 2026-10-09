import { DocsLayout } from "fumadocs-ui/layouts/notebook"
import type { ReactNode } from "react"
import { bessBaseOptions, productTabs } from "@/lib/layout.shared"
import { bessSource } from "@/lib/source"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={bessSource.getPageTree()}
      {...bessBaseOptions}
      tabs={productTabs("bess", bessSource.getPages().map((p) => p.url))}
    >
      {children}
    </DocsLayout>
  )
}
