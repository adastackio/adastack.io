import React from "react";
import { Button } from "antd";
import { StarIcon } from "../../assets/icons";

const MostStarredCommitBadge = ({ repoURL, repoStarCount }) => {
  if (!repoURL || repoURL.length === 0) {
    return "...";
  }

  const repoName = repoURL.split("/").slice(-1);

  return (
    <a href={repoURL} target="_blank" rel="noopener noreferrer">
      <div className="badge-container most-starred-badge-container">
        <Button
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0px 11px 0px 12px",
          }}
        >
          <span>{repoName}</span>
          <div
            style={{
              height: "60%",
              width: "1px",
              backgroundColor: "#424242",
              margin: "0 2px",
            }}
          />
          <StarIcon
            style={{
              marginRight: "-4px",
              marginLeft: "-2px",
            }}
          />
          <span>{repoStarCount}</span>
        </Button>
      </div>
    </a>
  );
};

export default MostStarredCommitBadge;
