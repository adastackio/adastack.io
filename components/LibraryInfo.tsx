import React from "react";
import RepoShieldIo from "./badges/shield_io_badges/RepoShieldIo";
import LanguageShieldIo from "./badges/shield_io_badges/LanguageShieldIo";
import LatestCommitShieldIo from "./badges/shield_io_badges/LatestCommitShieldIo";
import DiscordShieldIo from "./badges/shield_io_badges/DiscordShieldIo";
import DocsShieldIo from "./badges/shield_io_badges/DocsShieldIo";

interface DiscordInfo {
  discordInviteURL: string;
  DiscordServerName: string;
}

interface LibraryInfoProps {
  repoURL: string;
  language: string;
  docsURL: string;
  discord: DiscordInfo[];
}

const LibraryInfo: React.FC<LibraryInfoProps> = ({
  repoURL,
  language,
  discord,
  docsURL,
}) => {
  return (
    <div className="code-library-info-bar flex gap-2 items-center pb-5">
      {language && (
        <LanguageShieldIo language={language} isColorChanging={false} />
      )}
      {docsURL && <DocsShieldIo docsURL={docsURL} />}

      {discord &&
        discord.length > 0 &&
        discord.map((info, index) => (
          <DiscordShieldIo
            key={index}
            discordInviteURL={info.discordInviteURL}
            DiscordServerName={info.DiscordServerName}
          />
        ))}
      {repoURL && <LatestCommitShieldIo repoURL={repoURL} />}
      {repoURL && <RepoShieldIo repoURL={repoURL} />}
    </div>
  );
};

export default LibraryInfo;
