"use client"
/**
 * ProductSearchDialog — the site's search dialog: one index over every product, each result labelled with its
 * product, and a filter to one product or All, the default (#19).
 *
 * Built from Fumadocs' own dialog parts rather than DefaultSearchDialog, whose footer (the tag filter) renders
 * outside the dialog's content in this version, so it lands on the page behind the overlay.
 */
import { useState } from "react"
import { useDocsSearch } from "fumadocs-core/search/client"
import { fetchClient } from "fumadocs-core/search/client/fetch"
import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogFooter,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
  TagsList,
  TagsListItem,
} from "fumadocs-ui/components/dialog/search"
import type { SharedProps } from "fumadocs-ui/contexts/search"

const PRODUCTS = [
  { name: "All", value: "" },
  { name: "SolarLayout Desktop", value: "solarlayout" },
  { name: "BESS Desktop", value: "bess" },
]

export function ProductSearchDialog(props: SharedProps) {
  // "" is All: no filter sent to the index.
  const [tag, setTag] = useState("")
  const { search, setSearch, query } = useDocsSearch({ client: fetchClient({ tag: tag || undefined }) })
  return (
    <SearchDialog search={search} onSearchChange={setSearch} isLoading={query.isLoading} {...props}>
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList items={query.data !== "empty" ? query.data : null} />
        <SearchDialogFooter className="flex flex-wrap items-center gap-[8px]">
          <span className="whitespace-nowrap text-[11px] text-fd-muted-foreground">Search in</span>
          <TagsList tag={tag} onTagChange={(v) => setTag(v ?? "")}>
            {PRODUCTS.map((p) => (
              <TagsListItem key={p.value} value={p.value}>
                {p.name}
              </TagsListItem>
            ))}
          </TagsList>
        </SearchDialogFooter>
      </SearchDialogContent>
    </SearchDialog>
  )
}
