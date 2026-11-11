import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

type PagePath = "/" | "/about" | "/projects" | "/articles" | "/contact";

const NAV: { label: string; to: Exclude<PagePath, "/"> }[] = [
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Articles", to: "/articles" },
  { label: "Contact", to: "/contact" },
];

export function Asterisk() {
  return (
    <svg viewBox="0 0 48 48" className="h-11 w-11 fill-heading" aria-hidden="true">
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <ellipse key={deg} cx="24" cy="11" rx="3.6" ry="9" transform={`rotate(${deg} 24 24)`} />
      ))}
    </svg>
  );
}

function ThemeToggle() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const isDark = saved !== "light";
    document.documentElement.classList.toggle("dark", isDark);
    setDark(isDark);
  }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };
  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="ml-2 text-heading transition-transform duration-500 hover:rotate-180 sm:ml-4"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <circle cx="12" cy="12" r="10.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 1.5a10.5 10.5 0 0 1 0 21z" fill="currentColor" />
      </svg>
    </button>
  );
}

export function SiteHeader({ current }: { current: PagePath }) {
  return (
    <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-12">
      <Link to="/" aria-label="Home">
        <Asterisk />
      </Link>
      <nav className="flex items-center gap-4 sm:gap-8">
        {NAV.filter((item) => item.to !== current).map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="text-[15px] text-nav-link transition-colors hover:text-heading"
          >
            {item.label}
          </Link>
        ))}
        <ThemeToggle />
      </nav>
    </header>
  );
}

/** Large faint serif word in the background. "side" runs vertically down the left edge. */
export function Watermark({ text, position = "side" }: { text: string; position?: "side" | "bottom" | undefined }) {
  if (position === "bottom") {
    return (
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-4 bottom-[-3rem] select-none font-serif text-[9rem] leading-none text-watermark md:text-[18rem]"
      >
        {text}
      </span>
    );
  }
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -left-6 top-0 hidden select-none font-serif text-[16rem] leading-none text-watermark [writing-mode:vertical-rl] lg:block"
    >
      {text}
    </span>
  );
}

export function PageShell({
  current,
  watermark,
  watermarkPosition,
  children,
}: {
  current: PagePath;
  watermark: string;
  watermarkPosition?: "side" | "bottom" | undefined;
  children: ReactNode;
}) {
  return (
    <div className="bg-grid-glow relative min-h-screen overflow-hidden bg-background">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4">
        Skip to main content
      </a>
      <Watermark text={watermark} position={watermarkPosition} />
      <SiteHeader current={current} />
      <main id="main-content" className="relative z-10 mx-auto max-w-6xl px-6 pb-32 md:px-24">
        {children}
      </main>
    </div>
  );
}

export function PageTitle({ children }: { children: ReactNode }) {
  return (
    <h1 className="animate-fade-up mt-10 text-5xl font-extrabold tracking-tight text-heading md:text-6xl">
      {children}
    </h1>
  );
}

export function FilterTabs<T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div role="tablist" className="animate-fade-up mt-14 flex flex-wrap justify-center gap-2" style={{ animationDelay: "100ms" }}>
      {options.map((opt) => (
        <button
          key={opt}
          role="tab"
          aria-selected={opt === value}
          onClick={() => onChange(opt)}
          className={
            opt === value
              ? "rounded-md bg-secondary px-5 py-1.5 text-[15px] font-semibold text-heading"
              : "rounded-md px-4 py-1.5 text-[15px] text-article transition-colors hover:text-heading"
          }
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export function ArrowLink({ to, children }: { to: PagePath; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-5 text-[15px] text-article transition-colors hover:text-heading"
    >
      {children}
      <svg
        viewBox="0 0 28 12"
        className="h-3 w-7 transition-transform duration-300 group-hover:translate-x-2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        aria-hidden="true"
      >
        <path d="M0 6h27M21.5 0.5 27 6l-5.5 5.5" />
      </svg>
    </Link>
  );
}

const SOCIALS: { label: string; href: string; path: ReactNode }[] = [
  {
    label: "Twitter",
    href: "https://twitter.com",
    path: (
      <path d="M22 5.9c-.7.3-1.5.5-2.4.6.9-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.4 4.6a4.1 4.1 0 0 0 1.3 5.5c-.7 0-1.3-.2-1.9-.5 0 2 1.4 3.7 3.3 4.1-.6.2-1.2.2-1.9.1.5 1.6 2.1 2.8 3.9 2.9A8.2 8.2 0 0 1 2 18.4 11.6 11.6 0 0 0 8.3 20c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.1z" />
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    path: <path d="M14 8.5V6.6c0-.8.2-1.3 1.4-1.3H17V2.2C16.7 2.1 15.7 2 14.6 2 12.2 2 10.6 3.5 10.6 6.1v2.4H8v3.4h2.6V22H14V11.9h2.6l.4-3.4z" />,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    path: (
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.2c0-1.2 0-2.9-1.8-2.9s-2 1.4-2 2.8V21h-4z" />
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com",
    path: (
      <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .6 1.4.2 2.4.1 2.7.7.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.6 5 .4.3.7.9.7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2z" />
    ),
  },
  {
    label: "Dribbble",
    href: "https://dribbble.com",
    path: (
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        d="M12 2.5a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19zM8.5 3.3c3 3.6 5.6 8.6 7 17M2.7 10.2c5.3.3 11.6-.9 15.6-4.8M5.3 18.6c3.4-4.3 8.4-6 15.9-4.2"
      />
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    path: (
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        d="M7.5 2.75h9a4.75 4.75 0 0 1 4.75 4.75v9a4.75 4.75 0 0 1-4.75 4.75h-9a4.75 4.75 0 0 1-4.75-4.75v-9A4.75 4.75 0 0 1 7.5 2.75zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM17.3 6.4h.01"
      />
    ),
  },
];

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-8 ${className}`}>
      {SOCIALS.map((s) => (
        <li key={s.label}>
          <a
            href={s.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${s.label} Page`}
            title={`${s.label} Page`}
            className="block text-article transition-colors hover:text-accent"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
              {s.path}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
