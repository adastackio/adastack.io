const fs = require("fs");
const path = require("path");

// Load the builders data
const buildersData = require("../data/builders.json");

// Function to generate a markdown table for a specific category
function generateTableForCategory(category, items) {
  let markdown = `## ${category}\n\n`;
  markdown += "| Name | GitHub |\n";
  markdown += "|------|--------|\n";

  items.forEach((item) => {
    const githubLink = item.teamGithubURL
      ? `[GitHub](${item.teamGithubURL})`
      : "-";
    const nameWithLink = `[${item.name}](${item.website})`;
    markdown += `| ${nameWithLink} | ${githubLink} |\n`;
  });

  markdown += "\n";
  return markdown;
}

// Organize builders by category
const categories = {
  Organizations: buildersData.filter((item) =>
    item.tags.includes("organization")
  ),
  "Development Companies": buildersData.filter((item) =>
    item.tags.includes("dev_company")
  ),
  dApps: buildersData.filter((item) => item.tags.includes("dapp")),
  // Add more categories as needed
};

// Generate the readme content
let readmeContent = "# Cardano Ecosystem Builder Directory\n\n";
readmeContent +=
  "This repository contains a comprehensive directory of builders, tools, and resources in the Cardano ecosystem.\n\n";

// Add table of contents
readmeContent += "## Contents\n\n";
Object.keys(categories).forEach((category) => {
  const anchor = category.toLowerCase().replace(/\s+/g, "-");
  readmeContent += `- [${category}](#${anchor})\n`;
});
readmeContent += "\n";

// Add each category section
Object.entries(categories).forEach(([category, items]) => {
  readmeContent += generateTableForCategory(category, items);
});

// Write to README file
fs.writeFileSync(path.join(__dirname, "../README.md"), readmeContent);
console.log("README.md has been generated successfully!");
