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
  },
  links: [
    { text: "BESS Desktop", url: "/bess" },
    { text: "Docs", url: "/docs" },
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
  },
  links: [
    { text: "SolarLayout Desktop", url: "/docs" },
    { text: "Docs", url: "/bess" },
    { text: "Install", url: "/bess/install/windows" },
    { text: "Release notes", url: "/bess/releases" },
  ],
}
