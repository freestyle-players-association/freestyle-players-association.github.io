import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ url, parent }) => {
  const { nav } = await parent();

  for (const section of nav) {
    const idx = section.pages.findIndex((p) => p.href === url.pathname);
    if (idx >= 0) {
      return {
        prevPage: idx > 0 ? section.pages[idx - 1] : null,
        nextPage: idx < section.pages.length - 1 ? section.pages[idx + 1] : null,
        currentTitle: section.pages[idx].title,
      };
    }
  }

  return { prevPage: null, nextPage: null, currentTitle: null };
};
