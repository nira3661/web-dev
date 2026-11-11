import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { FilterTabs, PageShell, PageTitle } from "@/components/site-shell";
import { PROJECTS, PROJECT_FILTERS, filterByCategory, type ProjectFilter } from "@/data/portfolio";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Nira" },
      {
        name: "description",
        content: "Apps, dev tools, open-source libraries and design work by Nira.",
      },
      { property: "og:title", content: "Projects — Nira" },
      {
        property: "og:description",
        content: "Apps, dev tools, open-source libraries and design work by Nira.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const [filter, setFilter] = useState<ProjectFilter>("All");
  const items = filterByCategory(PROJECTS, filter);

  return (
    <PageShell current="/projects" watermark="Project.">
      <PageTitle>Projects.</PageTitle>
      <FilterTabs options={PROJECT_FILTERS} value={filter} onChange={setFilter} />

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {items.map((p, i) => (
          <article
            key={p.title}
            className="animate-fade-up group"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <a
              href={p.url ?? "https://google.com"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${p.title} website`}
              className="relative block aspect-square overflow-hidden rounded-lg bg-card transition-transform duration-500 group-hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <img
                src={p.image}
                alt={`${p.title} preview`}
                width={1024}
                height={1024}
                loading={i < 2 ? "eager" : "lazy"}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-heading shadow-sm backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 stroke-current"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </a>
            <p className="mt-5 text-[11px] uppercase tracking-[0.2em] text-accent">{p.category}</p>
            <h3 className="mt-1 text-xl font-extrabold text-heading">
              <a
                href={p.url ?? "https://google.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent"
              >
                {p.title}
              </a>
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-article">{p.summary}</p>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
              {p.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
