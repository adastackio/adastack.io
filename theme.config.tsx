import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  logo: <span>Cardano Library</span>,
  project: {
    link: "https://github.com/tuckpuck/cardanolibrary.co",
  },
  chat: {
    link: "https://discord.com",
  },
  docsRepositoryBase:
    "https://github.com/tuckpuck/cardanolibrary.co/blob/main/",
  footer: {
    text: "Cardano Library",
  },
};

export default config;
