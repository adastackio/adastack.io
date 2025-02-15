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

const default_seo_description =
  "Explore the Cardano ecosystem: Apps, Games, NFTs, Staking, Community, DAOs, Layer 2s, Sidechains, Metrics & ADA price. Your guide to Cardano.";

const default_seo_title = "Cardano Explorer | Adastack.io";

const config: DocsThemeConfig = {
  head: () => {
    const { asPath, defaultLocale, locale } = useRouter();
    const { frontMatter } = useConfig();
    const baseUrl = "https://adastack.io";
    const url =
      baseUrl + (defaultLocale === locale ? asPath : `/${locale}${asPath}`);

    let title = frontMatter.seo_title
      ? `${frontMatter.seo_title} | Adastack.io`
      : default_seo_title;
    let description = frontMatter.seo_description
      ? frontMatter.seo_description
      : default_seo_description;
    return (
      <>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="apple-mobile-web-app-title" content="adastack.io" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={`${baseUrl}/adastack_open_graph.png`}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Adastack Cardano Explorer Image"
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:site_name" content="Adastack.io" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="adastack.io" />
        <meta property="twitter:url" content={url} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </>
    );
  },
  useNextSeoProps() {
    const { asPath, defaultLocale, locale } = useRouter();
    const { frontMatter } = useConfig();
    const default_seo_title = "Cardano Explorer | Adastack.io";
    const default_seo_description =
      "Explore the Cardano ecosystem: Apps, Games, NFTs, Staking, Community, DAOs, Layer 2s, Sidechains, Metrics & ADA price. Your guide to Cardano.";
    const url =
      "https://adastack.io" +
      (defaultLocale === locale ? asPath : `/${locale}${asPath}`);
    return {
      titleTemplate: frontMatter.seo_title
        ? `${frontMatter.seo_title} | Adastack.io`
        : default_seo_title,
      description: frontMatter.seo_description
        ? frontMatter.seo_description
        : default_seo_description,
      // Note: This sets pages to index only if there is an seo-description on the page. Remove the below line once all pages have content and seo-descriptions.
      noindex: frontMatter.seo_description ? false : true,
      openGraph: {
        type: "website",
        url: url,
        images: [
          {
            url: "https://adastack.io/adastack_open_graph.png",
            width: 1200,
            height: 630,
            alt: "Adastack Cardano Explorer Image",
          },
        ],
        siteName: "Adastack.io",
      },
      twitter: {
        cardType: "summary_large_image",
        site: "@adastackio",
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
