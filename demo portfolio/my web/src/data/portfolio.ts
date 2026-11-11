import formWhisper from "@/assets/projects/form-whisper.jpg";
import hueGarden from "@/assets/projects/hue-garden.jpg";
import loomAndLeaf from "@/assets/projects/loom-and-leaf.jpg";
import monsoonUi from "@/assets/projects/monsoon-ui.jpg";
import pathfinder from "@/assets/projects/pathfinder.jpg";
import quietHours from "@/assets/projects/quiet-hours.jpg";
import tinyMotion from "@/assets/projects/tiny-motion.jpg";
import waveform from "@/assets/projects/waveform.jpg";

// Sample portfolio content for Nira. Replace with real projects and writing.

export const PROJECT_FILTERS = ["All", "Projects", "Dev Tools", "Open Source", "Designs"] as const;
export type ProjectFilter = (typeof PROJECT_FILTERS)[number];

export type Project = {
  title: string;
  summary: string;
  category: Exclude<ProjectFilter, "All">;
  tags: string[];
  cover: 1 | 2 | 3 | 4 | 5 | 6;
  tagline: string;
  /** Screenshot / mockup shown on the project card. */
  image: string;
  /** Link to project website or repository. */
  url?: string;
};

export const PROJECTS: Project[] = [
  {
    title: "Hue Garden",
    summary: "A palette builder that turns a mood or a photo into colors you can ship.",
    category: "Projects",
    tags: ["React", "Tailwind", "Canvas"],
    cover: 1,
    tagline: "Colors that grow on you",
    image: hueGarden,
    url: "https://google.com",
  },
  {
    title: "Pathfinder",
    summary: "A keyboard-first command bar that gets visitors anywhere on a docs site in two keystrokes.",
    category: "Dev Tools",
    tags: ["TypeScript", "React", "Vite"],
    cover: 2,
    tagline: "⌘K to anywhere",
    image: pathfinder,
    url: "https://google.com",
  },
  {
    title: "Loom & Leaf",
    summary: "An online shop for handwoven textiles with a calm, photo-led checkout.",
    category: "Projects",
    tags: ["Next.js", "Stripe", "Sanity"],
    cover: 3,
    tagline: "Made by hand",
    image: loomAndLeaf,
    url: "https://google.com",
  },
  {
    title: "tiny-motion",
    summary: "A 2kb helper for spring animations that respects reduced-motion settings.",
    category: "Open Source",
    tags: ["TypeScript", "Rollup"],
    cover: 4,
    tagline: "npm i tiny-motion",
    image: tinyMotion,
    url: "https://google.com",
  },
  {
    title: "Quiet Hours",
    summary: "A browser extension that dims distracting tabs while you focus.",
    category: "Dev Tools",
    tags: ["React", "Chrome APIs"],
    cover: 5,
    tagline: "Focus, gently",
    image: quietHours,
    url: "https://google.com",
  },
  {
    title: "Monsoon UI",
    summary: "A rain-inspired design system with 60+ components and dark mode built in.",
    category: "Designs",
    tags: ["Figma", "Design Tokens"],
    cover: 6,
    tagline: "Design system",
    image: monsoonUi,
    url: "https://google.com",
  },
  {
    title: "Waveform",
    summary: "A minimal web music player with live audio visuals.",
    category: "Projects",
    tags: ["React", "Web Audio", "Zustand"],
    cover: 2,
    tagline: "Hear it, see it",
    image: waveform,
    url: "https://google.com",
  },
  {
    title: "form-whisper",
    summary: "Accessible form validation messages that screen readers announce at the right time.",
    category: "Open Source",
    tags: ["JavaScript", "a11y"],
    cover: 1,
    tagline: "Errors, politely",
    image: formWhisper,
    url: "https://google.com",
  },
];

export const READ_FILTERS = ["All", "Articles", "Readings", "Videos"] as const;
export type ReadFilter = (typeof READ_FILTERS)[number];

export type Read = {
  title: string;
  excerpt: string;
  category: Exclude<ReadFilter, "All">;
  cover: 1 | 2 | 3 | 4 | 5 | 6;
  tall?: boolean;
  date: string;
};

export const READS: Read[] = [
  {
    title: "Why I Stopped Reaching for State Libraries First",
    excerpt: "Most screens need far less global state than we think. Here is how I decide what goes where.",
    category: "Articles",
    cover: 4,
    tall: true,
    date: "Oct 2026",
  },
  {
    title: "Shadows That Feel Real",
    excerpt: "Stacking a few soft shadows gives cards depth without looking muddy.",
    category: "Articles",
    cover: 2,
    date: "Aug 2026",
  },
  {
    title: "Building a Tiny Router From Scratch",
    excerpt: "A 20-minute walkthrough of how client-side routing works under the hood.",
    category: "Videos",
    cover: 5,
    date: "Jul 2026",
  },
  {
    title: "Notes From My Design Bookshelf",
    excerpt: "Five books that changed how I think about spacing, type and hierarchy.",
    category: "Readings",
    cover: 3,
    tall: true,
    date: "May 2026",
  },
  {
    title: "Designing for Slow Networks",
    excerpt: "Skeletons, optimistic updates and other tricks that make slow feel fast.",
    category: "Articles",
    cover: 6,
    date: "Mar 2026",
  },
  {
    title: "My Accessibility Checklist",
    excerpt: "The short list I run through before any project goes live.",
    category: "Readings",
    cover: 1,
    date: "Jan 2026",
  },
];

export function filterByCategory<T extends { category: string }>(items: T[], filter: string): T[] {
  return filter === "All" ? items : items.filter((item) => item.category === filter);
}
