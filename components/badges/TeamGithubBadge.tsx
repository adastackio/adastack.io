import React from "react";
import { Button } from "antd";
import { GithubIcon } from "../../assets/icons";

interface TeamGithubBadgeProps {
  teamGithubURL: string;
  error: string | null;
  text?: string; // Optional text prop with default value
}

const TeamGithubBadge: React.FC<TeamGithubBadgeProps> = React.memo(
  ({ teamGithubURL, error, text = "Team" }) => {
    if (!teamGithubURL || error) {
      return null;
    }

    return (
      <a href={teamGithubURL} target="_blank" rel="noopener noreferrer">
        <div className="badge-container team-github-badge-container inline-flex items-center">
          <Button
            icon={<GithubIcon />}
            className="badge-button team-github-badge-content"
          >
            {text}
          </Button>
        </div>
      </a>
    );
  }
);

export default TeamGithubBadge;
