import type { BaseLayoutProps, LayoutTab } from "fumadocs-ui/layouts/shared"
import { SolarLayoutLogo } from "@/components/SolarLayoutLogo"
import { BessLogo } from "@/components/BessLogo"

/**
 * Shared layout config — surfaced in both the docs sidebar header and
 * the top navbar on the landing page. One source of truth for the
 * brand mark + the cross-surface nav links.
 */
export const solarlayoutBaseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <span className="inline-flex items-center gap-[8px] font-medium">
        <SolarLayoutLogo className="size-[18px]" />
        <span>SolarLayout Desktop Docs</span>
      </span>
    ),
    url: "/docs/solarlayout",
  },
  links: [
    { text: "Docs", url: "/docs/solarlayout" },
    { text: "Install", url: "/docs/install/windows" },
    { text: "Release notes", url: "/docs/releases" },
  ],
}

export const bessBaseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <span className="inline-flex items-center gap-[8px] font-medium">
        <BessLogo className="size-[18px]" />
        <span>BESS Desktop Docs</span>
      </span>
    ),
    url: "/docs/bess",
  },
  links: [
    { text: "Docs", url: "/docs/bess" },
    { text: "Install", url: "/docs/bess/install/windows" },
    { text: "Release notes", url: "/docs/bess/releases" },
  ],
}

export const rooftopBaseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <span className="inline-flex items-center gap-[8px] font-medium">
        <SolarLayoutLogo className="size-[18px]" />
        <span>SolarLayout Rooftop Docs</span>
      </span>
    ),
    url: "/docs/rooftop",
  },
  links: [
    { text: "Docs", url: "/docs/rooftop" },
    { text: "What's new", url: "/docs/rooftop/whats-new" },
    { text: "Open Rooftop", url: "https://rooftop.solarlayout.app", external: true },
  ],
}

type Product = "solarlayout" | "bess" | "rooftop"

const PRODUCTS: { id: Product; title: string; line: string; url: string }[] = [
  { id: "solarlayout", title: "SolarLayout Desktop", line: "Utility-scale PV plant layout", url: "/docs/solarlayout" },
  { id: "bess", title: "BESS Desktop", line: "Battery storage and hybrid projects", url: "/docs/bess" },
  { id: "rooftop", title: "SolarLayout Rooftop", line: "Rooftop PV design in the browser", url: "/docs/rooftop" },
]

/**
 * The product switcher at the top of every sidebar: the three products in order of weight, the one being read
 * marked (its pages' URLs, since SolarLayout Desktop's pages sit at /docs/<page>), and All products back to the index.
 */
export function productTabs(current: Product, pages: string[]): LayoutTab[] {
  const tabs: LayoutTab[] = PRODUCTS.map((p) => ({
    title: p.title,
    description: p.line,
    url: p.url,
    icon: <SolarLayoutLogo className="size-full" />,
    urls: p.id === current ? new Set([p.url, ...pages]) : new Set([p.url]),
  }))
  return [...tabs, { title: "All products", description: "The index of the three", url: "/docs", urls: new Set(["/docs"]) }]
}
