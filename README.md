# FPA Docs

The official documentation site for the Freestyle Players Association — rules, judging standards, competition manuals, and rankings documentation.

Built with SvelteKit (static output), MDsveX for Markdown rendering, and Tailwind CSS.

---

## Local development

```bash
npm install
npm run dev
```

The site runs at `http://localhost:5173`. The dev server hot-reloads on file changes including Markdown edits.

To preview a production build:

```bash
npm run build
npx serve build
```

---

## Adding documentation

### File structure

Docs live in `src/routes/docs/` and are organized into **sections**, each containing **pages**:

```
src/routes/docs/
├── competition-manual/
│   ├── event-progression/
│   │   └── +page.md              ← page content
│   └── judging-manual/
│       └── +page.md
└── rankings-explained/
    └── explanation/
        └── +page.md
```

Each page is a folder containing a `+page.md` file. The URL matches the folder path directly: `competition-manual/event-progression` → `/docs/competition-manual/event-progression`.

### Ordering

Sections are sorted alphabetically. Pages are sorted by the `order` field in frontmatter, falling back to alphabetical.

### Section titles

Derived automatically from the folder name — `competition-manual` becomes "Competition Manual". No config needed.

### Page frontmatter

```md
---
title: Event Progression
order: 1
---

# Event Progression
...
```

| Field | Description |
|---|---|
| `title` | Page title shown in the sidebar and browser tab. Falls back to the folder name if omitted. |
| `order` | Sort position within the section. Omit if alphabetical order is fine. |

### Markdown

Pages are standard Markdown. Fenced code blocks are syntax-highlighted automatically. Headings (`##`, `###`) are picked up by the table of contents panel on the right side of each page.

### Adding a new page

1. Create a folder under the appropriate section: `src/routes/docs/[section]/[page-name]/`
2. Add a `+page.md` with frontmatter and content
3. The page appears in the sidebar automatically — no config needed

### Adding a new section

1. Create a folder under `src/routes/docs/`: e.g. `src/routes/docs/new-section/`
2. Add pages inside it as above — the section title is derived from the folder name automatically
