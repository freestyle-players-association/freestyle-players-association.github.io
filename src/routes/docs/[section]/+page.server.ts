import { error } from "@sveltejs/kit";
import { getNavTree } from "$lib/nav.server.js";
import type { PageServerLoad, EntryGenerator } from "./$types";

export const load: PageServerLoad = ({ params }) => {
  const nav = getNavTree();
  const section = nav.find((s) => s.slug === params.section);
  if (!section) error(404, "Section not found");
  return { section };
};

export const entries: EntryGenerator = () => {
  return getNavTree().map((s) => ({ section: s.slug }));
};
