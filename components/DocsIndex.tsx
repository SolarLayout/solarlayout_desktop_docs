/**
 * DocsIndex — the company-level documentation index at `/docs` (#19), the way in for a reader who has not yet
 * picked a product; each product's app opens its own docs directly and skips it.
 *
 * Products in their order of weight: SolarLayout Desktop, then BESS Desktop (SolarLayout Rooftop joins with its
 * first pages). Each card is the way in for a first-time reader (Start here) and a returning one (Open the docs);
 * the What's-new row serves the returning reader. Same parts and tokens as the product landings.
 */
import Link from "next/link"
import { ArrowUpRight, Download, ExternalLink } from "lucide-react"
import { SolarLayoutLogo } from "@/components/SolarLayoutLogo"
import { SearchField } from "@/components/SearchField"

interface Product {
  name: string
  tags: string[]
  line: string
  docs: string
  start: { label: string; meta: string; href: string }[]
  action: { label: string; href: string }
}

const PRODUCTS: Product[] = [
  {
    name: "SolarLayout Desktop",
    tags: ["Windows"],
    line: "Utility-scale PV plant layout from a site boundary: tables, inverters, cabling, energy yield, single-line diagram, bill of materials and drawings.",
    docs: "/docs/solarlayout",
    start: [
      { label: "Install SolarLayout Desktop", meta: "5 min", href: "/docs/install/windows" },
      { label: "Prepare your boundary file", meta: "10 min", href: "/docs/inputs/kmz-requirements" },
      { label: "Your first layout", meta: "20 min", href: "/docs/first-layout" },
    ],
    action: { label: "Download", href: "https://solarlayout.app/downloads/solarlayout" },
  },
  {
    name: "BESS Desktop",
    tags: ["Windows"],
    line: "Battery storage and hybrid projects: sizing, 15-minute dispatch, compliance, the 25-year financial model, plant layout and single-line diagram.",
    docs: "/docs/bess",
    start: [
      { label: "Install BESS Desktop", meta: "5 min", href: "/docs/bess/install/windows" },
      { label: "Activate this device", meta: "2 min", href: "/docs/bess/access/activate" },
      { label: "Your first analysis", meta: "30 min", href: "/docs/bess/first-analysis" },
    ],
    action: { label: "Download", href: "https://solarlayout.app/downloads/bess" },
  },
  {
    name: "SolarLayout Rooftop",
    tags: ["Any browser"],
    line: "Rooftop PV design in the browser: the roof on the map, layout, shading, stringing, the 8,760-hour energy yield, the design report and drawings.",
    docs: "/docs/rooftop",
    start: [
      { label: "Getting started", meta: "5 min", href: "/docs/rooftop/getting-started" },
      { label: "The workspace", meta: "5 min", href: "/docs/rooftop/workspace" },
      { label: "Your designs and the project file", meta: "5 min", href: "/docs/rooftop/projects" },
    ],
    action: { label: "Open Rooftop", href: "https://rooftop.solarlayout.app" },
  },
]

const WHATS_NEW = [
  { product: "SolarLayout Desktop", what: "Release 2.1.0", when: "28 Sep 2026", href: "/docs/releases" },
  { product: "BESS Desktop", what: "Where updates are recorded", when: "", href: "/docs/bess/releases" },
  { product: "SolarLayout Rooftop", what: "Where updates are recorded", when: "", href: "/docs/rooftop/whats-new" },
]

// "A and B", "A, B and C": the products named in their order of weight.
function productNames() {
  const names = PRODUCTS.map((p) => p.name)
  return names.length < 2 ? names.join("") : `${names.slice(0, -1).join(", ")} and ${names.at(-1)}`
}

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-fd-muted-foreground">{children}</div>
  )
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-fd-border px-[7px] py-[1px] font-mono text-[10px] tracking-[0.06em] uppercase text-fd-muted-foreground">
      {children}
    </span>
  )
}

function Hero() {
  return (
    <div className="relative overflow-hidden">
      <SolarLayoutLogo
        aria-hidden="true"
        className="pointer-events-none absolute -right-[12%] -bottom-[70%] size-[480px] opacity-[0.07] dark:opacity-[0.15]"
      />
      <div className="relative">
        <div className="inline-flex items-center gap-[8px] font-mono text-[10px] tracking-[0.16em] uppercase text-fd-muted-foreground">
          <SolarLayoutLogo aria-hidden="true" className="size-[12px]" />
          <span>SolarLayout · Documentation</span>
        </div>
        <h1 className="mt-[14px] text-[28px] leading-[1.15] font-normal tracking-[-0.02em] text-fd-foreground">
          Guides and reference for <span className="font-semibold">every SolarLayout product.</span>
        </h1>
        <p className="mt-[14px] max-w-[640px] text-[14px] leading-[1.6] text-fd-muted-foreground">
          Walkthroughs, references and release notes for {productNames()}. Pick your product, or search them all.
        </p>
        <div className="mt-[24px] max-w-[560px]">
          <SearchField />
        </div>
      </div>
    </div>
  )
}

function ProductCard({ p }: { p: Product }) {
  return (
    <div className="flex flex-col gap-[14px] rounded-[12px] border border-fd-border bg-fd-card p-[20px]">
      <div>
        <div className="flex flex-wrap items-center gap-[8px]">
          <SolarLayoutLogo aria-hidden="true" className="size-[20px]" />
          <h2 className="text-[15px] font-semibold text-fd-foreground">{p.name}</h2>
          {p.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <p className="mt-[10px] text-[13px] leading-[1.6] text-fd-muted-foreground">{p.line}</p>
      </div>
      <div className="flex flex-1 flex-col gap-[14px]">
        <div>
          <Caption>Start here</Caption>
          <ul className="mt-[8px] flex flex-col">
            {p.start.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="group flex items-center justify-between gap-[12px] border-b border-fd-border py-[8px] text-[13px] text-fd-foreground transition-colors hover:text-fd-primary"
                >
                  <span>{s.label}</span>
                  <span className="shrink-0 text-[11px] text-fd-muted-foreground">{s.meta}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap items-center gap-x-[20px] gap-y-[8px]">
          <Link
            href={p.docs}
            className="inline-flex items-center gap-[6px] rounded-[8px] bg-fd-primary px-[14px] py-[7px] text-[13px] font-medium text-fd-primary-foreground transition-colors hover:opacity-90"
          >
            Open the docs
            <ArrowUpRight className="size-[14px]" aria-hidden />
          </Link>
          <a
            href={p.action.href}
            className="inline-flex items-center gap-[6px] text-[13px] text-fd-muted-foreground transition-colors hover:text-fd-foreground"
          >
            {p.action.label === "Download" ? <Download className="size-[14px]" aria-hidden /> : <ExternalLink className="size-[14px]" aria-hidden />}
            {p.action.label}
          </a>
        </div>
      </div>
    </div>
  )
}

function Products() {
  return (
    <section className="mt-[56px]">
      <Caption>Products</Caption>
      <div className="mt-[14px] grid grid-cols-1 gap-[16px] md:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((p) => (
          <ProductCard key={p.name} p={p} />
        ))}
      </div>
    </section>
  )
}

function WhatsNew() {
  return (
    <section className="mt-[56px]">
      <Caption>What&apos;s new</Caption>
      <div className="mt-[14px] grid grid-cols-1 gap-[12px] sm:grid-cols-2">
        {WHATS_NEW.map((w) => (
          <Link
            key={w.product}
            href={w.href}
            className="group flex flex-col gap-[4px] rounded-[10px] border border-fd-border bg-fd-card p-[14px] transition-colors hover:border-fd-foreground/30 hover:bg-fd-muted"
          >
            <span className="text-[11px] text-fd-muted-foreground">{w.product}</span>
            <span className="text-[13px] font-medium text-fd-foreground">{w.what}</span>
            {w.when && <span className="text-[11px] text-fd-muted-foreground">{w.when}</span>}
          </Link>
        ))}
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="mt-[64px] flex flex-wrap items-center justify-between gap-[16px] border-t border-fd-border pt-[24px] pb-[8px]">
      <div className="text-[12px] text-fd-muted-foreground">
        Can&apos;t find what you need?{" "}
        <a href="https://solarlayout.app/contact" className="text-fd-foreground underline-offset-2 hover:underline">
          Contact SolarLayout
        </a>
      </div>
      <div className="flex items-center gap-[16px]">
        <a
          href="https://solarlayout.app"
          className="inline-flex items-center gap-[4px] text-[12px] text-fd-muted-foreground transition-colors hover:text-fd-foreground"
        >
          solarlayout.app
          <ArrowUpRight className="size-[12px]" aria-hidden />
        </a>
      </div>
    </footer>
  )
}

export function DocsIndex() {
  return (
    <main className="mx-auto w-full max-w-[960px] px-[24px] py-[64px] md:px-[48px] md:py-[80px]">
      <Hero />
      <Products />
      <WhatsNew />
      <Footer />
    </main>
  )
}
