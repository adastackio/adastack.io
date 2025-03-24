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

  // If this is a section with no items, just return the header
  if (!items || items.length === 0) {
    return markdown;
  }

  markdown += "| Name | GitHub |\n";
  markdown += "|:-------------------------------------|:--------:|\n";

  // Sort items by GitHub presence
  const sortedItems = [...items].sort((a, b) => {
    if (a.teamGithubURL && !b.teamGithubURL) return -1;
    if (!a.teamGithubURL && b.teamGithubURL) return 1;
    return 0;
  });

  sortedItems.forEach((item) => {
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
  { name: "Intro to Cardano", tag: "", level: 1 },
  { name: "Official Websites", tag: "official_link", level: 2 },
  { name: "Intro Courses", tag: "cardano_full_course", level: 2 },
  { name: "Books", tag: "cardano_book", level: 2 },
  { name: "Guides and Reports", tag: "cardano_report", level: 2 },
  { name: "Security Guides", tag: "security_guide", level: 2 },
  { name: "Intro Videos", tag: "intro_video", level: 2 },
  { name: "Cardano Glossary", tag: "glossary_top", level: 2 },
  { name: "Guides to Get Started", tag: "cardano_guide", level: 2 },
  
  { name: "Staking", tag: "", level: 1 },
  { name: "Stake Pool Explorers", tag: "stake_pool_explorer", level: 2 },

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

  // Always include the section, even if empty
  readmeContent += generateTableForCategory(config, items);
});

// Write to README file
fs.writeFileSync(path.join(__dirname, "../README.md"), readmeContent);
console.log("README.md has been generated successfully!");
