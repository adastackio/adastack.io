import React from "react";
import { DocsThemeConfig, ThemeSwitch, useTheme } from "nextra-theme-docs";
import {
  AdaStackLight,
  AdaStackDark,
  AdaStackMid,
  XIcon,
  GithubNavIcon,
} from "@components/icons";
import { Nunito } from "next/font/google";
import { useConfig } from "nextra-theme-docs";
import { useRouter } from "next/router";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const standard_seo_description =
  "Adastack is an explorer to check out everything on Cardano. Find dApps, games, community, NFTs, staking, development, governance, and much more.";

const config: DocsThemeConfig = {
  head: () => {
    const { asPath, defaultLocale, locale } = useRouter();
    const { frontMatter } = useConfig();
    const url =
      "https://adastack.io" +
      (defaultLocale === locale ? asPath : `/${locale}${asPath}`);

    let title = `${frontMatter.seo_title} | Adastack.io`;
    let description = frontMatter.seo_description
      ? frontMatter.seo_description
      : standard_seo_description;
    return (
      <>
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </>
    );
  },
  useNextSeoProps() {
    const { frontMatter } = useConfig();
    return {
      titleTemplate: `${frontMatter.seo_title} | Adastack.io`,
      description: frontMatter.seo_description
        ? frontMatter.seo_description
        : standard_seo_description,
      // Note: This sets pages to index only if there is an seo-description on the page. Remove the below line once all pages have content and seo-descriptions.
      noindex: frontMatter.seo_description ? false : true,
    };
  },
  search: { placeholder: "Search Cardano" },
  chat: {
    link: "https://x.com/adastackio",
    icon: (
      <>
        <XIcon />
      </>
    ),
  },
  project: {
    link: "https://github.com/adastackio",
    icon: (
      <>
        <GithubNavIcon />
      </>
    ),
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
    return (
      <>
        <AdaStackMid
          alt="Logo"
          height="100"
          width="75"
          viewBox="0 -4 100 50"
          className="adastack-logo"
        />
        <span
          className={`${nunito.className} adastack-title`}
          style={{ fontWeight: 800 }}
        >
          ADASTACK
        </span>
      </>
    );
  },
  gitTimestamp: null,
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
    titleComponent(props) {
      const title = props.title;
      const isInDevelopment = title.endsWith(" ");
      return (
        // Note: Remove this conditional class logic and related CSS once content has been added to all pages
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
  },
  feedback: {
    content: "",
    useLink() {
      return "https://github.com/adastackio/adastack.io/issues";
    },
  },
  docsRepositoryBase: "https://github.com/adastackio/adastack.io/blob/main/",
  footer: {
    text: null,
  },
};

export default config;
