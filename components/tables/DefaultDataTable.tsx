import React from "react";
import TeamGithubBadge from "@components/badges/TeamGithubBadge";
import GithubRepoBadge from "@components/badges/GithubRepoBadge";
import Favicon from "@components/badges/Favicon";

interface Project {
  name: string;
  website: string;
  teamGithubURL?: string;
  repoURL?: string;
  tags?: string[];
}

interface DefaultDataTableProps {
  projects: Project[];
  filterBy?: string | string[];
  excludeTags?: string | string[];
}

const DefaultDataTable: React.FC<DefaultDataTableProps> = ({
  projects = [],
  filterBy = [],
  excludeTags = [],
}) => {
  // Convert both filterBy and excludeTags to arrays if they're strings
  const filterArray = Array.isArray(filterBy)
    ? filterBy
    : [filterBy].filter(Boolean);
  const excludeArray = Array.isArray(excludeTags)
    ? excludeTags
    : [excludeTags].filter(Boolean);

  // Filter projects by tags and exclude specified tags
  const filteredProjects = projects.filter((project) => {
    // If no filterArray, include all projects that don't have excluded tags
    if (filterArray.length === 0) {
      return !project.tags?.some((tag) => excludeArray.includes(tag));
    }
    // Otherwise, include projects that have required tags but not excluded tags
    return (
      project.tags?.some((tag) => filterArray.includes(tag)) &&
      !project.tags?.some((tag) => excludeArray.includes(tag))
    );
  });

  // Sort projects by GitHub presence and repo URL
  const sortedProjects = filteredProjects.sort((a, b) => {
    if (a.repoURL && !b.repoURL) return -1;
    if (!a.repoURL && b.repoURL) return 1;
    if (a.teamGithubURL && !b.teamGithubURL) return -1;
    if (!a.teamGithubURL && b.teamGithubURL) return 1;
    return 0;
  });

  // Check if any project has a GitHub URL or repo URL
  const hasAnyProjectWithGithubURL = sortedProjects.some(
    (project) => project.teamGithubURL
  );
  const hasAnyProjectWithRepoURL = sortedProjects.some(
    (project) => project.repoURL
  );

  return (
    <div className="data-table-wrapper mt-6">
      <table className="data-table default-data-table">
        <thead>
          <tr>
            <th></th>
            {hasAnyProjectWithRepoURL && <th></th>}
            {hasAnyProjectWithGithubURL && <th></th>}
          </tr>
        </thead>
        <tbody>
          {sortedProjects.map((project, index) => (
            <tr
              key={index}
              className="nx-m-0 nx-border-t nx-border-gray-300 nx-p-0 dark:nx-border-gray-600 even:nx-bg-gray-100 even:dark:nx-bg-gray-600/20"
            >
              <td className="nx-m-0 nx-border nx-border-gray-300 nx-px-4 nx-py-1 dark:nx-border-gray-600 table-cell first-column-cell">
                <div className="flex items-center justify-between w-full">
                  <span className="flex items-center">
                    <Favicon url={project.website} />
                    <a
                      className="py-2 px-2"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={project.website}
                    >
                      <span className="team_table_name_container">
                        {project.name}
                      </span>
                    </a>
                  </span>
                </div>
              </td>
              {hasAnyProjectWithRepoURL && (
                <td className="nx-m-0 nx-border nx-border-gray-300 nx-px-4 nx-py-2 dark:nx-border-gray-600 table-cell">
                  {project.repoURL ? (
                    <GithubRepoBadge
                      repoURL={project.repoURL}
                      text="Source Code"
                    />
                  ) : (
                    ""
                  )}
                </td>
              )}
              {hasAnyProjectWithGithubURL && (
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
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DefaultDataTable;
