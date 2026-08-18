/**
 * SolarLayout brand mark — solid orange disc.
 *
 * Inline SVG (hard-coded `#d36e31`, with a `monochrome` escape hatch)
 * so it scales crisply at any size with zero network round-trip.
 *
 * Deliberate standalone copy of the mark rather than a shared-package
 * import, so this docs site carries no dependency on any component
 * library.
 */
import type { SVGAttributes } from "react"

export interface SolarLayoutLogoProps extends SVGAttributes<SVGSVGElement> {
  monochrome?: boolean
}

export function SolarLayoutLogo({
  className,
  monochrome = false,
  ...props
}: SolarLayoutLogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className ? `shrink-0 ${className}` : "shrink-0"}
      {...props}
    >
      <circle
        cx="50"
        cy="50"
        r="50"
        fill={monochrome ? "currentColor" : "#d36e31"}
      />
    </svg>
  )
}
