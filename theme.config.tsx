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
  head: () => {
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

    return (
      <>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={site_description} />
        <meta property="og:title" content={site_title} />
        <meta property="og:description" content={site_description} />
        <meta property="og:url" content={page_url} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Adastack.io" />
        <meta
          property="og:image"
          content={`${base_url}/adastack_open_graph.png`}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Adastack Cardano Explorer Image"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@adastackio" />
        <meta name="twitter:creator" content="@adastackio" />
        <meta name="twitter:title" content={site_title} />
        <meta name="twitter:description" content={site_description} />
        <meta
          name="twitter:image"
          content={`${base_url}/adastack_open_graph.png`}
        />
        <link rel="canonical" href={page_url} />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
      </>
    );
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
    content: null,
  },
};

export default config;
