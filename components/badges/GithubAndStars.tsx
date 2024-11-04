import React from "react";
import { GithubIcon } from "@components/icons";

interface GithubBadgeProps {
  teamGithubURL: string;
  error: string | null;
}

const GithubBadge: React.FC<GithubBadgeProps> = React.memo(
  ({ teamGithubURL, error }) => {
    if (!teamGithubURL) {
      return null;
    }

    if (error) {
      console.log(error);
    }

    return (
      <span className="github-btn">
        {" "}
        <a
          className="gh-btn"
          href={teamGithubURL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="gh-ico" aria-hidden="true"></span>
          <span className="gh-text">
            <GithubIcon />
            GitHub
          </span>
        </a>
        <a
          className="gh-count"
          target="_blank"
          href="//github.com/ant-design/ant-design-pro/stargazers/"
        >
          36493
        </a>
      </span>
    );
  }
);

export default GithubBadge;
