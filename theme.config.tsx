import React from "react";
import { DocsThemeConfig, useTheme } from "nextra-theme-docs";
import { AdaStackLight, AdaStackDark } from '@components/icons'

const config: DocsThemeConfig = {
  useNextSeoProps() {
    return {
      titleTemplate: "%s | Adastack.io",
    };
  },

  search: { placeholder: "Search Tools" },
  project: {
    // link: "https://github.com/tuckpuck/adastack",
  },
  // chat: {
  //   link: 'https://twitter.com/adastack_io',
  //   icon: (
  //     <svg width="24" height="24" viewBox="0 0 248 204">
  //       <path
  //         fill="currentColor"
  //         d="M221.95 51.29c.15 2.17.15 4.34.15 6.53 0 66.73-50.8 143.69-143.69 143.69v-.04c-27.44.04-54.31-7.82-77.41-22.64 3.99.48 8 .72 12.02.73 22.74.02 44.83-7.61 62.72-21.66-21.61-.41-40.56-14.5-47.18-35.07a50.338 50.338 0 0 0 22.8-.87C27.8 117.2 10.85 96.5 10.85 72.46v-.64a50.18 50.18 0 0 0 22.92 6.32C11.58 63.31 4.74 33.79 18.14 10.71a143.333 143.333 0 0 0 104.08 52.76 50.532 50.532 0 0 1 14.61-48.25c20.34-19.12 52.33-18.14 71.45 2.19 11.31-2.23 22.15-6.38 32.07-12.26a50.69 50.69 0 0 1-22.2 27.93c10.01-1.18 19.79-3.86 29-7.95a102.594 102.594 0 0 1-25.2 26.16z"
  //       />
  //     </svg>
  //   )
  // },
  themeSwitch: {
    useOptions() {
      return {
        light: "Light",
        dark: "Dark",
        system: "System",
      };
    },
  },
  nextThemes: {
    defaultTheme: 'dark',
  },
  logo: () => {
    const { resolvedTheme } = useTheme();

    if (resolvedTheme === 'light' || !resolvedTheme) {
      return (<><AdaStackDark alt="Logo" height="100" width="75" viewBox="0 -4 100 50" className="adastack-logo"/>
      <span className="adastack-title" style={{ fontWeight: 800 }}>Adastack</span></>)
    }

    if (resolvedTheme === 'dark') {
    return (<><AdaStackLight alt="Logo" height="100" width="75" viewBox="0 -4 100 50" className="adastack-logo" /><span className="adastack-title" style={{ fontWeight: 800 }}>Adastack</span></>)
    }
  },
  gitTimestamp: null,
  // banner: {
  //   key: '2.0-release',
  //   text: (
  //     <a href="https://nextra.site" target="_blank">
  //       🎉 Nextra 2.0 is released. Read more →
  //     </a>
  //   )
  // },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
    // titleComponent({ title, type }) {
    //   if (title === 'Explore') {
    //     return <>🧭 {title}</>
    //   }
    //   if (title === 'Development') {
    //     return <>💻 {title}</>
    //   }
    //   return <>{title}</>
    // }
  },
  toc: {
    float: true,
  },
  footer: {
    text: (
      <>
        <a href="https://adastackbeta.vercel.app/suggestatool">
          Suggest a Tool
        </a>
      </>
    ),
  },
  feedback: {
    content: "Suggest a Tool",
    useLink() {
      return "suggestatool";
    },
  },
  docsRepositoryBase: "https://github.com/tuckpuck/adastack/blob/main/",
};

export default config;
