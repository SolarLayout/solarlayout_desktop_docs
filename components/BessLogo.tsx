/**
 * BESS brand mark — solid navy disc, mirroring SolarLayoutLogo's construction
 * so the two products read as siblings. Inline SVG, hard-coded `#1a3a5c`
 * (the app's banner navy) with a `monochrome` escape hatch.
 */
import type { SVGAttributes } from "react"

export interface BessLogoProps extends SVGAttributes<SVGSVGElement> {
  monochrome?: boolean
}

export function BessLogo({ className, monochrome = false, ...props }: BessLogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className ? `shrink-0 ${className}` : "shrink-0"}
      {...props}
    >
      <circle cx="50" cy="50" r="50" fill={monochrome ? "currentColor" : "#1a3a5c"} />
    </svg>
  )
}
