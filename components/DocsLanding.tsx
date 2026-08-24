/**
 * DocsLanding — the SolarLayout docs landing surface, rendered at `/docs`.
 * The docs index lives in a Next.js route group `(landing)` so the
 * Fumadocs `DocsLayout` (sidebar + table of contents) does NOT wrap it —
 * only `/docs/<slug>` gets that chrome.
 *
 * Compositional language, matching the sibling web docs:
 *
 *   - rising-sun brand-mark bleed at low opacity (engineering-document
 *     feel, not a centred marketing card)
 *   - mono micro-caption with an inline brand mark
 *   - display tagline with weight contrast, not scream scale
 *   - a 3-card "Start here" row above a topic grid
 *   - a footer with cross-links
 *
 * All colour flows through the Fumadocs theme tokens (`--color-fd-*`),
 * mapped to the SolarLayout palette in `app/global.css`, so light and dark
 * both work with no per-component branching.
 */
import Link from "next/link"
import {
  ArrowUpRight,
  Boxes,
  Download,
  FileText,
  KeyRound,
  Layers,
  MapPin,
  PencilRuler,
  Sparkles,
  Sun,
  Zap,
  type LucideIcon,
} from "lucide-react"
import { SolarLayoutLogo } from "@/components/SolarLayoutLogo"

interface HighlightCard {
  icon: LucideIcon
  title: string
  meta: string
  href: string
}

const HIGHLIGHTS: HighlightCard[] = [
  {
    icon: Download,
    title: "Install SolarLayout Desktop",
    meta: "5 min",
    href: "/docs/install/windows",
  },
  {
    icon: MapPin,
    title: "Prepare your boundary file",
    meta: "10 min",
    href: "/docs/inputs/kmz-requirements",
  },
  {
    icon: Sparkles,
    title: "Your first layout",
    meta: "20 min walkthrough",
    href: "/docs/first-layout",
  },
]

interface TopicSection {
  icon: LucideIcon
  category: string
  links: { label: string; href: string }[]
}

const TOPICS: TopicSection[] = [
  {
    icon: FileText,
    category: "Getting started",
    links: [
      { label: "What SolarLayout Desktop does", href: "/docs/intro" },
      { label: "Install on Windows", href: "/docs/install/windows" },
      { label: "Activate your licence", href: "/docs/licence/activate" },
      { label: "Choosing a design mode", href: "/docs/design-modes" },
    ],
  },
  {
    icon: MapPin,
    category: "Site inputs",
    links: [
      { label: "Which boundary file to use", href: "/docs/inputs/boundary-files" },
      { label: "Boundary file requirements", href: "/docs/inputs/kmz-requirements" },
      { label: "Module specifications", href: "/docs/inputs/module" },
      { label: "Site parameters", href: "/docs/inputs/site" },
    ],
  },
  {
    icon: Layers,
    category: "Layout",
    links: [
      { label: "How placement works", href: "/docs/layout/how-placement-works" },
      { label: "Control rooms", href: "/docs/layout/icr" },
      { label: "Lightning arresters", href: "/docs/layout/lightning-arresters" },
      { label: "Cable routing", href: "/docs/layout/cables" },
    ],
  },
  {
    icon: Sun,
    category: "Energy yield",
    links: [
      { label: "How yield is calculated", href: "/docs/energy/overview" },
      { label: "Weather data sources", href: "/docs/energy/weather" },
      { label: "Loss breakdown", href: "/docs/energy/losses" },
      { label: "Lifetime and P-values", href: "/docs/energy/lifetime-and-p-values" },
    ],
  },
  {
    icon: PencilRuler,
    category: "Editing by hand",
    links: [
      { label: "Sketch Mode", href: "/docs/editing/sketch-mode" },
      { label: "Annotations and measuring", href: "/docs/editing/annotations" },
      { label: "Pile layout", href: "/docs/editing/piles" },
      { label: "Obstructions", href: "/docs/layout/obstructions" },
    ],
  },
  {
    icon: Zap,
    category: "Diagrams and materials",
    links: [
      { label: "Building the single-line diagram", href: "/docs/sld/overview" },
      { label: "Symbol reference", href: "/docs/sld/symbols" },
      { label: "Bill of materials", href: "/docs/bom/overview" },
      { label: "Bill of materials templates", href: "/docs/bom/templates" },
    ],
  },
  {
    icon: Download,
    category: "Exports",
    links: [
      { label: "The PDF report", href: "/docs/exports/pdf-report" },
      { label: "Google Earth export", href: "/docs/exports/kmz" },
      { label: "CAD drawing export", href: "/docs/exports/dxf" },
      { label: "Saving and reopening projects", href: "/docs/projects" },
    ],
  },
  {
    icon: Boxes,
    category: "Reference",
    links: [
      { label: "Every parameter and its default", href: "/docs/reference/parameters" },
      { label: "Summary table columns", href: "/docs/reference/summary-columns" },
      { label: "Shortcuts and commands", href: "/docs/reference/keyboard-and-commands" },
      { label: "Glossary", href: "/docs/reference/glossary" },
    ],
  },
  {
    icon: KeyRound,
    category: "Help",
    links: [
      { label: "Troubleshooting", href: "/docs/troubleshooting" },
      { label: "Licence problems", href: "/docs/licence/troubleshooting" },
      { label: "Release notes", href: "/docs/releases" },
      { label: "Contact support", href: "/docs/support" },
    ],
  },
]

function HeroBanner() {
  return (
    <div className="relative overflow-hidden">
      {/* Rising-sun bleed — cropped tight: a 480px disc, ~12% off the
          right edge and ~55% below the bottom. */}
      <SolarLayoutLogo
        aria-hidden="true"
        className="pointer-events-none absolute -right-[12%] -bottom-[55%] size-[480px] opacity-[0.07] dark:opacity-[0.15]"
      />

      <div className="relative flex flex-col">
        <div className="inline-flex items-center gap-[8px] font-mono text-[10px] tracking-[0.16em] uppercase text-fd-muted-foreground">
          <SolarLayoutLogo aria-hidden="true" className="size-[12px]" />
          <span>SolarLayout Desktop · Documentation</span>
        </div>

        <h1 className="mt-[14px] text-[28px] leading-[1.15] font-normal tracking-[-0.02em] text-fd-foreground">
          Design a plant with{" "}
          <span className="font-semibold">SolarLayout Desktop.</span>
        </h1>

        <p className="mt-[14px] max-w-[640px] text-[14px] leading-[1.6] text-fd-muted-foreground">
          Walkthroughs and reference for the Windows application: site
          boundaries, module and tracker layout, energy yield, single-line
          diagrams, bills of materials, and the drawing exports your team
          builds from.
        </p>

        <div className="mt-[24px] flex flex-wrap items-center gap-[16px]">
          <Link
            href="/docs/first-layout"
            className="inline-flex items-center gap-[6px] rounded-[8px] bg-fd-primary px-[16px] py-[8px] text-[13px] font-medium text-fd-primary-foreground transition-colors hover:opacity-90"
          >
            Start reading
            <ArrowUpRight className="size-[14px]" aria-hidden />
          </Link>
          <Link
            href="/docs/install/windows"
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
          href="/docs/support"
          className="text-fd-foreground underline-offset-2 transition-colors hover:underline"
        >
          Contact support
        </Link>
      </div>
      <div className="flex items-center gap-[16px]">
        <Link
          href="/docs/first-layout"
          className="inline-flex items-center gap-[4px] text-[12px] text-fd-muted-foreground transition-colors hover:text-fd-foreground"
        >
          Start reading
          <ArrowUpRight className="size-[12px]" aria-hidden />
        </Link>
        <Link
          href="/docs/releases"
          className="inline-flex items-center gap-[4px] text-[12px] text-fd-muted-foreground transition-colors hover:text-fd-foreground"
        >
          Release notes
          <ArrowUpRight className="size-[12px]" aria-hidden />
        </Link>
        <Link
          href="/docs/reference/parameters"
          className="inline-flex items-center gap-[4px] text-[12px] text-fd-muted-foreground transition-colors hover:text-fd-foreground"
        >
          Parameter reference
          <ArrowUpRight className="size-[12px]" aria-hidden />
        </Link>
      </div>
    </footer>
  )
}

export function DocsLanding() {
  return (
    <main className="mx-auto w-full max-w-[960px] px-[24px] py-[64px] md:px-[48px] md:py-[80px]">
      <HeroBanner />
      <HighlightRow />
      <TopicGrid />
      <FooterRow />
    </main>
  )
}
