import React from "react";
import TeamGithubBadge from "@components/badges/TeamGithubBadge";
import GithubRepoBadge from "@components/badges/GithubRepoBadge";
import Favicon from "@components/badges/Favicon";

interface Wallet {
  name: string;
  website: string;
  teamGithubURL: string;
  walletRepoURL: string;
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
    if (a.walletRepoURL && !b.walletRepoURL) return -1;
    if (!a.walletRepoURL && b.walletRepoURL) return 1;
    if (a.teamGithubURL && !b.teamGithubURL) return -1;
    if (!a.teamGithubURL && b.teamGithubURL) return 1;
    return 0;
  });

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Wallet</th>
          <th>Team on GitHub</th>
          <th>Wallet Repo</th>
        </tr>
      </thead>
      <tbody>
        {sortedWallets.map((wallet, index) => (
          <tr
            key={index}
            className="nx-m-0 nx-border-t nx-border-gray-300 nx-p-0 dark:nx-border-gray-600 even:nx-bg-gray-100 even:dark:nx-bg-gray-600/20"
          >
            <td className="nx-m-0 nx-border nx-border-gray-300 nx-px-4 nx-py-2 dark:nx-border-gray-600 first-table-data">
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
            <td className="nx-m-0 nx-border nx-border-gray-300 nx-px-4 nx-py-2 dark:nx-border-gray-600 second-table-data">
              <TeamGithubBadge
                teamGithubURL={wallet.teamGithubURL}
                text="Team"
              />
            </td>
            <td className="nx-m-0 nx-border nx-border-gray-300 nx-px-4 nx-py-2 dark:nx-border-gray-600 third-table-data">
              <GithubRepoBadge
                repoURL={wallet.walletRepoURL}
                text="Wallet Code"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WalletsTable;
