import React from "react";
import { GithubIcon } from "@components/icons";

interface GithubBadgeProps {
  teamGithubURL: string;
  error: string | null;
}

const GithubBadge: React.FC<GithubBadgeProps> = React.memo(
  ({ teamGithubURL, error }) => {
    if (!teamGithubURL) {
      return "";
    }

    if (error) {
      console.log(error);
    }

    return (
      <a href={teamGithubURL} target="_blank" rel="noopener noreferrer">
        <span
          className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-sm custom-badge text-gray-600 ring-1 ring-inset dark:ring-0 ring-gray-500/10 w-24 dark:fill-blue-300 dark:fill-opacity-75
         dark:bg-blue-900/30 dark:text-blue-300 text-blue-700 dark:text-blue-300"
        >
          <GithubIcon />
          &nbsp; GitHub
        </span>
      </a>
    );
  }
);

export default GithubBadge;
