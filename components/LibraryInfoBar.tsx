import React from "react";
import RepoShieldIo from "./badges/shield_io_badges/RepoShieldIo";
import LanguageShieldIo from "./badges/shield_io_badges/LanguageShieldIo";
import LatestCommitBadgeIo from "./badges/shield_io_badges/LatestCommitBadgeIo";
import DiscordBadgeIo from "./badges/shield_io_badges/DiscordBadgeIo";
import DocsShieldIo from "./badges/shield_io_badges/DocsShieldIo";

interface DiscordInfo {
  discordInviteURL: string;
  discordChannelName: string;
}

interface LibraryInfoBarProps {
  repoURL: string;
  language: string;
  docsURL: string;
  discord: DiscordInfo[];
}

const LibraryInfoBar: React.FC<LibraryInfoBarProps> = ({
  repoURL,
  language,
  discord,
  docsURL,
}) => {
  return (
    <div className="code-library-info-bar flex gap-2 items-center">
      {language && (
        <LanguageShieldIo language={language} isColorChanging={false} />
      )}
      {docsURL && <DocsShieldIo docsURL={docsURL} />}
      {repoURL && <LatestCommitBadgeIo repoURL={repoURL} />}
      {discord &&
        discord.length > 0 &&
        discord.map((info, index) => (
          <DiscordBadgeIo
            key={index}
            discordInviteURL={info.discordInviteURL}
            discordChannelName={info.discordChannelName}
          />
        ))}
      {repoURL && <RepoShieldIo repoURL={repoURL} />}
    </div>
  );
};

export default LibraryInfoBar;
