import React from "react";

interface DocsShieldIoProps {
  docsURL: string;
}

const DocsShieldIo = ({ docsURL }: DocsShieldIoProps) => {
  return (
    <a
      className="inline-block"
      target="_blank"
      rel="noopener noreferrer"
      href={docsURL}
    >
      <img
        src="https://img.shields.io/badge/-Docs-white?logo=readme&labelColor=white&logoColor=61a6fa"
        className="shield_io_badge badge-io-custom-shading shields_io_repo_badge"
        alt="Latest Commit"
      />
    </a>
  );
};

export default DocsShieldIo;
