import React from "react";
import { Button } from "antd";
import { StarIcon } from "../../assets/icons";
import { Radio } from "antd";

const MostStarredCommitBadge = ({ repoURL, repoStarCount }) => {
  if (!repoURL) return null;

  const repoName = repoURL.split("/").slice(-1);

  return (
    <a href={repoURL} target="_blank" rel="noopener noreferrer">
      <div className="badge-container most-starred-badge-container">
        {/* <Radio.Group>
          <Radio.Button value="start">
            <SingleCommitIcon /> {repoName}
          </Radio.Button>
          <Radio.Button value="end">end</Radio.Button>
        </Radio.Group> */}
        {/* <Button
          icon={<SingleCommitIcon />}
          className="badge-button most-starred-badge-content"
        >
          {repoName}
        </Button> */}
        <Button
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
          }}
        >
          <span>{repoName}</span>
          <div
            style={{
              height: "60%",
              width: "1px",
              backgroundColor: "#424242",
              margin: "0 -8px",
            }}
          />
          <span>{repoStarCount}</span>
        </Button>
      </div>
    </a>
  );
};

export default MostStarredCommitBadge;
