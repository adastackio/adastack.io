import React from "react";

interface RepoShieldIoBadgeProps {
  githubUrl: string;
  text?: string;
}

const RepoShieldIoBadge: React.FC<RepoShieldIoBadgeProps> = React.memo(
  ({ githubUrl, text = "Repo Github" }) => {
    if (!githubUrl) {
      return null;
    }

    // Extract owner and repo from GitHub URL
    const urlParts = githubUrl.split("/");
    const owner = urlParts[urlParts.length - 2];
    const repo = urlParts[urlParts.length - 1];

    // Create shields.io URL with flat style and white background
    const shieldsIoUrl = `https://img.shields.io/github/stars/${owner}/${repo}?style=flat&logo=github&logoColor=000000&label=${encodeURIComponent(
      text
    )}&labelColor=ffffff&color=ffffff`;

    return (
      <a href={githubUrl} target="_blank" rel="noopener noreferrer">
        <img
          src={shieldsIoUrl}
          className="shields_io_repo_badge"
          alt={`${text} repo link`}
        />
      </a>
    );
  }
);

export default RepoShieldIoBadge;
