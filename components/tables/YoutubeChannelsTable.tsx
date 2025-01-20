import React from "react";
import Favicon from "@components/badges/Favicon";

interface Project {
  name: string;
  channel_url: string;
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

  return (
    <div className="data-table-wrapper  mt-6">
      <table className="data-table youtube-table">
        <tbody>
          {filteredProjects.map((project, index) => (
            <tr
              key={index}
              className="nx-m-0 nx-border-t nx-border-gray-300 nx-p-0 dark:nx-border-gray-600 even:nx-bg-gray-100 even:dark:nx-bg-gray-600/20"
            >
              <td className="nx-m-0 nx-border nx-border-gray-300 nx-px-4 nx-py-2 dark:nx-border-gray-600 table-cell first-column-cell">
                <div className="flex items-center justify-between w-full">
                  <span className="flex items-center">
                    <Favicon url={project.channel_url} />
                    &nbsp;
                    <a href={project.channel_url}>
                      <span className="team_table_name_container">
                        {project.name}
                      </span>
                    </a>
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlockExplorersTable;
