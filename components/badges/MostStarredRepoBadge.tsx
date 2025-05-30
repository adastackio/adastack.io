import React from "react";
import { Button, Typography } from "antd";

const { Text } = Typography;

const MostStarredRepoBadge = ({ repoURL, repoStarCount }) => {
  if (!repoURL || repoURL.length === 0) {
    return "...";
  }

  const repoName = repoURL.split("/").slice(-1);

  return (
    <span className="badge-container most-starred-badge-container">
      <a
        className="inline-block w-fit"
        href={repoURL}
        target="_blank"
        rel="noopener"
      >
        <Button
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0px 11px 0px 12px",
          }}
          className="badge-button"
        >
          <Text ellipsis style={{ maxWidth: 200, margin: 0 }}>
            {repoName}
          </Text>
          <div
            style={{
              height: "60%",
              width: "1px",
              backgroundColor: "#424242",
              margin: "0 2px",
            }}
          />
          <Text className="color-on-hover" style={{ fontSize: 12 }}>{repoStarCount}</Text>
        </Button>
      </a>
    </span>
  );
};

export default MostStarredRepoBadge;
