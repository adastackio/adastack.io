import React from "react";
import { StarIcon } from "@components/icons";

interface StarBadgeProps {
  teamGithubURL: string;
  stars: number | null;
  error: string | null;
}

const StarBadge: React.FC<StarBadgeProps> = React.memo(
  ({ teamGithubURL, stars, error }) => {
    if (!teamGithubURL) {
      return "";
    }

    const getBadgeContent = () => {
      if (error || stars === null) {
        error && console.log(error);
        return "...";
      } else {
        return stars.toLocaleString();
      }
    };

    return (
      <a href={teamGithubURL} target="_blank" rel="noopener noreferrer">
        <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-sm text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
          <StarIcon />
          &nbsp;
          <span className="stars">{getBadgeContent()}</span>
        </span>
      </a>
    );
  }
);

export default StarBadge;
