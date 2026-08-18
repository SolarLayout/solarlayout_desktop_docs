import type { ReactNode } from "react"
import { RootProvider } from "fumadocs-ui/provider/next"
import "./global.css"

export const metadata = {
  title: {
    default: "SolarLayout Desktop Docs",
    template: "%s · SolarLayout Desktop Docs",
  },
  description:
    "Documentation for SolarLayout Desktop — the Windows application for automated solar PV plant layout, energy yield, single-line diagrams and bills of materials.",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        {/* One theme mechanism: fumadocs already drives next-themes'
            `.dark`. Sharing the product storage key means a reader's
            choice follows them between the product surfaces when they
            are served same-origin (localStorage is per-origin). */}
        <RootProvider theme={{ storageKey: "solarlayout-theme" }}>
          {children}
        </RootProvider>
      </body>
    </html>
  )
}
