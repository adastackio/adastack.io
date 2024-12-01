import React from "react";
import { Button, Typography } from "antd";
import { SingleCommitIcon } from "../../assets/icons";

const { Text } = Typography;

const LatestCommitBadge = ({ repoURL }) => {
  if (!repoURL) return null;

  const repoName = repoURL.split("/").slice(-1);

  return (
    <span className="last-commit-badge-container">
      <a href={repoURL} target="_blank" rel="noopener noreferrer">
        <div className="inline">
          <Button
            icon={<SingleCommitIcon />}
            className="badge-button  last-commit-badge-content"
          >
            <Text ellipsis style={{ maxWidth: 190 }}>
              {repoName}
            </Text>
          </Button>
        </div>
      </a>
    </span>
  );
};

export default LatestCommitBadge;
