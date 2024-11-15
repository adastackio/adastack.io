import React from "react";
import { GithubIcon } from "@components/icons";

interface TeamGithubBadgeProps {
  teamGithubURL: string;
  error: string | null;
  text?: string; // Optional text prop with default value
}

const TeamGithubBadge: React.FC<TeamGithubBadgeProps> = React.memo(
  ({ teamGithubURL, error, text = "GitHub" }) => {
    // Default value set to "GitHub"
    if (!teamGithubURL) {
      return "";
    }

    if (error) {
      console.log(error);
    }

    return (
      <a href={teamGithubURL} target="_blank" rel="noopener noreferrer">
        <span
          className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-sm custom-badge text-gray-600 ring-1 ring-inset ring-gray-500/10 w-24 
         text-blue-700"
        >
          <GithubIcon />
          &nbsp; {text}
        </span>
      </a>
    );
  }
);

export default TeamGithubBadge;
