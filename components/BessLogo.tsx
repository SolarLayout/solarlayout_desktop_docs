/**
 * BESS brand mark — the same solid orange disc as SolarLayoutLogo, so both
 * desktop products share one brand bubble. Inline SVG, hard-coded `#d36e31`
 * with a `monochrome` escape hatch.
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
      <circle cx="50" cy="50" r="50" fill={monochrome ? "currentColor" : "#d36e31"} />
    </svg>
  )
}
