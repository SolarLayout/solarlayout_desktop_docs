/**
 * BessLanding — the `/bess` index (rendered in the (landing) route group so the
 * DocsLayout chrome does not wrap it). Mirrors DocsLanding's composition;
 * topic links grow as the BESS tree is written.
 */
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { BessLogo } from "@/components/BessLogo"

const LINKS = [
  { label: "What BESS Desktop does", href: "/bess/intro" },
  { label: "Getting started", href: "/bess/getting-started" },
]

export function BessLanding() {
  return (
    <main className="mx-auto w-full max-w-[960px] px-[24px] py-[64px] md:px-[48px] md:py-[80px]">
      <div className="relative flex flex-col">
        <div className="inline-flex items-center gap-[8px] font-mono text-[10px] tracking-[0.16em] uppercase text-fd-muted-foreground">
          <BessLogo aria-hidden="true" className="size-[12px]" />
          <span>BESS Desktop · Documentation</span>
        </div>
        <h1 className="mt-[14px] text-[28px] leading-[1.15] font-normal tracking-[-0.02em] text-fd-foreground">
          Design a project with <span className="font-semibold">BESS Desktop.</span>
        </h1>
        <p className="mt-[14px] max-w-[640px] text-[14px] leading-[1.6] text-fd-muted-foreground">
          Walkthroughs and reference for the Windows application: hybrid
          renewable-energy and battery-storage sizing, dispatch simulation, the
          financial model, and plant layout and single-line diagrams.
        </p>
        <ul className="mt-[28px] flex flex-col gap-[8px]">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group inline-flex items-center gap-[4px] text-[14px] text-fd-muted-foreground transition-colors hover:text-fd-foreground"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="size-[12px] opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
