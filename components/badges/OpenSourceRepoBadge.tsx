import React from "react";
import { OpenSourceIcon } from "../../assets/icons";

const OpenSourceRepoBadge = ({ repoURL }) => {
  if (!repoURL) return null;

  const repoName = repoURL.split("/").slice(-1);

  return (
    <a href={repoURL} target="_blank" rel="noopener noreferrer">
      <span className="last-commit-badge-content inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-sm text-blue-700 ring-1 ring-inset ring-blue-700/10 nx-whitespace-nowrap custom-badge text-blue-700 ">
        <OpenSourceIcon />
        &nbsp;{repoName}
      </span>
    </a>
  );
};

export default OpenSourceRepoBadge;
