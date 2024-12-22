import React from "react";

interface LatestCommitBadgeIoProps {
  docsURL: string;
}

const LatestCommitBadgeIo = ({ docsURL }: LatestCommitBadgeIoProps) => {
  return (
    <a
      className="inline-block"
      target="_blank"
      rel="noopener noreferrer"
      href={docsURL}
    >
      <img
        src="https://img.shields.io/badge/-docs-blue?logo=readme&labelColor=blue"
        className="shield_io_badge badge-io-custom-shading shields_io_repo_badge"
        alt="Latest Commit"
      />
    </a>
  );
};

export default LatestCommitBadgeIo;
