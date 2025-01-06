import React from "react";
import TeamGithubBadge from "@components/badges/TeamGithubBadge";
import Favicon from "@components/badges/Favicon";

interface Project {
  name: string;
  website: string;
  teamGithubURL: string;
  description: string;
}

interface DirectoryTableProps {
  projects: Project[];
}

const DirectoryTable: React.FC<DirectoryTableProps> = ({ projects = [] }) => {
  // Add default empty array
  return (
    <div className="data-table-wrapper">
      <table className="data-table directory-table">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {projects?.map(
            (
              project,
              index // Add optional chaining
            ) => (
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
                  {project.description}
                </td>
                <td className="nx-m-0 nx-border nx-border-gray-300 nx-px-4 nx-py-2 dark:nx-border-gray-600 table-cell">
                  <TeamGithubBadge
                    teamGithubURL={project.teamGithubURL}
                    text="Team"
                  />
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DirectoryTable;
