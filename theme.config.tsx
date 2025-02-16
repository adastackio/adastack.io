import React from "react";
import { DocsThemeConfig, useTheme } from "nextra-theme-docs";
import { XIcon, GithubNavIcon } from "./assets/icons";
import {
  BlueDarkAdastackLogoFull,
  BlueLightAdastackLogoFull,
} from "./assets/logos";
import { useConfig } from "nextra-theme-docs";
import { useRouter } from "next/router";
import OS from "./components/badges/OS";

const config: DocsThemeConfig = {
  useNextSeoProps() {
    const { asPath, defaultLocale, locale } = useRouter();
    const { frontMatter } = useConfig();

    const base_url = "https://adastack.io";
    const page_url =
      base_url + (defaultLocale === locale ? asPath : `/${locale}${asPath}`);

    const default_seo_title = "Cardano Explorer | Adastack.io";
    const site_title = frontMatter.seo_title
      ? `${frontMatter.seo_title} | Adastack.io`
      : default_seo_title;

    const default_seo_description =
      "Explore the Cardano ecosystem: Apps, Games, NFTs, Staking, Community, DAOs, Layer 2s, Sidechains, Metrics & ADA price. Your guide to Cardano.";
    const site_description = frontMatter.seo_description
      ? frontMatter.seo_description
      : default_seo_description;

    return {
      titleTemplate: site_title,
      description: site_description,
      noindex: frontMatter.seo_description ? false : true,
      canonical: page_url,
      mobileAlternate: {
        media: "only screen and (max-width: 640px)",
        href: page_url,
      },
      additionalMetaTags: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1.0",
        },
        {
          name: "apple-mobile-web-app-title",
          content: "adastack.io",
        },
      ],
      additionalLinkTags: [
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/favicon.svg",
        },
        {
          rel: "shortcut icon",
          href: "/favicon.ico",
        },
        {
          rel: "manifest",
          href: "/site.webmanifest",
        },
      ],
      openGraph: {
        type: "website",
        url: page_url,
        site_name: "Adastack.io",
        images: [
          {
            url: `${base_url}/adastack_open_graph.png`,
            width: 1200,
            height: 630,
            alt: "Adastack Cardano Explorer Image",
            type: "image/png",
          },
        ],
        title: site_title,
        description: site_description,
      },
      twitter: {
        cardType: "summary_large_image",
        site: "@adastackio",
        handle: "@adastackio",
        title: site_title,
        description: site_description,
      },
    };
  },
  search: { placeholder: "Search Cardano" },
  chat: {
    link: "https://x.com/adastackio",
    icon: <XIcon />,
  },
  project: {
    link: "https://github.com/adastackio",
    icon: <GithubNavIcon />,
  },
  themeSwitch: {
    useOptions() {
      return {
        light: "Light",
        dark: "Dark",
        system: "Auto",
      };
    },
  },
  nextThemes: {
    defaultTheme: "system",
  },
  logo: () => {
    const { resolvedTheme } = useTheme();
    return (
      <>
        <span className="adastack-logo-container">
          {resolvedTheme === "dark" ? (
            <BlueLightAdastackLogoFull className="adastack-logo" />
          ) : (
            <BlueDarkAdastackLogoFull className="adastack-logo" />
          )}
        </span>
      </>
    );
  },
  gitTimestamp: null,
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
    titleComponent({ title }) {
      // Note: Remove this variable, conditional class logic, and related CSS once content has been added to all pages. Keep the 'sidebar-menu-item' part below.
      const isInDevelopment = title.endsWith(" ");
      return (
        <div
          className={`sidebar-menu-item ${
            isInDevelopment ? "page-in-development" : ""
          }`}
        >
          {title}
        </div>
      );
    },
  },
  toc: {
    float: true,
    title: "Table of Contents",
  },
  feedback: {
    content: "",
    useLink() {
      return "https://github.com/adastackio/adastack.io/issues";
    },
  },
  components: {
    OS: OS,
  },
  docsRepositoryBase: "https://github.com/adastackio/adastack.io/blob/main/",
  footer: {
    text: null,
  },
};

export default config;
