import React from "react";
import { Button } from "antd";
import { GithubIcon, OSIcon, OpenLinkIcon } from "../../assets/icons";

interface ProjectLinkButtonsProps {
  repoURL?: string;
  teamGithubURL?: string;
  website?: string;
}

const ProjectLinkButtons: React.FC<ProjectLinkButtonsProps> = React.memo(
  ({ repoURL, teamGithubURL, website }) => {
    // If neither URL is present, don't render anything
    if (!repoURL && !teamGithubURL && !website) {
      return null;
    }

    return (
      <div className="flex items-center space-x-1.5">
        {/* OS Repo link, re add this once OS repo data is added */}
        {/* {repoURL && (
          <a href={repoURL} target="_blank" rel="noopener noreferrer">
            <div className="badge-container inline-flex items-center">
              <Button
                icon={<OSIcon />}
                className="badge-button text-xs h-auto min-h-0"
              ></Button>
            </div>
          </a>
        )} */}

        {website && (
          <a href={website} target="_blank" rel="noopener noreferrer">
            <div className="badge-container inline-flex items-center">
              <Button
                icon={<OpenLinkIcon />}
                className="badge-button text-xs h-auto min-h-0"
              ></Button>
            </div>
          </a>
        )}

        {teamGithubURL && (
          <a href={teamGithubURL} target="_blank" rel="noopener noreferrer">
            <div className="badge-container inline-flex items-center">
              <Button
                icon={<GithubIcon />}
                className="badge-button text-xs h-auto min-h-0"
              >
                Team
              </Button>
            </div>
          </a>
        )}
      </div>
    );
  }
);

// Assign display name to the memoized component
ProjectLinkButtons.displayName = "ProjectLinkButtons";

export default ProjectLinkButtons;
