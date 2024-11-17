import React from "react";
import { Button } from "antd";
import { SingleCommitIcon } from "../../assets/icons";

const LatestCommitBadge = ({ repoURL }) => {
  if (!repoURL) return null;

  const repoName = repoURL.split("/").slice(-1);

  return (
    <a href={repoURL} target="_blank" rel="noopener noreferrer">
      <div className="last-commit-badge-container">
        <Button
          icon={<SingleCommitIcon />}
          className="last-commit-badge-content"
        >
          {repoName}
        </Button>
      </div>
    </a>
  );
};

export default LatestCommitBadge;
