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

// Docs live as +page.md / +page.svelte inside src/routes/docs/
const DOCS_DIR = join(process.cwd(), "src/routes/docs");

function stripNumericPrefix(name: string): string {
  return name.replace(/^\d+-/, "");
}

function titleCase(str: string): string {
  return str
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function labelFromName(name: string): string {
  return titleCase(stripNumericPrefix(name));
}

function getPageTitle(dirPath: string, dirName: string): string {
  const fallback = labelFromName(dirName);
  const mdPath = join(dirPath, "+page.md");
  if (!existsSync(mdPath)) return fallback;
  try {
    const content = readFileSync(mdPath, "utf-8");
    const { data } = matter(content);
    return data.title || data.sidebar_label || data["sidebar-label"] || fallback;
  } catch {
    return fallback;
  }
}

function getSectionTitle(sectionPath: string, dirName: string): string {
  const fallback = labelFromName(dirName);
  try {
    const raw = readFileSync(join(sectionPath, "_category_.json"), "utf-8");
    const data = JSON.parse(raw);
    return data.label || fallback;
  } catch {
    /* ignore */
  }
  try {
    const raw = readFileSync(join(sectionPath, "_category_.md"), "utf-8");
    const { data } = matter(raw);
    return data.title || fallback;
  } catch {
    /* ignore */
  }
  return fallback;
}

function getSectionOrder(sectionPath: string, dirName: string): number {
  const match = dirName.match(/^(\d+)-/);
  if (match) return parseInt(match[1]);
  try {
    const raw = readFileSync(join(sectionPath, "_category_.json"), "utf-8");
    const data = JSON.parse(raw);
    return data.position ?? 999;
  } catch {
    /* ignore */
  }
  return 999;
}

function getPageOrder(dirPath: string, dirName: string): number {
  const match = dirName.match(/^(\d+)-/);
  if (match) return parseInt(match[1]);
  const mdPath = join(dirPath, "+page.md");
  if (!existsSync(mdPath)) return 999;
  try {
    const content = readFileSync(mdPath, "utf-8");
    const { data } = matter(content);
    const pos = data.sidebar_position ?? data["sidebar-position"] ?? data.nav_order;
    if (pos !== undefined) return parseInt(String(pos));
  } catch {
    /* ignore */
  }
  return 999;
}

let _cache: NavTree | null = null;

export function getNavTree(): NavTree {
  if (_cache) return _cache;

  const sections: Array<NavSection & { _order: number }> = [];

  for (const entry of readdirSync(DOCS_DIR)) {
    const entryPath = join(DOCS_DIR, entry);
    if (!statSync(entryPath).isDirectory()) continue;
    if (entry.startsWith("_") || entry.startsWith("+") || entry.startsWith("[")) continue;

    const sectionSlug = stripNumericPrefix(entry);
    const sectionTitle = getSectionTitle(entryPath, entry);
    const sectionOrder = getSectionOrder(entryPath, entry);

    const pages: Array<NavPage & { _order: number }> = [];

    for (const file of readdirSync(entryPath)) {
      if (file.startsWith("_") || file.startsWith("+") || file.startsWith("[")) continue;
      const filePath = join(entryPath, file);
      if (!statSync(filePath).isDirectory()) continue;

      // A page directory must contain +page.md or +page.svelte
      const hasMd = existsSync(join(filePath, "+page.md"));
      const hasSvelte = existsSync(join(filePath, "+page.svelte"));
      if (!hasMd && !hasSvelte) continue;

      const pageSlug = stripNumericPrefix(file);
      const pageTitle = getPageTitle(filePath, file);
      const pageOrder = getPageOrder(filePath, file);

      pages.push({
        title: pageTitle,
        slug: pageSlug,
        href: `/docs/${sectionSlug}/${pageSlug}`,
        _order: pageOrder,
      });
    }

    sections.push({
      title: sectionTitle,
      slug: sectionSlug,
      pages: pages.sort((a, b) => a._order - b._order).map(({ _order: _, ...p }) => p),
      _order: sectionOrder,
    });
  }

  _cache = sections.sort((a, b) => a._order - b._order).map(({ _order: _, ...s }) => s);

  return _cache;
}
