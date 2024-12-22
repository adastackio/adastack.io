import React from "react";
import RepoShieldIo from "./badges/shield_io_badges/RepoShieldIo";
import LanguageShieldIo from "./badges/shield_io_badges/LanguageShieldIo";
import LatestCommitBadgeIo from "./badges/shield_io_badges/LatestCommitBadgeIo";
import DiscordBadgeIo from "./badges/shield_io_badges/DiscordBadgeIo";

interface DiscordInfo {
  discordInviteURL: string;
  discordChannelName: string;
}

interface LibraryInfoBarProps {
  repoURL: string;
  language: string;
  discord: DiscordInfo[];
}

const LibraryInfoBar: React.FC<LibraryInfoBarProps> = ({
  repoURL,
  language,
  discord,
}) => {
  return (
    <div className="code-library-info-bar flex gap-2 items-center">
      <LanguageShieldIo language={language} isColorChanging={false} />
      <LatestCommitBadgeIo repoURL={repoURL} />
      {discord &&
        discord.length > 0 &&
        discord.map((info, index) => (
          <DiscordBadgeIo
            key={index}
            discordInviteURL={info.discordInviteURL}
            discordChannelName={info.discordChannelName}
          />
        ))}
      <RepoShieldIo repoURL={repoURL} />
    </div>
  );
};

export default LibraryInfoBar;
