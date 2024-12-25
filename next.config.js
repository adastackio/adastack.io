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
      // Redirects to All Pages, leave these as permanent: false
      {
        source: "/intro_to_cardano",
        destination: "/all_pages#intro-to-cardano",
        permanent: false,
      },
      {
        source: "/staking:path(|/)",
        destination: "/all_pages#staking",
        permanent: false,
      },
      {
        source: "/community",
        destination: "/all_pages#community",
        permanent: false,
      },
      {
        source: "/ecosystem",
        destination: "/all_pages#ecosystem",
        permanent: false,
      },
      {
        source: "/dapps",
        destination: "/all_pages#dapps",
        permanent: false,
      },
      {
        source: "/nfts",
        destination: "/all_pages#nfts",
        permanent: false,
      },
      {
        source: "/gaming",
        destination: "/all_pages#gaming",
        permanent: false,
      },
      {
        source: "/governance",
        destination: "/all_pages#governance",
        permanent: false,
      },
      {
        source: "/catalyst",
        destination: "/all_pages#project-catalyst",
        permanent: false,
      },
      {
        source: "/daos",
        destination: "/all_pages#daos",
        permanent: false,
      },
      {
        source: "/development",
        destination: "/all_pages#development",
        permanent: false,
      },
      {
        source: "/on_chain_metrics",
        destination: "/all_pages#on-chain-metrics",
        permanent: false,
      },
      {
        source: "/partner_chains",
        destination: "/all_pages#partner-chains",
        permanent: false,
      },
      {
        source: "/layer_2s",
        destination: "/all_pages#layer-2s",
        permanent: false,
      },
      // Permanent Redirects
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
      {
        source: "/staking/reward_calculators", // old URL
        destination: "/staking/stake_reward_trackers", // new URL
        permanent: true, // permanent 308
      },
      {
        source: "/staking/reward_calendars", // old URL
        destination: "/staking/stake_reward_trackers", // new URL
        permanent: true, // permanent 308
      },
      {
        source: "/staking/reward_trackers", // old URL
        destination: "/staking/stake_reward_trackers", // new URL
        permanent: true, // permanent 308
      },
      {
        source: "/ecosystem/ecosystem_maps", // old URL
        destination: "/ecosystem/cardano_directories", // new URL
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
