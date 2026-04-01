import { getNavTree } from "$lib/nav.server.js";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = () => {
  return { nav: getNavTree() };
};
