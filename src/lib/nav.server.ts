import { readFileSync, readdirSync, statSync, existsSync } from "fs";
import { join } from "path";
import matter from "gray-matter";

export type NavPage = {
  title: string;
  slug: string;
  href: string;
};

export type NavSection = {
  title: string;
  slug: string;
  pages: NavPage[];
};

export type NavTree = NavSection[];

const DOCS_DIR = join(process.cwd(), "src/routes/docs");

function titleCase(str: string): string {
  return str
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function getPageMeta(dirPath: string, dirName: string): { title: string; order: number } {
  const mdPath = join(dirPath, "+page.md");
  if (existsSync(mdPath)) {
    try {
      const { data } = matter(readFileSync(mdPath, "utf-8"));
      return {
        title: data.title ?? titleCase(dirName),
        order: data.order ?? 999,
      };
    } catch {
      // fall through
    }
  }
  return { title: titleCase(dirName), order: 999 };
}

export function getNavTree(): NavTree {
  const sections: NavSection[] = [];

  for (const entry of readdirSync(DOCS_DIR).sort()) {
    const entryPath = join(DOCS_DIR, entry);
    if (!statSync(entryPath).isDirectory()) continue;
    if (entry.startsWith("_") || entry.startsWith("+") || entry.startsWith("[")) continue;

    const pages: Array<NavPage & { _order: number }> = [];

    for (const file of readdirSync(entryPath)) {
      if (file.startsWith("_") || file.startsWith("+") || file.startsWith("[")) continue;
      const filePath = join(entryPath, file);
      if (!statSync(filePath).isDirectory()) continue;
      if (!existsSync(join(filePath, "+page.md")) && !existsSync(join(filePath, "+page.svelte"))) continue;

      const { title, order } = getPageMeta(filePath, file);
      pages.push({ title, slug: file, href: `/docs/${entry}/${file}`, _order: order });
    }

    sections.push({
      title: titleCase(entry),
      slug: entry,
      pages: pages.sort((a, b) => a._order - b._order).map(({ _order: _, ...p }) => p),
    });
  }

  return sections;
}
