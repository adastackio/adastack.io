import React from "react";

interface RepoShieldIoProps {
  repoURL: string;
}

const RepoShieldIo = ({ repoURL }: RepoShieldIoProps) => {
  const url = new URL(repoURL);
  const cleanPath = url.pathname.replace(/\/+$/, '');
  const pathSegments = cleanPath.split('/').filter(Boolean);
  const [owner, repo] = pathSegments;
  
  const isGitLab = url.hostname === 'gitlab.com';
  
  const shieldUrl = isGitLab
    ? `https://img.shields.io/gitlab/stars/${owner}/${repo}?style=social&label=GitLab`
    : `https://img.shields.io/github/stars/${owner}/${repo}?style=social&label=GitHub`;

  return (
    <a className="inline-block" href={repoURL}>
      <img
        src={shieldUrl}
        className="shield_io_badge shields_io_repo_badge"
        alt={`${isGitLab ? 'GitLab' : 'GitHub'} link`}
      />
    </a>
  );
};

export default RepoShieldIo;