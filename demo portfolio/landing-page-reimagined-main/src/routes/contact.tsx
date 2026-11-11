import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

import { ArrowLink, PageShell, PageTitle, SocialLinks } from "@/components/site-shell";

const EMAIL = "hello@nira.dev";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Nira — Let's Build Something" },
      { name: "description", content: "Send Nira a message about a project, a role or just to say hi." },
      { property: "og:title", content: "Contact Nira — Let's Build Something" },
      { property: "og:description", content: "Send Nira a message about a project, a role or just to say hi." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const FIELD =
  "w-full rounded-sm border border-border bg-card/40 px-5 py-3.5 text-[15px] text-heading placeholder:text-muted-foreground focus:border-ring focus:outline-none";

function ContactPage() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Hello from ${data.get("name")}`);
    const body = encodeURIComponent(`${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <PageShell current="/contact" watermark="Contact." watermarkPosition="bottom">
      <PageTitle>Contact.</PageTitle>
      <p className="animate-fade-up mt-6 text-[15px] text-article" style={{ animationDelay: "80ms" }}>
        Get in touch or send me an email directly at{" "}
        <a href={`mailto:${EMAIL}`} className="font-extrabold text-heading hover:text-accent">
          {EMAIL}
        </a>
      </p>

      <form
        onSubmit={onSubmit}
        className="animate-fade-up mt-10 flex max-w-xl flex-col gap-8"
        style={{ animationDelay: "160ms" }}
      >
        <label className="sr-only" htmlFor="name">Name</label>
        <input id="name" name="name" required maxLength={100} placeholder="Name" className={FIELD} />
        <label className="sr-only" htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required maxLength={255} placeholder="Email" className={FIELD} />
        <label className="sr-only" htmlFor="message">Message</label>
        <textarea id="message" name="message" required maxLength={2000} rows={6} placeholder="Message" className={`${FIELD} resize-none`} />
        <div className="flex items-center gap-6">
          <button
            type="submit"
            className="rounded-sm bg-primary px-10 py-4 text-[15px] font-medium text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Send Message
          </button>
          {sent && <p className="text-sm text-accent">Your email app should open now.</p>}
        </div>
      </form>

      <div className="mt-16 flex flex-col gap-14">
        <ArrowLink to="/">Go Back Home</ArrowLink>
        <SocialLinks />
      </div>
    </PageShell>
  );
}
