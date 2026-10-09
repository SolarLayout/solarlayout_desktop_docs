"use client"
/**
 * SearchField — a full-width search trigger for the docs index. Opens the same
 * Fumadocs search dialog as the sidebar's search box and Cmd/Ctrl+K: one index
 * over every product, results labelled by product.
 */
import { Search } from "lucide-react"
import { useSearchContext } from "fumadocs-ui/contexts/search"

export function SearchField() {
  const { setOpenSearch } = useSearchContext()
  return (
    <button
      type="button"
      onClick={() => setOpenSearch(true)}
      className="flex h-[44px] w-full items-center gap-[10px] rounded-[10px] border border-fd-border bg-fd-card px-[14px] text-left text-[14px] text-fd-muted-foreground shadow-sm transition-colors hover:border-fd-foreground/30"
    >
      <Search className="size-[16px]" aria-hidden />
      <span className="flex-1">Search the documentation</span>
      <span className="hidden items-center gap-[4px] sm:inline-flex">
        <kbd className="rounded-[5px] border border-fd-border px-[6px] py-[1px] font-mono text-[11px]">⌘</kbd>
        <kbd className="rounded-[5px] border border-fd-border px-[6px] py-[1px] font-mono text-[11px]">K</kbd>
      </span>
    </button>
  )
}
