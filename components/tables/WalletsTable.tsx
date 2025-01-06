import React from "react";
import TeamGithubBadge from "@components/badges/TeamGithubBadge";
import GithubRepoBadge from "@components/badges/GithubRepoBadge";
import Favicon from "@components/badges/Favicon";

interface Wallet {
  name: string;
  website: string;
  teamGithubURL: string;
  sourceRepoURL: string;
  tags: string[];
}

interface WalletsTableProps {
  wallets: Wallet[];
  filterBy?: string;
}

const WalletsTable: React.FC<WalletsTableProps> = ({ wallets, filterBy }) => {
  const filteredWallets = filterBy
    ? wallets.filter((wallet) => wallet.tags.includes(filterBy))
    : wallets;

  // Sort wallets by open source status
  const sortedWallets = filteredWallets.sort((a, b) => {
    if (a.sourceRepoURL && !b.sourceRepoURL) return -1;
    if (!a.sourceRepoURL && b.sourceRepoURL) return 1;
    if (a.teamGithubURL && !b.teamGithubURL) return -1;
    if (!a.teamGithubURL && b.teamGithubURL) return 1;
    return 0;
  });

  return (
    <div className="data-table-wrapper">
      <table className="data-table wallet-table">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sortedWallets.map((wallet, index) => (
            <tr
              key={index}
              className="nx-m-0 nx-border-t nx-border-gray-300 nx-p-0 dark:nx-border-gray-600 even:nx-bg-gray-100 even:dark:nx-bg-gray-600/20"
            >
              <td className="nx-m-0 nx-border nx-border-gray-300 nx-px-4 nx-py-2 dark:nx-border-gray-600 table-cell first-column-cell">
                <div className="flex items-center justify-between w-full">
                  <span className="flex items-center">
                    <Favicon url={wallet.website} />
                    &nbsp;
                    <a href={wallet.website}>
                      <span className="team_table_name_container">
                        {wallet.name}
                      </span>
                    </a>
                  </span>
                </div>
              </td>
              <td className="nx-m-0 nx-border nx-border-gray-300 nx-px-4 nx-py-2 dark:nx-border-gray-600 table-cell">
                <TeamGithubBadge
                  teamGithubURL={wallet.teamGithubURL}
                  text="Team"
                />
              </td>
              <td className="nx-m-0 nx-border nx-border-gray-300 nx-px-4 nx-py-2 dark:nx-border-gray-600 table-cell">
                <GithubRepoBadge
                  repoURL={wallet.sourceRepoURL}
                  text="Source Code"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WalletsTable;
