import React from "react";
import Favicon from "@components/badges/Favicon";

interface Project {
  name: string;
  website: string;
  frequency: string;
  description: string;
  tags?: string[];
}

interface ProjectsTableProps {
  projects: Project[];
  filterBy?: string;
}

const NewslettersTable: React.FC<ProjectsTableProps> = ({
  projects = [],
  filterBy,
}) => {
  const filteredProjects = filterBy
    ? projects.filter((project) => project.tags?.includes(filterBy))
    : projects;

  return (
    <div className="data-table-wrapper">
      <table className="data-table directory-table">
        <thead>
          <tr className="nx-border-t nx-border-gray-300 dark:nx-border-gray-600">
            <th className="nx-border nx-border-gray-300 nx-px-4 nx-py-2 dark:nx-border-gray-600">
              Newsletter
            </th>
            <th className="nx-border nx-border-gray-300 nx-px-4 nx-py-2 dark:nx-border-gray-600">
              Frequency
            </th>
            <th className="nx-border nx-border-gray-300 nx-px-4 nx-py-2 dark:nx-border-gray-600">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.map((newsletter, index) => (
            <tr
              key={index}
              className="nx-m-0 nx-border-t nx-border-gray-300 nx-p-0 dark:nx-border-gray-600 even:nx-bg-gray-100 even:dark:nx-bg-gray-600/20"
            >
              <td className="nx-m-0 nx-border nx-border-gray-300 nx-px-4 nx-py-2 dark:nx-border-gray-600 table-cell first-column-cell">
                <div className="flex items-center">
                  <Favicon url={newsletter.website} />
                  &nbsp;
                  <a href={newsletter.website}>
                    <span className="team_table_name_container">
                      {newsletter.name}
                    </span>
                  </a>
                </div>
              </td>
              <td className="nx-m-0 nx-border nx-border-gray-300 nx-px-4 nx-py-2 dark:nx-border-gray-600 table-cell">
                {newsletter.frequency}
              </td>
              <td className="nx-m-0 nx-border nx-border-gray-300 nx-px-4 nx-py-2 dark:nx-border-gray-600 table-cell">
                {newsletter.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NewslettersTable;
