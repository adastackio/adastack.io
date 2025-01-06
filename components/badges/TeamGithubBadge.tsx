import React from "react";
import { Button } from "antd";
import { GithubIcon } from "../../assets/icons";

interface TeamGithubBadgeProps {
  teamGithubURL: string;
  text?: string;
}

const TeamGithubBadge: React.FC<TeamGithubBadgeProps> = React.memo(
  ({ teamGithubURL, text = "Team" }) => {
    if (!teamGithubURL) {
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

// Assign display name to the memoized component
TeamGithubBadge.displayName = "TeamGithubBadge";

export default TeamGithubBadge;
