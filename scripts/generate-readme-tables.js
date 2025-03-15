const fs = require("fs");
const path = require("path");

// Load the builders data
const buildersData = require("../data/builders.json");

// Function to generate a markdown table for a specific category
function generateTableForCategory(category, items) {
  let markdown = `${"#".repeat(category.level)} ${category.name}\n\n`;

  // Add description if it exists
  if (category.description) {
    markdown += `${category.description}\n\n`;
  }

  // If this is just a section header without items or it's specifically marked as a header-only section
  if (!items || items.length === 0 || category.headerOnly) {
    return markdown;
  }

  markdown += "| Name | GitHub |\n";
  markdown += "|:-------------------------------------|:--------:|\n";

  items.forEach((item) => {
    if (!item.name || !item.website) return; // Skip incomplete entries

    const githubLink = item.teamGithubURL
      ? `[GitHub](${item.teamGithubURL})`
      : "-";
    const nameWithLink = `[${item.name}](${item.website})`;
    markdown += `| ${nameWithLink} | ${githubLink} |\n`;
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
  { name: "Intro to Cardano", level: 1, headerOnly: true },
  { name: "Official Websites", tag: "official_link", level: 2 },
  { name: "Intro Courses", tag: "cardano_full_course", level: 2 },
  { name: "Books", tag: "cardano_book", level: 2 },
  { name: "Security Guides", tag: "security_guide", level: 2 },

  { name: "Staking", level: 1, headerOnly: true },
  { name: "Stake Pool Explorers", tag: "stake_pool_explorer", level: 2 },

  { name: "Community", level: 1, headerOnly: true },

  { name: "Ecosystem", level: 1, headerOnly: true },

  { name: "DApps", level: 1, headerOnly: true },

  { name: "NFTs", level: 1, headerOnly: true },

  { name: "Games", level: 1, headerOnly: true },

  { name: "Governance", level: 1, headerOnly: true },

  { name: "Catalyst", level: 1, headerOnly: true },

  { name: "DAOs", level: 1, headerOnly: true },

  { name: "Development", level: 1, headerOnly: true },

  { name: "On-Chain Metrics", level: 1, headerOnly: true },

  { name: "Partner Chains", level: 1, headerOnly: true },

  { name: "Layer 2s", level: 1, headerOnly: true },
];

// Generate categories based on tags
const categories = {};
const emptyCategories = new Set(); // Track categories with no items

categoryConfig.forEach((config) => {
  // If this is explicitly a header-only category or has no tag, add it as an empty category
  if (config.headerOnly || !config.tag) {
    categories[config.name] = [];
    return;
  }

  // Filter builders by tag
  const items = buildersData.filter(
    (item) => item.tags && item.tags.includes(config.tag)
  );

  // Store items in the category
  categories[config.name] = items;

  // Track empty categories
  if (items.length === 0) {
    emptyCategories.add(config.name);
  }
});

// Generate the readme content
let readmeContent =
  "# Awesome Cardano [![Awesome](https://awesome.re/badge.svg)](https://github.com/sindresorhus/awesome)\n\n";
readmeContent += "Curated List of Cardano Resources, DApps, and Tools\n\n";

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

  // Skip empty categories unless they are header-only sections
  if (items.length === 0 && !config.headerOnly) {
    return;
  }

  // Generate the section
  readmeContent += generateTableForCategory(config, items);
});

// Write to README file
fs.writeFileSync(path.join(__dirname, "../README.md"), readmeContent);
console.log("README.md has been generated successfully!");
