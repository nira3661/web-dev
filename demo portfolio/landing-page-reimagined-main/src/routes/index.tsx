import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { ArrowLink, SiteHeader, SocialLinks } from "@/components/site-shell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "I'm Nira — Frontend Developer & UX Architect" },
      {
        name: "description",
        content:
          "Nira is a frontend developer and UX architect who builds calm, fast and playful web experiences.",
      },
      { property: "og:title", content: "I'm Nira — Frontend Developer & UX Architect" },
      {
        property: "og:description",
        content: "Frontend developer and UX architect building calm, fast and playful web experiences.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Strong({ to, children }: { to: "/about" | "/projects" | "/articles" | "/contact"; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="font-extrabold uppercase text-heading underline-offset-4 transition-colors hover:text-accent hover:underline"
    >
      {children}
    </Link>
  );
}

function Index() {
  return (
    <div className="bg-grid-glow relative min-h-screen overflow-hidden bg-background">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4">
        Skip to main content
      </a>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-4 bottom-[-4rem] select-none font-serif text-[22rem] leading-none text-watermark md:text-[30rem]"
      >
        N.
      </span>

      <SiteHeader current="/" />

      <main
        id="main-content"
        className="relative z-10 mx-auto flex min-h-[calc(100vh-9rem)] max-w-6xl flex-col justify-center px-6 pb-40 md:px-24"
      >
        <section className="max-w-4xl">
          <h1 className="animate-fade-up text-3xl font-semibold uppercase tracking-[0.3em] text-heading md:text-[2.6rem] md:leading-tight">
            I'm Nira
          </h1>

          <p
            className="animate-fade-up mt-8 text-[15px] leading-[2.3] text-article md:text-base"
            style={{ animationDelay: "120ms" }}
          >
            A frontend developer and UX architect who loves the space where code meets craft. I build
            interfaces that feel quick, calm and a little bit playful, and I keep a growing shelf of{" "}
            <Strong to="/projects">Projects</Strong> that started as late-night experiments and grew
            into real products.
          </p>

          <p
            className="animate-fade-up mt-4 text-[15px] leading-[2.3] text-article md:text-base"
            style={{ animationDelay: "220ms" }}
          >
            I care deeply about <Strong to="/about">Design</Strong> — clear type, honest spacing and
            details you notice only when they're missing. Away from the keyboard I sketch, cook for
            friends, and write the occasional <Strong to="/articles">Articles</Strong> about what I
            learn along the way. Have an idea in mind? <Strong to="/contact">Contact Me</Strong>
          </p>

          <div className="animate-fade-up mt-12" style={{ animationDelay: "320ms" }}>
            <ArrowLink to="/about">See More About Me</ArrowLink>
          </div>

          <div className="animate-fade-up mt-10" style={{ animationDelay: "420ms" }}>
            <SocialLinks />
          </div>
        </section>
      </main>
    </div>
  );
}
