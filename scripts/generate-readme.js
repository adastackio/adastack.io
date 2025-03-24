const fs = require("fs");
const path = require("path");

// Load the builders data
const buildersData = require("../data/builders.json");

// Function to generate a markdown list for a specific category
function generateCategoryList(category, items) {
  let markdown = `${"#".repeat(category.level)} ${category.name}\n\n`;

  // Add description if it exists
  if (category.description) {
    markdown += `${category.description}\n\n`;
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
      // Add GitHub icon link for items with GitHub URLs
      markdown += `- ${nameWithLink} [![GitHub](https://raw.githubusercontent.com/adastackio/adastack.io/readme/assets/icons/github_readme.svg)](${item.teamGithubURL})\n`;
    } else {
      markdown += `- ${nameWithLink}\n`;
    }
  });

  markdown += "\n";
  return markdown;
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
  { name: "Intro to Cardano", tag: "", level: 1 },
  { name: "Official Websites", tag: "official_link", level: 2 },
  { name: "Intro Courses", tag: "cardano_full_course", level: 2 },
  { name: "Books", tag: "cardano_book", level: 2 },
  { name: "Guides and Reports", tag: "cardano_report", level: 2 },
  { name: "Security Guides", tag: "security_guide", level: 2 },
  { name: "Intro Videos", tag: "cardano_intro_video", level: 2 },
  { name: "Cardano Glossary", tag: "glossary_top", level: 2 },
  { name: "Guides to Get Started", tag: "cardano_guide", level: 2 },

  { name: "Staking", tag: "", level: 1 },
  { name: "Stake Pool Explorers", tag: "stake_pool_explorer", level: 2 },
  { name: "Stake Reward History", tag: "reward_tracker", level: 2 },
  { name: "Stake Reward Calculator", tag: "reward_calculator", level: 2 },
  { name: "Stake Reward Calendar", tag: "reward_calendar", level: 2 },
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
  { name: "Ecosystem", tag: "", level: 1 },
  { name: "DApps", tag: "", level: 1 },
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
  if (Array.isArray(config.tag)) {
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
<!--rehype:style=font-size: 38px; border-bottom: 0; display: flex; min-height: 200px; align-items: center; justify-content: center;-->

[![Awesome](https://awesome.re/badge.svg)](https://github.com/sindresorhus/awesome)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
<!--rehype:style=text-align: center;-->

Curated List of Cardano Resources, DApps, and Tools. This project collects awesome Cardano ecosystem resources and arranges them into various categories.
Feel free to **star** and **fork**.

Any comments, suggestions? [Let us know!](https://github.com/adastackio/adastack/issues) We love PRs :)
<!--rehype:style=text-align: center;-->

`;

// Add table of contents with proper indentation based on levels
readmeContent += "## Contents\n\n";

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

  // Always include the section, even if empty
  readmeContent += generateCategoryList(config, items);
});

// Write to README file
fs.writeFileSync(path.join(__dirname, "../README.md"), readmeContent);
console.log("README.md has been generated successfully!");
