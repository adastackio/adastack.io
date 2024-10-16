const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
});

module.exports = withNextra({
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
    ];
  },

  webpack(config) {
    const allowedSvgRegex = /components\/icons\/.+\.svg$/;

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
