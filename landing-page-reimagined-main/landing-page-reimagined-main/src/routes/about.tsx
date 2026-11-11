import { createFileRoute } from "@tanstack/react-router";

import { ArrowLink, PageShell, PageTitle, SocialLinks } from "@/components/site-shell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Nira — Frontend Developer & UX Architect" },
      {
        name: "description",
        content: "Who Nira is, how she works, the tools she uses and where she has worked.",
      },
      { property: "og:title", content: "About Nira — Frontend Developer & UX Architect" },
      {
        property: "og:description",
        content: "Who Nira is, how she works, the tools she uses and where she has worked.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const SKILLS = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Vue",
  "Tailwind CSS",
  "Node.js",
  "Figma",
  "Accessibility",
  "Design Systems",
  "Motion",
  "Testing",
];

const EXPERIENCE = [
  { years: "2024 — Now", role: "Senior Frontend Engineer", place: "Northwind Studio" },
  { years: "2021 — 2024", role: "UI Engineer", place: "Brightline Labs" },
  { years: "2019 — 2021", role: "Frontend Developer", place: "Freelance" },
];

function AboutPage() {
  return (
    <PageShell current="/about" watermark="About.">
      <PageTitle>About.</PageTitle>

      <div className="animate-fade-up mt-10 max-w-3xl space-y-5 text-[15px] leading-[2.1] text-article md:text-base" style={{ animationDelay: "100ms" }}>
        <p>
          Hi, I'm Nira. I've spent the last few years building websites and apps for studios,
          start-ups and friends with big ideas. I enjoy the whole journey — from the first rough
          sketch to the last pixel and the final speed check.
        </p>
        <p>
          My favorite work sits between design and engineering: turning a Figma file into something
          that feels alive, building design systems teams actually enjoy using, and making sure every
          page works for everyone, on every device.
        </p>
      </div>

      <section className="animate-fade-up mt-16" style={{ animationDelay: "200ms" }}>
        <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-heading">Toolbox</h2>
        <ul className="mt-6 flex max-w-3xl flex-wrap gap-3">
          {SKILLS.map((skill) => (
            <li key={skill} className="rounded-md border border-border bg-card/50 px-4 py-1.5 text-sm text-article">
              {skill}
            </li>
          ))}
        </ul>
      </section>

      <section className="animate-fade-up mt-16" style={{ animationDelay: "300ms" }}>
        <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-heading">Experience</h2>
        <ul className="mt-6 max-w-3xl divide-y divide-border border-y border-border">
          {EXPERIENCE.map((job) => (
            <li key={job.role} className="flex flex-col gap-1 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-heading">{job.role}</p>
                <p className="text-sm text-muted-foreground">{job.place}</p>
              </div>
              <p className="text-sm text-muted-foreground">{job.years}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-16 flex flex-col gap-10">
        <ArrowLink to="/contact">Let's Work Together</ArrowLink>
        <SocialLinks />
      </div>
    </PageShell>
  );
}
