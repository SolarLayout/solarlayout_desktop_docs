/**
 * RooftopLanding — SolarLayout Rooftop's docs landing at `/docs/rooftop`, in the `(landing)` route group as BESS's is:
 * hero, Start here, Browse by topic, footer. The sidebar order and the groups follow the approved tree (#19).
 */
import Link from "next/link"
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  ExternalLink,
  Map,
  LayoutGrid,
  LifeBuoy,
  Rocket,
  Sparkles,
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
  { icon: Rocket, title: "Getting started", meta: "5 min", href: "/docs/rooftop/getting-started" },
  { icon: LayoutGrid, title: "The workspace", meta: "5 min", href: "/docs/rooftop/workspace" },
  { icon: Sparkles, title: "Your first rooftop design", meta: "20 min walkthrough", href: "/docs/rooftop/first-design" },
]

interface TopicSection {
  icon: LucideIcon
  category: string
  links: { label: string; href: string }[]
}

// Only the pages that exist: the other groups of the approved tree (#19) join as their pages are written.
const TOPICS: TopicSection[] = [
  {
    icon: Rocket,
    category: "Onboarding",
    links: [
      { label: "What SolarLayout Rooftop does", href: "/docs/rooftop/intro" },
      { label: "Getting started", href: "/docs/rooftop/getting-started" },
      { label: "Your first rooftop design", href: "/docs/rooftop/first-design" },
      { label: "The workspace", href: "/docs/rooftop/workspace" },
    ],
  },
  {
    icon: Map,
    category: "The roof",
    links: [{ label: "Find the roof", href: "/docs/rooftop/find" }],
  },
  {
    icon: BookOpen,
    category: "Projects",
    links: [{ label: "Your designs and the project file", href: "/docs/rooftop/projects" }],
  },
  {
    icon: LifeBuoy,
    category: "Help",
    links: [
      { label: "What's new", href: "/docs/rooftop/whats-new" },
      { label: "Getting help", href: "/docs/rooftop/support" },
    ],
  },
]

function HeroBanner() {
  return (
    <div className="relative overflow-hidden">
      <SolarLayoutLogo
        aria-hidden="true"
        className="pointer-events-none absolute -right-[12%] -bottom-[55%] size-[480px] opacity-[0.07] dark:opacity-[0.15]"
      />
      <div className="relative flex flex-col">
        <div className="flex items-center justify-between gap-[16px]">
          <div className="inline-flex items-center gap-[8px] font-mono text-[10px] tracking-[0.16em] uppercase text-fd-muted-foreground">
            <SolarLayoutLogo aria-hidden="true" className="size-[12px]" />
            <span>SolarLayout Rooftop · Documentation</span>
          </div>
          <Link
            href="/docs"
            className="inline-flex shrink-0 items-center gap-[7px] rounded-[9px] border border-fd-border bg-fd-card px-[14px] py-[8px] text-[13px] font-medium text-fd-foreground shadow-sm transition-colors hover:border-fd-primary/40 hover:bg-fd-muted"
          >
            <ArrowLeft className="size-[14px]" aria-hidden />
            <span>All products</span>
          </Link>
        </div>

        <h1 className="mt-[14px] text-[28px] leading-[1.15] font-normal tracking-[-0.02em] text-fd-foreground">
          Design rooftop solar with <span className="font-semibold">SolarLayout Rooftop.</span>
        </h1>

        <p className="mt-[14px] max-w-[640px] text-[14px] leading-[1.6] text-fd-muted-foreground">
          Walkthroughs and reference for the browser app: the roof on the map, the layout, shading, stringing, the
          8,760-hour energy yield and the handover files.
        </p>
        <p className="mt-[8px] max-w-[640px] text-[13px] leading-[1.6] text-fd-foreground">
          Free, no account needed. Your designs are kept on this device.
        </p>

        <div className="mt-[24px] flex flex-wrap items-center gap-[16px]">
          <Link
            href="/docs/rooftop/getting-started"
            className="inline-flex items-center gap-[6px] rounded-[8px] bg-fd-primary px-[16px] py-[8px] text-[13px] font-medium text-fd-primary-foreground transition-colors hover:opacity-90"
          >
            Start reading
            <ArrowUpRight className="size-[14px]" aria-hidden />
          </Link>
          <a
            href="https://rooftop.solarlayout.app"
            className="inline-flex items-center gap-[6px] text-[13px] text-fd-muted-foreground transition-colors hover:text-fd-foreground"
          >
            Open Rooftop
            <ExternalLink className="size-[12px]" aria-hidden />
          </a>
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
          href="/docs/rooftop/support"
          className="text-fd-foreground underline-offset-2 transition-colors hover:underline"
        >
          Contact support
        </Link>
      </div>
      <div className="flex items-center gap-[16px]">
        <Link
          href="/docs/rooftop/getting-started"
          className="inline-flex items-center gap-[4px] text-[12px] text-fd-muted-foreground transition-colors hover:text-fd-foreground"
        >
          Start reading
          <ArrowUpRight className="size-[12px]" aria-hidden />
        </Link>
        <Link
          href="/docs/rooftop/whats-new"
          className="inline-flex items-center gap-[4px] text-[12px] text-fd-muted-foreground transition-colors hover:text-fd-foreground"
        >
          What&apos;s new
          <ArrowUpRight className="size-[12px]" aria-hidden />
        </Link>
      </div>
    </footer>
  )
}

export function RooftopLanding() {
  return (
    <main className="mx-auto w-full max-w-[960px] px-[24px] py-[64px] md:px-[48px] md:py-[80px]">
      <HeroBanner />
      <HighlightRow />
      <TopicGrid />
      <FooterRow />
    </main>
  )
}
