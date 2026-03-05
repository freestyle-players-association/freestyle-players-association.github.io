import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Freestyle Players Association",
  tagline: "",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://freestyle-players-association.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "freestyle-players-association", // Usually your GitHub org/user name.
  projectName: "freestyle-players-association.github.io", // Usually your repo name.

  onBrokenLinks: "throw",
  trailingSlash: false,

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/fpa-social-card.jpg",
    navbar: {
      title: "Freestyle Players Association",
      logo: {
        alt: "Freestyle Players Association Logo",
        src: "img/logo.png",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          label: "Manuals",
          position: "left",
        },
        {
          href: "https://events.freestyledisc.org/",
          label: "Events Calendar",
          position: "right",
        },
        {
          href: "https://www.freestyledisc.org/",
          label: "FPA Site",
          position: "right",
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
