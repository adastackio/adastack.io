import React from "react";

interface LatestCommitBadgeIoProps {
  repoURL: string;
}

const LatestCommitBadgeIo = ({ repoURL }: LatestCommitBadgeIoProps) => {
  const url = new URL(repoURL);
  const cleanPath = url.pathname.replace(/\/+$/, "");
  const pathSegments = cleanPath.split("/").filter(Boolean);
  const [owner, repo] = pathSegments;

  const isGitLab = url.hostname === "gitlab.com";


  const latestURL = isGitLab
    ? `${url.origin}/${owner}/${repo}/-/commits/`
    : `${url.origin}/${owner}/${repo}/commits/`;


  const shieldUrl = isGitLab
    ? `https://img.shields.io/gitlab/last-commit/${owner}/${repo}?color=dfe8f0&labelColor=white`
    : `https://img.shields.io/github/last-commit/${owner}/${repo}?color=dfe8f0&labelColor=white`;

  return (
    <a className="inline-block" href={latestURL}>
      <img
        src={shieldUrl}
        className="shield_io_badge badge-io-custom-shading shields_io_repo_badge"
        alt="Latest Commit"
      />
    </a>
  );
};

export default LatestCommitBadgeIo;
