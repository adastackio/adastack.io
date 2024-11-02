import StarBadge from "../badges/StarBadge";
import GithubBadge from "../badges/GithubBadge";
import LatestCommitBadge from "../badges/LatestCommitBadge";
import Favicon from "../badges/Favicon";

interface CardanoProject {
  name: string;
  website: string;
  teamGithubURL: string;
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

interface DataTableProps {
  cardanoProjects: CardanoProject[];
  pageTitle: string;
  pageIntroContent: string;
}

export default function DataTable({
  cardanoProjects,
  pageTitle,
  pageIntroContent,
}: DataTableProps) {
  return (
    <>
      <h1 className="nx-mt-2 nx-text-4xl nx-font-bold nx-tracking-tight nx-text-slate-900 dark:nx-text-slate-100">
        {pageTitle}
      </h1>
      <p className="nx-mt-6 nx-leading-7 first:nx-mt-0">{pageIntroContent}</p>

      <div className="mt-8">
        <table className="nx-block nx-overflow-x-scroll nextra-scrollbar nx-mt-6 nx-p-0 first:nx-mt-0">
          <thead>
            <tr className="nx-m-0 nx-border-t nx-border-gray-300 nx-p-0 dark:nx-border-gray-600 even:nx-bg-gray-100 even:dark:nx-bg-gray-600/20">
              <th className="nx-m-0 nx-border nx-border-gray-300 nx-px-4 nx-py-2 nx-font-semibold dark:nx-border-gray-600">
                Builder Team
              </th>
              <th className="nx-m-0 nx-border nx-border-gray-300 nx-px-4 nx-py-2 nx-font-semibold dark:nx-border-gray-600">
                GitHub Stats
              </th>
              <th className="nx-m-0 nx-border nx-border-gray-300 nx-px-4 nx-py-2 nx-font-semibold dark:nx-border-gray-600">
                Recent Commit
              </th>
              <th className="nx-m-0 nx-border nx-border-gray-300 nx-px-4 nx-py-2 nx-font-semibold dark:nx-border-gray-600">
                Total Repos
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
                  <GithubBadge
                    teamGithubURL={project.teamGithubURL}
                    error={project.error}
                  />
                  <StarBadge
                    teamGithubURL={project.teamGithubURL}
                    stars={project.stars}
                    error={project.error}
                  />
                </td>

                <td className="nx-m-0 nx-border nx-border-gray-300 nx-px-4 nx-py-2 dark:nx-border-gray-600">
                  {project.mostRecentRepo && (
                    <>
                      <LatestCommitBadge repoURL={project.mostRecentRepo.url} />
                      <br />
                      <span className="text-xs text-gray-500">
                        {project.mostRecentRepo.timeSinceLastCommit}
                      </span>
                    </>
                  )}
                </td>
                <td className="nx-m-0 nx-border nx-border-gray-300 nx-px-4 nx-py-2 dark:nx-border-gray-600 text-sm">
                  {project.repos ? project.repos.length : "N/A"}
                </td>
                <td className="nx-m-0 nx-border nx-border-gray-300 nx-px-4 nx-py-2 dark:nx-border-gray-600 whitespace-nowrap text-sm">
                  {project.type}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
