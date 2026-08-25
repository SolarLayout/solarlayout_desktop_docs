/**
 * ProductPicker — the family landing at `/`. Two cards, one per desktop app,
 * each linking into that app's docs tree. All colour flows through the
 * Fumadocs `--color-fd-*` tokens so light and dark both work.
 */
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { SolarLayoutLogo } from "@/components/SolarLayoutLogo"
import { BessLogo } from "@/components/BessLogo"

const PRODUCTS = [
  {
    Logo: SolarLayoutLogo,
    name: "SolarLayout Desktop",
    blurb: "Design utility-scale solar PV plants: layout, energy yield, single-line diagrams, bills of materials and drawing exports.",
    href: "/docs",
  },
  {
    Logo: BessLogo,
    name: "BESS Desktop",
    blurb: "Design hybrid renewable-energy and battery-storage projects: dispatch simulation, optimisation, the financial model, and plant layout.",
    href: "/bess",
  },
] as const

export function ProductPicker() {
  return (
    <main className="mx-auto w-full max-w-[860px] px-[24px] py-[64px] md:px-[48px] md:py-[96px]">
      <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-fd-muted-foreground">
        SolarLayout · Desktop documentation
      </div>
      <h1 className="mt-[14px] text-[28px] leading-[1.15] font-normal tracking-[-0.02em] text-fd-foreground">
        Choose an application.
      </h1>
      <div className="mt-[32px] grid grid-cols-1 gap-[16px] sm:grid-cols-2">
        {PRODUCTS.map(({ Logo, name, blurb, href }) => (
          <Link
            key={name}
            href={href}
            className="group relative flex flex-col items-start gap-[12px] rounded-[12px] border border-fd-border bg-fd-card p-[20px] transition-colors hover:border-fd-foreground/30 hover:bg-fd-muted"
          >
            <Logo className="size-[28px]" />
            <div className="text-[15px] font-semibold text-fd-foreground">{name}</div>
            <p className="text-[13px] leading-[1.6] text-fd-muted-foreground">{blurb}</p>
            <span className="mt-[4px] inline-flex items-center gap-[4px] text-[13px] font-medium text-fd-foreground">
              Open the docs
              <ArrowUpRight className="size-[14px]" aria-hidden />
            </span>
          </Link>
        ))}
      </div>
    </main>
  )
}
