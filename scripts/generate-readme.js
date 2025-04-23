const fs = require("fs");
const path = require("path");

// Load the builders data
const buildersData = require("../data/builders.json");

// Constants for reuse
const GITHUB_ICON = "[GitHub Icon]";
const GITHUB_ICON_URL =
  "https://raw.githubusercontent.com/adastackio/adastack.io/readme/assets/icons/github_readme.svg";

// Function to generate a markdown list for a specific category
function generateCategoryList(category, items) {
  let headingLevel = category.level === 1 ? 1 : 3;
  let markdown = `${"#".repeat(headingLevel)} ${category.name}\n\n`;

  // Add description if it exists, formatted as a blockquote
  if (category.description) {
    // Split by newlines and add '> ' prefix to each line
    const formattedDescription = category.description
      .split("\n")
      .map((line) => `> ${line}`)
      .join("\n");

    markdown += `${formattedDescription}\n\n`;
  }

  // If this is a section with no items, just return the header
  if (!items || items.length === 0) {
    return markdown;
  }

  // Sort items by GitHub presence
  const sortedItems = [...items].sort((a, b) => {
    if (a.teamGithubURL && !b.teamGithubURL) return -1;
    if (!a.teamGithubURL && b.teamGithubURL) return 1;
    return 0;
  });

  sortedItems.forEach((item) => {
    if (!item.name || !item.website) return; // Skip incomplete entries

    const nameWithLink = `[${item.name}](${item.website})`;

    if (item.teamGithubURL) {
      // Using the reference-style link
      markdown += `- ${nameWithLink} [![GitHub]${GITHUB_ICON}](${item.teamGithubURL})\n`;
    } else {
      markdown += `- ${nameWithLink}\n`;
    }
  });

  markdown += "\n";
  return markdown;
}

// Helper function to generate international content sections
function generateInternationalContent(sectionName, items, tagSuffix) {
  let markdown = `### ${sectionName}\n\n`;

  if (items.length === 0) {
    return markdown + "\n";
  }

  // Sort items by GitHub presence
  const sortedItems = [...items].sort((a, b) => {
    if (a.teamGithubURL && !b.teamGithubURL) return -1;
    if (!a.teamGithubURL && b.teamGithubURL) return 1;
    return 0;
  });

  sortedItems.forEach((item) => {
    if (!item.name || !item.website) return; // Skip incomplete entries

    // Find the language tag
    const langTag = item.tags.find((tag) => tag.endsWith(tagSuffix));
    if (!langTag) return;

    // Extract language name from tag (e.g., "portuguese" from "portuguese_lang_blog")
    const language = langTag.replace(tagSuffix, "");
    const formattedLanguage =
      language.charAt(0).toUpperCase() + language.slice(1);

    const nameWithLink = `[${item.name}](${item.website})`;

    if (item.teamGithubURL) {
      markdown += `- ${nameWithLink}: ${formattedLanguage} [![GitHub]${GITHUB_ICON}](${item.teamGithubURL})\n`;
    } else {
      markdown += `- ${nameWithLink}: ${formattedLanguage}\n`;
    }
  });

  return markdown + "\n";
}

// Find all unique tags in the data
const allTags = new Set();
buildersData.forEach((item) => {
  if (item.tags && Array.isArray(item.tags)) {
    item.tags.forEach((tag) => allTags.add(tag));
  }
});

console.log("Available tags in your data:", Array.from(allTags).sort());

// Define the categories in the exact order they should appear
const categoryConfig = [
  // Main sections and subsections in desired order
  {
    name: "Intro to Cardano",
    tag: "",
    level: 1,
    description:
      "A comprehensive introduction to the Cardano blockchain, its philosophy, and core technology.",
  },
  { name: "Official Websites", tag: "official_link", level: 2 },
  { name: "Intro Courses", tag: "cardano_full_course", level: 2 },
  { name: "Books", tag: "cardano_book", level: 2 },
  { name: "Guides and Reports", tag: "cardano_report", level: 2 },
  { name: "Security Guides", tag: "security_guide", level: 2 },
  { name: "Intro Videos", tag: "cardano_intro_video", level: 2 },
  {
    name: "Cardano Glossaries",
    tag: ["glossary_top", "glossary_additional"],
    level: 2,
  },
  { name: "Guides to Get Started", tag: "cardano_guide", level: 2 },

  { name: "Staking", tag: "", level: 1 },
  { name: "Stake Pool Explorers", tag: "stake_pool_explorer", level: 2 },
  { name: "Stake Reward History", tag: "reward_tracker", level: 2 },
  { name: "Stake Reward Calculators", tag: "reward_calculator", level: 2 },
  { name: "Stake Reward Calendars", tag: "reward_calendar", level: 2 },
  { name: "Stake Pool Alliances", tag: "stake_pool_alliance", level: 2 },
  { name: "ISPO Explorer", tag: "ispo_explorer", level: 2 },
  {
    name: "Stake Pool Monitoring Tools",
    tag: [
      "stake_pool_monitoring_tool_top",
      "stake_pool_monitoring_tool_additional",
    ],
    level: 2,
  },

  { name: "Community", tag: "", level: 1 },
  { name: "Organizations", tag: "organization", level: 2 },
  { name: "News Websites", tag: "cardano_news_website", level: 2 },
  { name: "Organization News", tag: "organization_news", level: 2 },
  { name: "Community Blogs", tag: "community_blog", level: 2 },
  { name: "Developer Blogs", tag: "developer_blog", level: 2 },
  { name: "Project Blogs", tag: "project_blog", level: 2 },
  {
    name: "International News",
    tag: (item) =>
      item.tags && item.tags.some((tag) => tag.endsWith("_lang_blog")),
    customHandler: true,
    level: 2,
  },
  {
    name: "Cardano YouTube Channels",
    tag: ["top_youtube", "general_youtube"],
    level: 2,
  },
  {
    name: "Developer YouTube Channels",
    tag: "development_youtube",
    level: 2,
  },
  {
    name: "Organizations and Institutions YouTube Channels",
    tag: "organization_youtube",
    level: 2,
  },
  {
    name: "Governance YouTube Channels",
    tag: "governance_youtube",
    level: 2,
  },
  {
    name: "Project Catalyst YouTube Channels",
    tag: "catalyst_youtube",
    level: 2,
  },
  {
    name: "NFT YouTube Channels",
    tag: "nft_youtube",
    level: 2,
  },
  {
    name: "Cardano Project YouTube Channels",
    tag: "project_youtube",
    level: 2,
  },
  {
    name: "International YouTube",
    tag: (item) =>
      item.tags && item.tags.some((tag) => tag.endsWith("_lang_youtube")),
    customHandler: true,
    level: 2,
  },
  {
    name: "Newsletters",
    tag: "newsletter",
    level: 2,
  },

  { name: "Ecosystem", tag: "", level: 1 },
  {
    name: "Blockchain Explorers",
    tag: "block_explorer",
    level: 2,
  },
  {
    name: "Blockchain Visualizer",
    tag: "block_visualizer",
    level: 2,
  },
  {
    name: "Mempool Explorer",
    tag: "mempool_explorer",
    level: 2,
  },
  {
    name: "Ecosystem Directories",
    tag: "ecosystem_directory",
    level: 2,
  },
  {
    name: "Mobile Wallets",
    tag: "mobile_wallet",
    level: 2,
  },
  {
    name: "Browser Wallets",
    tag: "browser_wallet",
    level: 2,
  },
  {
    name: "Desktop Wallets",
    tag: "desktop_wallet",
    level: 2,
  },
  {
    name: "Hardware Wallets",
    tag: "hardware_wallet",
    level: 2,
  },
  {
    name: "Web Wallets",
    tag: "web_wallet",
    level: 2,
  },
  {
    name: "Paper Wallets",
    tag: "paper_wallet",
    level: 2,
  },
  {
    name: "Identity Wallets",
    tag: "identity_wallet",
    level: 2,
  },
  {
    name: "Multisig Wallets",
    tag: "multisig_wallet",
    level: 2,
  },
  {
    name: "Dev Wallets",
    tag: "dev_wallet",
    level: 2,
  },
  {
    name: "Specialized Wallets",
    tag: "specialized_wallet",
    level: 2,
  },
  { name: "DApps", tag: "", level: 1 },
  {
    name: "AI DApps",
    tag: "ai_dapp",
    level: 2,
  },
  {
    name: "DApp Analysis and Risk Rating",
    tag: "risk_rating_dapp",
    level: 2,
  },
  {
    name: "DApp Explorers",
    tag: "dapp_explorer",
    level: 2,
  },
  {
    name: "DEX Aggregators",
    tag: "dex_aggregator_dapp",
    level: 2,
  },
  {
    name: "DEXs",
    tag: "dex_dapp",
    level: 2,
  },
  {
    name: "Data Storage and Computing",
    tag: "storage_dapp",
    level: 2,
  },
  {
    name: "Derivatives DApps",
    tag: "derivatives_dapp",
    level: 2,
  },
  {
    name: "Domains and Handles",
    tag: "handle_dapp",
    level: 2,
  },
  {
    name: "Education DApps",
    tag: "education_dapp",
    level: 2,
  },
  {
    name: "Identity DApps",
    tag: "identity_dapp",
    level: 2,
  },
  {
    name: "Impact and Environment DApps",
    tag: "impact_dapp",
    level: 2,
  },
  {
    name: "Index DApps",
    tag: "index_dapp",
    level: 2,
  },
  {
    name: "Lending and Borrowing DApps",
    tag: "lending_dapp",
    level: 2,
  },
  {
    name: "Media and Music DApps",
    tag: "media_dapp",
    level: 2,
  },
  {
    name: "Medical and Health DApps",
    tag: "medical_dapp",
    level: 2,
  },
  {
    name: "Messaging and Chat DApps",
    tag: "messaging_dapp",
    level: 2,
  },
  {
    name: "Mining DApps",
    tag: "mining_dapp",
    level: 2,
  },
  {
    name: "Payments and E-Commerce DApps",
    tag: "payment_dapp",
    level: 2,
  },
  {
    name: "Privacy DApps",
    tag: "privacy_dapp",
    level: 2,
  },
  {
    name: "Real World Assets",
    tag: "real_world_asset_dapp",
    level: 2,
  },
  {
    name: "Reward Distribution DApps",
    tag: "reward_distribution_dapp",
    level: 2,
  },
  {
    name: "Signing and Verification DApps",
    tag: "signing_dapp",
    level: 2,
  },
  {
    name: "Social Media DApps",
    tag: "social_dapp",
    level: 2,
  },
  {
    name: "Supply Chain DApps",
    tag: "supply_chain_dapp",
    level: 2,
  },
  {
    name: "Synthetic Asset DApps",
    tag: "synthetics_dapp",
    level: 2,
  },
  {
    name: "Ticketing and Token Gating DApps",
    tag: "ticketing_dapp",
    level: 2,
  },

  { name: "NFTs", tag: "", level: 1 },
  { name: "Games", tag: "", level: 1 },
  { name: "Governance", tag: "", level: 1 },
  { name: "Catalyst", tag: "", level: 1 },
  { name: "DAOs", tag: "", level: 1 },
  { name: "Development", tag: "", level: 1 },
  { name: "On-Chain Metrics", tag: "", level: 1 },
  { name: "Partner Chains", tag: "", level: 1 },
  { name: "Layer 2s", tag: "", level: 1 },
];

// Generate categories based on tags
const categories = {};
const emptyCategories = new Set(); // Track categories with no items

categoryConfig.forEach((config) => {
  // If this has an empty tag, add it as an empty category
  if (!config.tag) {
    categories[config.name] = [];
    return;
  }

  // Filter builders by tag(s)
  let items;
  if (typeof config.tag === "function") {
    // Function-based filtering
    items = buildersData.filter(config.tag);
  } else if (Array.isArray(config.tag)) {
    // If tag is an array, filter items that match ANY of the tags
    items = buildersData.filter((item) => {
      if (!item.tags || !Array.isArray(item.tags)) return false;
      return config.tag.some((tag) => item.tags.includes(tag));
    });
  } else {
    // Single tag filtering (original behavior)
    items = buildersData.filter(
      (item) => item.tags && item.tags.includes(config.tag)
    );
  }

  // Store items in the category
  categories[config.name] = items;

  // Track empty categories
  if (items.length === 0) {
    emptyCategories.add(config.name);
  }
});

// Generate the readme content with improved styling
let readmeContent = `# Awesome Cardano

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

A curated list of Resources, DApps, and Tools related to [Cardano](https://cardano.org/). This list is maintained by the Cardano community.
<br/>
<br/>

> The [![GitHub]${GITHUB_ICON}](https://github.com) icons link to each team on **GitHub**.
<br/>

Feel free to **star** or **add new projects**. We love PRs :)

${GITHUB_ICON}: ${GITHUB_ICON_URL}
`;

// Add table of contents with proper indentation based on levels
readmeContent += "## Table of Contents\n\n";

let currentLevel1 = null;

categoryConfig.forEach((config) => {
  const anchor = config.name.toLowerCase().replace(/\s+/g, "-");

  if (config.level === 1) {
    // Level 1 entries are main categories
    readmeContent += `- [${config.name}](#${anchor})\n`;
    currentLevel1 = config.name;
  } else if (config.level === 2) {
    // Level 2 entries are sub-categories
    readmeContent += `    - [${config.name}](#${anchor})\n`;
  }
});

readmeContent += "\n";

// Add each category section in the defined order
categoryConfig.forEach((config) => {
  // Get items for this category
  const items = categories[config.name] || [];

  // Check if this is a custom handler
  if (config.customHandler) {
    if (config.name === "International News") {
      readmeContent += generateInternationalContent(
        config.name,
        items,
        "_lang_blog"
      );
    } else if (config.name === "International YouTube") {
      readmeContent += generateInternationalContent(
        config.name,
        items,
        "_lang_youtube"
      );
    }
  } else {
    // Use the standard generator for non-custom handlers
    readmeContent += generateCategoryList(config, items);
  }
});

// Write to README file
fs.writeFileSync(path.join(__dirname, "../README.md"), readmeContent);
console.log("README.md has been generated successfully!");
