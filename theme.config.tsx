import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  logo: <span>adastack</span>,
  project: {
    link: "https://github.com/tuckpuck/adastack",
  },
  chat: {
		link: 'https://twitter.com/adastack_io',
	},
  docsRepositoryBase: "https://github.com/tuckpuck/adastack/blob/main/",
  footer: {
    text: "adastack",
  },
  useNextSeoProps() {
		return {
			titleTemplate: '%s | Adastack.io',
		};
	},
};

export default config;
