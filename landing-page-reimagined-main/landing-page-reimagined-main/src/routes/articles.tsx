import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { FilterTabs, PageShell, PageTitle } from "@/components/site-shell";
import { READS, READ_FILTERS, filterByCategory, type ReadFilter } from "@/data/portfolio";

export const Route = createFileRoute("/articles")({
  head: () => ({
    meta: [
      { title: "Reads — Articles, Readings & Videos by Nira" },
      {
        name: "description",
        content: "Articles, reading notes and videos by Nira on frontend development and design.",
      },
      { property: "og:title", content: "Reads — Articles, Readings & Videos by Nira" },
      {
        property: "og:description",
        content: "Articles, reading notes and videos by Nira on frontend development and design.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ArticlesPage,
});

const COVER_CLASS = ["", "cover-1", "cover-2", "cover-3", "cover-4", "cover-5", "cover-6"];

function ArticlesPage() {
  const [filter, setFilter] = useState<ReadFilter>("All");
  const items = filterByCategory(READS, filter);

  return (
    <PageShell current="/articles" watermark="Articles.">
      <PageTitle>Reads.</PageTitle>
      <FilterTabs options={READ_FILTERS} value={filter} onChange={setFilter} />

      <div className="mt-8 gap-6 sm:columns-2">
        {items.map((r, i) => (
          <article
            key={r.title}
            className="animate-fade-up group mb-6 break-inside-avoid"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div
              className={`${COVER_CLASS[r.cover]} flex ${r.tall ? "aspect-square" : "aspect-[3/2]"} items-center justify-center rounded-lg p-8 transition-transform duration-500 group-hover:-translate-y-1`}
            >
              <p className="text-center text-2xl font-extrabold leading-snug text-[var(--cover-foreground)] md:text-3xl">
                {r.title}
              </p>
            </div>
            <div className="mt-4 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span>{r.category}</span>
              <span aria-hidden="true">·</span>
              <span>{r.date}</span>
            </div>
            <h3 className="mt-2 text-lg font-extrabold text-heading">{r.title}</h3>
            <p className="mt-1 text-[15px] leading-relaxed text-article">{r.excerpt}</p>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
