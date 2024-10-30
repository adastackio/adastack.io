import React from "react";
import { OpenSourceIcon } from "@components/icons";

const LatestCommitBadge = ({ repoURL }) => {
  if (!repoURL) return null;

  const repoName = repoURL.split("/").slice(-1);

  return (
    <a href={repoURL} target="_blank" rel="noopener noreferrer">
      <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-sm text-blue-700 ring-1 ring-inset ring-blue-700/10">
        <OpenSourceIcon />
        &nbsp;{repoName}
      </span>
    </a>
  );
};

export default LatestCommitBadge;
