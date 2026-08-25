/**
 * BessLanding — the BESS Desktop docs landing surface, rendered at `/bess`.
 * The BESS index lives in a Next.js route group `(landing)` so the
 * Fumadocs `DocsLayout` (sidebar + table of contents) does NOT wrap it —
 * only `/bess/<slug>` gets that chrome.
 *
 * Mirrors `DocsLanding`'s compositional language (hero + "Start here" row +
 * topic grid + footer), swapped to the BESS mark and BESS content tree.
 * All colour flows through the Fumadocs theme tokens (`--color-fd-*`), so
 * light and dark both work with no per-component branching.
 */
import Link from "next/link"
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Boxes,
  Download,
  FileDown,
  KeyRound,
  Landmark,
  Layers,
  LifeBuoy,
  Rocket,
  SlidersHorizontal,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react"
import { BessLogo } from "@/components/BessLogo"

interface HighlightCard {
  icon: LucideIcon
  title: string
  meta: string
  href: string
}

const HIGHLIGHTS: HighlightCard[] = [
  {
    icon: Download,
    title: "Install BESS Desktop",
    meta: "5 min",
    href: "/bess/install/windows",
  },
  {
    icon: KeyRound,
    title: "Activate this device",
    meta: "2 min",
    href: "/bess/access/activate",
  },
  {
    icon: Sparkles,
    title: "Your first analysis",
    meta: "30 min walkthrough",
    href: "/bess/first-analysis",
  },
]

interface TopicSection {
  icon: LucideIcon
  category: string
  links: { label: string; href: string }[]
}

const TOPICS: TopicSection[] = [
  {
    icon: Rocket,
    category: "Onboarding",
    links: [
      { label: "What BESS Desktop does", href: "/bess/intro" },
      { label: "How access works", href: "/bess/access/overview" },
      { label: "Getting started", href: "/bess/getting-started" },
      { label: "Choosing a project type", href: "/bess/project-types" },
    ],
  },
  {
    icon: SlidersHorizontal,
    category: "Inputs",
    links: [
      { label: "Capacity and DFR targets", href: "/bess/inputs/sizing" },
      { label: "Battery parameters", href: "/bess/inputs/bess" },
      { label: "CAPEX", href: "/bess/inputs/capex" },
      { label: "Financing and discounting", href: "/bess/inputs/finance" },
    ],
  },
  {
    icon: Layers,
    category: "Concepts",
    links: [
      { label: "How dispatch works", href: "/bess/concepts/how-dispatch-works" },
      { label: "The battery model", href: "/bess/concepts/battery-model" },
      { label: "Degradation, EOL and augmentation", href: "/bess/concepts/degradation-and-eol" },
      { label: "Delivery Fulfilment Ratio (DFR)", href: "/bess/concepts/dfr" },
    ],
  },
  {
    icon: Activity,
    category: "Analysis",
    links: [
      { label: "Your first analysis", href: "/bess/first-analysis" },
      { label: "Simulate", href: "/bess/analysis/simulate" },
      { label: "Optimise", href: "/bess/analysis/optimise" },
      { label: "Sensitivity analysis", href: "/bess/analysis/sensitivity" },
    ],
  },
  {
    icon: BarChart3,
    category: "Reading results",
    links: [
      { label: "The dashboard", href: "/bess/results/dashboard" },
      { label: "The summary report", href: "/bess/results/summary" },
      { label: "The financials table", href: "/bess/results/financials" },
      { label: "The DFR table", href: "/bess/results/dfr-table" },
    ],
  },
  {
    icon: Landmark,
    category: "The financial model",
    links: [
      { label: "Return metrics", href: "/bess/financials/metrics" },
      { label: "Tariffs, export and penalties", href: "/bess/financials/tariffs-and-revenue" },
      { label: "Debt and tax", href: "/bess/financials/debt-and-tax" },
      { label: "Payment delay and working capital", href: "/bess/financials/working-capital" },
    ],
  },
  {
    icon: Zap,
    category: "Plant layout & SLD",
    links: [
      { label: "Plant layout and SLD", href: "/bess/plant/overview" },
      { label: "Generating the layout", href: "/bess/plant/generate-layout" },
      { label: "Generating the SLD", href: "/bess/plant/generate-sld" },
      { label: "Symbols and custom symbols", href: "/bess/plant/symbols" },
    ],
  },
  {
    icon: FileDown,
    category: "Exports",
    links: [
      { label: "The PDF report", href: "/bess/exports/pdf-report" },
      { label: "The Word report", href: "/bess/exports/word-report" },
      { label: "Data exports", href: "/bess/exports/data-exports" },
    ],
  },
  {
    icon: Boxes,
    category: "Reference",
    links: [
      { label: "Every parameter and its default", href: "/bess/reference/parameters" },
      { label: "Formula reference", href: "/bess/reference/formulas" },
      { label: "Result table columns", href: "/bess/reference/results-columns" },
      { label: "Glossary", href: "/bess/reference/glossary" },
    ],
  },
  {
    icon: LifeBuoy,
    category: "Help",
    links: [
      { label: "Troubleshooting", href: "/bess/troubleshooting" },
      { label: "Access problems", href: "/bess/access/troubleshooting" },
      { label: "Release notes", href: "/bess/releases" },
      { label: "Getting help", href: "/bess/support" },
    ],
  },
]

function HeroBanner() {
  return (
    <div className="relative overflow-hidden">
      {/* Mark bleed — cropped tight: a 480px disc, ~12% off the
          right edge and ~55% below the bottom. */}
      <BessLogo
        aria-hidden="true"
        className="pointer-events-none absolute -right-[12%] -bottom-[55%] size-[480px] opacity-[0.07] dark:opacity-[0.15]"
      />

      <div className="relative flex flex-col">
        <div className="inline-flex items-center gap-[8px] font-mono text-[10px] tracking-[0.16em] uppercase text-fd-muted-foreground">
          <BessLogo aria-hidden="true" className="size-[12px]" />
          <span>BESS Desktop · Documentation</span>
        </div>

        <h1 className="mt-[14px] text-[28px] leading-[1.15] font-normal tracking-[-0.02em] text-fd-foreground">
          Design a project with{" "}
          <span className="font-semibold">BESS Desktop.</span>
        </h1>

        <p className="mt-[14px] max-w-[640px] text-[14px] leading-[1.6] text-fd-muted-foreground">
          Walkthroughs and reference for the Windows application: hybrid
          renewable-energy and battery-storage sizing, dispatch simulation, the
          financial model, and plant layout and single-line diagrams.
        </p>

        <div className="mt-[24px] flex flex-wrap items-center gap-[16px]">
          <Link
            href="/bess/first-analysis"
            className="inline-flex items-center gap-[6px] rounded-[8px] bg-fd-primary px-[16px] py-[8px] text-[13px] font-medium text-fd-primary-foreground transition-colors hover:opacity-90"
          >
            Start reading
            <ArrowUpRight className="size-[14px]" aria-hidden />
          </Link>
          <Link
            href="/bess/install/windows"
            className="inline-flex items-center gap-[6px] text-[13px] text-fd-muted-foreground transition-colors hover:text-fd-foreground"
          >
            <Download className="size-[14px]" aria-hidden />
            Install the application
            <ArrowUpRight className="size-[12px]" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  )
}

function HighlightRow() {
  return (
    <section className="mt-[56px]">
      <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-fd-muted-foreground">
        Start here
      </div>
      <div className="mt-[14px] grid grid-cols-1 gap-[12px] sm:grid-cols-3">
        {HIGHLIGHTS.map((card) => {
          const Icon = card.icon
          return (
            <Link
              key={card.title}
              href={card.href}
              className="group relative flex flex-col items-start gap-[10px] rounded-[10px] border border-fd-border bg-fd-card p-[16px] text-left transition-colors hover:border-fd-foreground/30 hover:bg-fd-muted"
            >
              <div className="flex size-[32px] items-center justify-center rounded-[8px] bg-fd-muted text-fd-muted-foreground group-hover:text-fd-foreground">
                <Icon className="size-[16px]" aria-hidden />
              </div>
              <div className="text-[13px] font-medium text-fd-foreground">
                {card.title}
              </div>
              <div className="text-[11px] text-fd-muted-foreground">
                {card.meta}
              </div>
              <ArrowUpRight
                className="absolute top-[14px] right-[14px] size-[14px] text-fd-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                aria-hidden
              />
            </Link>
          )
        })}
      </div>
    </section>
  )
}

function TopicGrid() {
  return (
    <section className="mt-[56px]">
      <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-fd-muted-foreground">
        Browse by topic
      </div>
      <div className="mt-[20px] grid grid-cols-1 gap-x-[40px] gap-y-[32px] md:grid-cols-2">
        {TOPICS.map((topic) => {
          const Icon = topic.icon
          return (
            <div key={topic.category}>
              <div className="flex items-center gap-[8px]">
                <Icon
                  className="size-[14px] text-fd-muted-foreground"
                  aria-hidden
                />
                <h3 className="text-[12px] font-semibold tracking-[0.04em] uppercase text-fd-foreground">
                  {topic.category}
                </h3>
              </div>
              <ul className="mt-[10px] flex flex-col gap-[6px]">
                {topic.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-[4px] text-[13px] text-fd-muted-foreground transition-colors hover:text-fd-foreground"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight
                        className="size-[12px] text-fd-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                        aria-hidden
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function FooterRow() {
  return (
    <footer className="mt-[64px] flex flex-wrap items-center justify-between gap-[16px] border-t border-fd-border pt-[24px] pb-[8px]">
      <div className="text-[12px] text-fd-muted-foreground">
        Can&apos;t find what you need?{" "}
        <Link
          href="/bess/support"
          className="text-fd-foreground underline-offset-2 transition-colors hover:underline"
        >
          Contact support
        </Link>
      </div>
      <div className="flex items-center gap-[16px]">
        <Link
          href="/bess/first-analysis"
          className="inline-flex items-center gap-[4px] text-[12px] text-fd-muted-foreground transition-colors hover:text-fd-foreground"
        >
          Start reading
          <ArrowUpRight className="size-[12px]" aria-hidden />
        </Link>
        <Link
          href="/bess/releases"
          className="inline-flex items-center gap-[4px] text-[12px] text-fd-muted-foreground transition-colors hover:text-fd-foreground"
        >
          Release notes
          <ArrowUpRight className="size-[12px]" aria-hidden />
        </Link>
        <Link
          href="/bess/reference/parameters"
          className="inline-flex items-center gap-[4px] text-[12px] text-fd-muted-foreground transition-colors hover:text-fd-foreground"
        >
          Parameter reference
          <ArrowUpRight className="size-[12px]" aria-hidden />
        </Link>
      </div>
    </footer>
  )
}

export function BessLanding() {
  return (
    <main className="mx-auto w-full max-w-[960px] px-[24px] py-[64px] md:px-[48px] md:py-[80px]">
      <HeroBanner />
      <HighlightRow />
      <TopicGrid />
      <FooterRow />
    </main>
  )
}
