import type { MDXComponents } from "mdx/types"
import defaultMdxComponents from "fumadocs-ui/mdx"
import { Callout } from "fumadocs-ui/components/callout"
import { Card, Cards } from "fumadocs-ui/components/card"
import { Step, Steps } from "fumadocs-ui/components/steps"
import { Tab, Tabs } from "fumadocs-ui/components/tabs"
import { Accordion, Accordions } from "fumadocs-ui/components/accordion"
import { Release } from "@/components/ui/release"
import { Screenshot } from "@/components/ui/screenshot"

/**
 * MDX components registry — surfaced to every `<MDX>` render so content
 * files can use `<Callout>`, `<Steps>`, `<Cards>`, `<Screenshot>` etc.
 * without importing them per file.
 */
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Accordion,
    Accordions,
    Callout,
    Card,
    Cards,
    Release,
    Screenshot,
    Step,
    Steps,
    Tab,
    Tabs,
    ...components,
  }
}
