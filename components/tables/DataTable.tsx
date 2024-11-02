import StarBadge from "../badges/StarBadge";
import LatestCommitBadge from "../badges/LatestCommitBadge";
import Favicon from "../badges/Favicon";

interface CardanoProject {
  name: string;
  website: string;
  teamURL: string;
  type: string;
  stars: number;
  repos: any[];
  mostRecentRepo: {
    url: string;
    timeSinceLastCommit: string;
    name: string;
    description: string;
    stars: number;
    language: string | null;
    pushedAt: string;
  };
  error: string | null;
}

interface DataTableProps {
  cardanoProjects: CardanoProject[];
}

export default function DataTable({ cardanoProjects }: DataTableProps) {
  return (
    <div className="mt-8">
      <table className="nx-block nx-overflow-x-scroll nextra-scrollbar nx-mt-6 nx-p-0 first:nx-mt-0">
        <thead>
          <tr className="nx-m-0 nx-border-t nx-border-gray-300 nx-p-0 dark:nx-border-gray-600 even:nx-bg-gray-100 even:dark:nx-bg-gray-600/20">
            <th className="nx-m-0 nx-border nx-border-gray-300 nx-px-4 nx-py-2 nx-font-semibold dark:nx-border-gray-600">
              Team
            </th>
            <th className="nx-m-0 nx-border nx-border-gray-300 nx-px-4 nx-py-2 nx-font-semibold dark:nx-border-gray-600">
              Sum of GitHub Stars
            </th>
            <th className="nx-m-0 nx-border nx-border-gray-300 nx-px-4 nx-py-2 nx-font-semibold dark:nx-border-gray-600">
              Total Repos
            </th>
            <th className="nx-m-0 nx-border nx-border-gray-300 nx-px-4 nx-py-2 nx-font-semibold dark:nx-border-gray-600">
              Most Recent Commit
            </th>
            <th className="nx-m-0 nx-border nx-border-gray-300 nx-px-4 nx-py-2 nx-font-semibold dark:nx-border-gray-600">
              Category
            </th>
          </tr>
        </thead>
        <tbody>
          {cardanoProjects.map((project, index) => (
            <tr
              className="nx-m-0 nx-border-t nx-border-gray-300 nx-p-0 dark:nx-border-gray-600 even:nx-bg-gray-100 even:dark:nx-bg-gray-600/20"
              key={index}
            >
              <td className="nx-m-0 nx-border nx-border-gray-300 nx-px-4 nx-py-2 dark:nx-border-gray-600 nx-whitespace-nowrap">
                <a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nx-text-primary-600 nx-underline nx-decoration-from-font [text-underline-position:from-font]"
                >
                  <Favicon url={project.website} />
                  {project.name}
                </a>
              </td>
              <td className="nx-m-0 nx-border nx-border-gray-300 nx-px-4 nx-py-2 dark:nx-border-gray-600">
                <StarBadge
                  teamURL={project.teamURL}
                  stars={project.stars}
                  error={project.error}
                />
              </td>
              <td className="nx-m-0 nx-border nx-border-gray-300 nx-px-4 nx-py-2 dark:nx-border-gray-600 text-sm">
                {project.repos ? project.repos.length : "N/A"}
              </td>
              <td className="nx-m-0 nx-border nx-border-gray-300 nx-px-4 nx-py-2 dark:nx-border-gray-600">
                {project.mostRecentRepo && (
                  <>
                    <span className="text-xs text-gray-500">
                      {project.mostRecentRepo.timeSinceLastCommit}
                    </span>
                    <br />
                    <LatestCommitBadge repoURL={project.mostRecentRepo.url} />
                  </>
                )}
              </td>
              <td className="nx-m-0 nx-border nx-border-gray-300 nx-px-4 nx-py-2 dark:nx-border-gray-600 whitespace-nowrap">
                {project.type}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
