import { DocsLayout } from "fumadocs-ui/layouts/notebook"
import type { ReactNode } from "react"
import { bessBaseOptions } from "@/lib/layout.shared"
import { bessSource } from "@/lib/source"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout tree={bessSource.getPageTree()} {...bessBaseOptions}>
      {children}
    </DocsLayout>
  )
}
