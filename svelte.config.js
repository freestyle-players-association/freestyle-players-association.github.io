import { mdsvex } from "mdsvex";
import rehypeSlug from "rehype-slug";
import adapter from "@sveltejs/adapter-static";
import { relative, sep } from "node:path";

let _highlighter;
async function highlight(code, lang) {
  if (!_highlighter) {
    const { createHighlighter } = await import("shiki");
    _highlighter = await createHighlighter({
      themes: ["github-light", "github-dark"],
      langs: [
        "javascript",
        "typescript",
        "svelte",
        "json",
        "bash",
        "css",
        "html",
        "yaml",
        "markdown",
        "text",
      ],
    });
  }
  return _highlighter.codeToHtml(code, {
    lang: lang || "text",
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  });
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  compilerOptions: {
    runes: ({ filename }) => {
      const relativePath = relative(import.meta.dirname, filename);
      const pathSegments = relativePath.toLowerCase().split(sep);
      const isExternalLibrary = pathSegments.includes("node_modules");
      // mdsvex always generates context="module" (pre-runes syntax), so exclude all .md/.svx files
      const isMdsvex = filename.endsWith(".md") || filename.endsWith(".svx");
      return isExternalLibrary || isMdsvex ? undefined : true;
    },
  },
  kit: {
    adapter: adapter(),
  },
  preprocess: [
    mdsvex({
      extensions: [".svx", ".md"],
      highlight: { highlighter: highlight },
      rehypePlugins: [rehypeSlug],
    }),
  ],
  extensions: [".svelte", ".svx", ".md"],
};

export default config;
