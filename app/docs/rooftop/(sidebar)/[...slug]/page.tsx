import { notFound } from "next/navigation"
import {
  DocsPage,
  DocsBody,
  DocsTitle,
  DocsDescription,
} from "fumadocs-ui/layouts/notebook/page"
import type { ComponentType } from "react"
import { rooftopSource } from "@/lib/source"
import { getMDXComponents } from "@/mdx-components"

interface Params {
  slug?: string[]
}

interface AugmentedPageData {
  title: string
  description?: string
  full?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toc: any
  body: ComponentType<{ components: unknown }>
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const page = rooftopSource.getPage(slug)
  if (!page) notFound()

  const data = page.data as unknown as AugmentedPageData
  const MDX = data.body

  return (
    <DocsPage toc={data.toc} full={data.full} tableOfContent={{ style: "clerk" }}>
      <DocsTitle>{data.title}</DocsTitle>
      <DocsDescription>{data.description}</DocsDescription>
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  )
}

export async function generateStaticParams() {
  return rooftopSource.generateParams()
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const page = rooftopSource.getPage(slug)
  if (!page) notFound()
  const data = page.data as unknown as AugmentedPageData
  return { title: data.title, description: data.description }
}
