import type { ReactNode } from "react"

/** Metadata-only layer over `/docs/rooftop`, as `app/docs/bess/layout.tsx` is for BESS. */
export const metadata = {
  title: {
    default: "SolarLayout Rooftop Docs",
    template: "%s · SolarLayout Rooftop Docs",
  },
  description:
    "Documentation for SolarLayout Rooftop: rooftop PV design in the browser, from the roof on the map to the layout, shading, stringing, the hourly energy yield and the handover files.",
}

export default function RooftopDocsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
