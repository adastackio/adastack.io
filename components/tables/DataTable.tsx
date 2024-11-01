import StarBadge from "../badges/StarBadge";
import LatestCommitBadge from "../badges/LatestCommitBadge";
import Favicon from "../badges/Favicon";

interface TeamMember {
  name: string;
  website: string;
  teamURL: string;
  type: string;
  stars?: number;
  error?: string | null;
  mostRecentRepo?: {
    timeSinceLastCommit: string;
    url: string;
  };
}

interface DataTableProps {
  teamMembers: TeamMember[];
}

export default function DataTable({ teamMembers }: DataTableProps) {
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
              Most Recent Commit
            </th>
            <th className="nx-m-0 nx-border nx-border-gray-300 nx-px-4 nx-py-2 nx-font-semibold dark:nx-border-gray-600">
              Category
            </th>
          </tr>
        </thead>
        <tbody>
          {teamMembers.map((member, index) => (
            <tr
              className="nx-m-0 nx-border-t nx-border-gray-300 nx-p-0 dark:nx-border-gray-600 even:nx-bg-gray-100 even:dark:nx-bg-gray-600/20"
              key={index}
            >
              <td className="nx-m-0 nx-border nx-border-gray-300 nx-px-4 nx-py-2 dark:nx-border-gray-600 nx-whitespace-nowrap">
                <a
                  href={member.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nx-text-primary-600 nx-underline nx-decoration-from-font [text-underline-position:from-font]"
                >
                  <Favicon url={member.website} />
                  {member.name}
                </a>
              </td>
              <td className="nx-m-0 nx-border nx-border-gray-300 nx-px-4 nx-py-2 dark:nx-border-gray-600">
                <StarBadge
                  teamURL={member.teamURL}
                  stars={member.stars || null}
                  error={member.error || null}
                />
              </td>
              <td className="nx-m-0 nx-border nx-border-gray-300 nx-px-4 nx-py-2 dark:nx-border-gray-600">
                {member.mostRecentRepo ? (
                  <>
                    <span className="text-xs text-gray-500">
                      {member.mostRecentRepo.timeSinceLastCommit}
                    </span>
                    <br />
                    <LatestCommitBadge repoURL={member.mostRecentRepo.url} />
                  </>
                ) : null}
              </td>
              <td className="nx-m-0 nx-border nx-border-gray-300 nx-px-4 nx-py-2 dark:nx-border-gray-600 whitespace-nowrap">
                {member.type}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
