import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared"
import { SolarLayoutLogo } from "@/components/SolarLayoutLogo"

/**
 * Shared layout config — surfaced in both the docs sidebar header and
 * the top navbar on the landing page. One source of truth for the
 * brand mark + the cross-surface nav links.
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <span className="inline-flex items-center gap-[8px] font-medium">
        <SolarLayoutLogo className="size-[18px]" />
        <span>SolarLayout Desktop Docs</span>
      </span>
    ),
  },
  links: [
    {
      text: "Docs",
      url: "/docs",
    },
    {
      text: "Install",
      url: "/docs/install/windows",
    },
    {
      text: "Release notes",
      url: "/docs/releases",
    },
  ],
}
