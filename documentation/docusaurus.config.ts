import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  markdown: {
    mermaid: true,
  },
  themes: ["@docusaurus/theme-mermaid"],
  title: "Faatere Documentation",
  tagline: "Member management for Polynesian political parties",
  favicon: "img/favicon.ico",

  url: "https://docs.faatere.pf",
  baseUrl: "/",

  organizationName: "faatere",
  projectName: "faatere-docs",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

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
          editUrl:
            "https://github.com/faatere/faatere/tree/main/documentation/",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/logos/2.png",
    navbar: {
      title: "Faatere",
      logo: {
        alt: "Faatere Logo",
        src: "img/logos/2.png",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "docs",
          position: "left",
          label: "Documentation",
        },
        {
          href: "https://github.com/faatere/faatere",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Documentation",
          items: [
            {
              label: "Getting Started",
              to: "/docs/",
            },
            {
              label: "Tech Stack",
              to: "/docs/tech-stack",
            },
            {
              label: "Environment Setup",
              to: "/docs/environment-setup",
            },
          ],
        },
        {
          title: "Features",
          items: [
            {
              label: "Authentication",
              to: "/docs/feature-authentication",
            },
            {
              label: "Members",
              to: "/docs/feature-members",
            },
            {
              label: "Tomites",
              to: "/docs/feature-tomites",
            },
          ],
        },
        {
          title: "Links",
          items: [
            {
              label: "Architecture",
              to: "/docs/architecture",
            },
            {
              label: "Deployment",
              to: "/docs/deployment",
            },
            {
              label: "GitHub",
              href: "https://github.com/faatere/faatere",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Faatere. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["bash", "json", "typescript", "sql"],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
