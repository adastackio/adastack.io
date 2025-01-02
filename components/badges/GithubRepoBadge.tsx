import React from "react";
import { Button } from "antd";
import { SingleCommitIcon } from "../../assets/icons";

interface GithubRepoBadgeProps {
  repoURL: string;
  error: string | null;
  text?: string; // Optional text prop with default value
}

const GithubRepoBadge: React.FC<GithubRepoBadgeProps> = React.memo(
  ({ repoURL, error, text = "Team" }) => {
    if (!repoURL || error) {
      return null;
    }

    return (
      <a href={repoURL} target="_blank" rel="noopener noreferrer">
        <div className="badge-container github-repo-badge-container inline-flex items-center">
          <Button
            icon={<SingleCommitIcon />}
            className="badge-button github-repo-badge-content"
          >
            {text}
          </Button>
        </div>
      </a>
    );
  }
);

// Assign display name to the memoized component
GithubRepoBadge.displayName = "GithubRepoBadge";

export default GithubRepoBadge;
