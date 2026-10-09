import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared"
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
    { text: "BESS Desktop", url: "/docs/bess" },
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
    { text: "SolarLayout Desktop", url: "/docs/solarlayout" },
    { text: "Docs", url: "/docs/bess" },
    { text: "Install", url: "/docs/bess/install/windows" },
    { text: "Release notes", url: "/docs/bess/releases" },
  ],
}
