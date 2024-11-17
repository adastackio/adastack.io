import React from "react";
import { StarIcon } from "../../assets/icons";

interface StarBadgeProps {
  teamGithubURL: string;
  starCount: number | null;
  error: string | null;
}

const StarBadge: React.FC<StarBadgeProps> = React.memo(
  ({ teamGithubURL, starCount, error }) => {
    if (!teamGithubURL) {
      return "";
    }

    const getBadgeContent = () => {
      if (error || starCount === null || starCount === undefined) {
        error && console.log(error);
        return "...";
      } else {
        return starCount.toLocaleString();
      }
    };

    return (
      <a href={teamGithubURL} target="_blank" rel="noopener noreferrer">
        <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-sm text-yellow-800 ring-1 ring-inset ring-yellow-600/20 transition-colors duration-200">
          <StarIcon />
          &nbsp;
          <span className="stars">{getBadgeContent()}</span>
        </span>
      </a>
    );
  }
);

export default StarBadge;
