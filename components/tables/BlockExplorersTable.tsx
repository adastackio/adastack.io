import React from "react";
import TeamGithubBadge from "@components/badges/TeamGithubBadge";
import Favicon from "@components/badges/Favicon";

interface Project {
  name: string;
  website: string;
  teamGithubURL?: string;
  tags?: string[];
}

interface BlockExplorersTableProps {
  projects: Project[];
  filterBy?: string;
}

const BlockExplorersTable: React.FC<BlockExplorersTableProps> = ({
  projects = [],
  filterBy,
}) => {
  // Filter projects by tags if filterBy is provided
  const filteredProjects = filterBy
    ? projects.filter((project) => project.tags?.includes(filterBy))
    : projects;

  // Sort projects by open source status
  const sortedProjects = filteredProjects.sort((a, b) => {
    if (a.teamGithubURL && !b.teamGithubURL) return -1;
    if (!a.teamGithubURL && b.teamGithubURL) return 1;
    return 0;
  });

  return (
    <div className="data-table-wrapper">
      <table className="data-table block-explorers-table">
        <tbody>
          {sortedProjects.map((project, index) => (
            <tr
              key={index}
              className="nx-m-0 nx-border-t nx-border-gray-300 nx-p-0 dark:nx-border-gray-600 even:nx-bg-gray-100 even:dark:nx-bg-gray-600/20"
            >
              <td className="nx-m-0 nx-border nx-border-gray-300 nx-px-4 nx-py-2 dark:nx-border-gray-600 table-cell first-column-cell">
                <div className="flex items-center justify-between w-full">
                  <span className="flex items-center">
                    <Favicon url={project.website} />
                    &nbsp;
                    <a href={project.website}>
                      <span className="team_table_name_container">
                        {project.name}
                      </span>
                    </a>
                  </span>
                </div>
              </td>
              <td className="nx-m-0 nx-border nx-border-gray-300 nx-px-4 nx-py-2 dark:nx-border-gray-600 table-cell">
                {project.teamGithubURL ? (
                  <TeamGithubBadge
                    teamGithubURL={project.teamGithubURL}
                    text="Team"
                  />
                ) : (
                  ""
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlockExplorersTable;
