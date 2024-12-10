const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
});

module.exports = withNextra({
  env: {
    GITHUB_ACCESS_TOKEN: process.env.GITHUB_ACCESS_TOKEN,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    domains: ["www.google.com"],
  },
  async redirects() {
    return [
      {
        source: "/live_pages", // old URL
        destination: "/all_pages", // new URL
        permanent: true, // permanent 308
      },
      {
        source: "/ecosystem/dev_shops", // old URL
        destination: "/development/dev_teams", // new URL
        permanent: true, // permanent 308
      },
      {
        source: "/sidechains/what_are_sidechains", // old URL
        destination: "/partner_chains/what_are_partner_chains", // new URL
        permanent: true, // permanent 308
      },
    ];
  },

  webpack(config) {
    const allowedSvgRegex = /assets\/(icons|logos)\/.+\.svg$/;

    const fileLoaderRule = config.module.rules.find((rule) => {
      const testRegex = new RegExp(".svg");
      return testRegex.test(rule.test);
    });
    fileLoaderRule.exclude = allowedSvgRegex;

    config.module.rules.push({
      test: allowedSvgRegex,
      use: ["@svgr/webpack"],
    });
    return config;
  },
});
