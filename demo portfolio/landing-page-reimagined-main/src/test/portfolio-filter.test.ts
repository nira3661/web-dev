import { describe, expect, it } from "vitest";

import { PROJECTS, READS, filterByCategory } from "@/data/portfolio";

describe("portfolio filters", () => {
  it("'All' shows every project", () => {
    expect(filterByCategory(PROJECTS, "All")).toHaveLength(PROJECTS.length);
  });

  it("'Open Source' shows only open-source projects", () => {
    const items = filterByCategory(PROJECTS, "Open Source");
    expect(items.length).toBeGreaterThan(0);
    expect(items.every((p) => p.category === "Open Source")).toBe(true);
  });

  it("'Videos' shows only videos", () => {
    const items = filterByCategory(READS, "Videos");
    expect(items.map((r) => r.category)).toEqual(["Videos"]);
  });
});
