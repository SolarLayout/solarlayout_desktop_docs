import type { ReactNode } from "react"

/**
 * `<Release>` — one changelog entry. Flat borders, `fd-*` tokens only, a
 * mono micro-caption header.
 *
 * Each `###` sub-heading inside the body gets a top rule so the chunks read
 * as distinct sections rather than a wall.
 */
interface ReleaseProps {
  version: string
  date: string
  tag?: "current" | "previous"
  children: ReactNode
}

const TAG_LABELS: Record<NonNullable<ReleaseProps["tag"]>, string> = {
  current: "Current",
  previous: "Previous",
}

const TAG_STYLES: Record<NonNullable<ReleaseProps["tag"]>, string> = {
  current: "border-fd-primary/30 bg-fd-primary/10 text-fd-primary",
  previous: "border-fd-border bg-fd-muted text-fd-muted-foreground",
}

const BODY_STYLES = [
  "[&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
  "[&_h3]:mt-7 [&_h3]:mb-3 [&_h3]:pt-5 [&_h3]:border-t [&_h3]:border-fd-border",
  "[&_h3]:text-[13px] [&_h3]:font-semibold [&_h3]:tracking-[0.02em] [&_h3]:text-fd-foreground",
  "[&>h3:first-child]:mt-0 [&>h3:first-child]:pt-0 [&>h3:first-child]:border-t-0",
  "[&_p]:my-3 [&_p]:text-[14px] [&_p]:leading-[1.7] [&_p]:text-fd-foreground/85",
  "[&_p_strong]:font-semibold [&_p_strong]:text-fd-foreground",
  "[&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:text-[14px] [&_ul]:leading-[1.7] [&_ul]:text-fd-foreground/85",
  "[&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:text-[14px] [&_ol]:leading-[1.7] [&_ol]:text-fd-foreground/85",
  "[&_li]:my-1.5",
  "[&_li_strong]:font-semibold [&_li_strong]:text-fd-foreground",
  "[&_a]:text-fd-primary [&_a]:underline-offset-[3px] hover:[&_a]:underline",
  "[&_code]:rounded [&_code]:border [&_code]:border-fd-border [&_code]:bg-fd-muted/60 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[12.5px] [&_code]:font-mono",
].join(" ")

/**
 * Format an ISO date for the header, falling back to the raw string when it
 * is not a parseable date.
 *
 * The fallback is load-bearing, not defensive padding: the release page
 * carries a structural placeholder entry until a real version and date exist,
 * and `new Date("TBD…")` would otherwise render the header as "INVALID DATE" —
 * a rendering bug on a shipped page caused purely by content that is honest
 * about not knowing yet.
 */
function formatReleaseDate(date: string): string {
  const parsed = new Date(`${date}T00:00:00Z`)
  if (Number.isNaN(parsed.getTime())) return date
  return parsed
    .toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    })
    .toUpperCase()
}

export function Release({ version, date, tag, children }: ReleaseProps) {
  // Deep-linkable anchor — /docs/releases#v-1-1-0. scroll-mt offsets the
  // sticky header so the anchored card isn't hidden beneath it.
  const anchorId = `v-${version.replace(/\./g, "-")}`
  const formattedDate = formatReleaseDate(date)
  // `dateTime` must be a valid machine-readable date or the attribute is
  // meaningless — omit it entirely rather than emit a bad one.
  const isValidDate = !Number.isNaN(new Date(`${date}T00:00:00Z`).getTime())

  return (
    <section
      id={anchorId}
      className="not-prose my-10 scroll-mt-24 overflow-hidden rounded-xl border border-fd-border bg-fd-card"
    >
      <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-fd-border px-6 py-4">
        <h2 className="m-0 font-mono text-[15px] font-semibold tracking-tight text-fd-foreground">
          <a
            href={`#${anchorId}`}
            className="text-inherit no-underline hover:text-fd-primary"
          >
            v{version}
          </a>
        </h2>
        <time
          className="font-mono text-[10px] tracking-[0.12em] uppercase text-fd-muted-foreground"
          dateTime={isValidDate ? date : undefined}
        >
          {formattedDate}
        </time>
        {tag ? (
          <span
            className={`ml-auto rounded-full border px-2 py-0.5 text-[10px] font-medium tracking-[0.04em] uppercase ${TAG_STYLES[tag]}`}
          >
            {TAG_LABELS[tag]}
          </span>
        ) : null}
      </header>
      <div className={`px-6 py-6 ${BODY_STYLES}`}>{children}</div>
    </section>
  )
}
