import React from "react";
import RepoShieldIo from "./badges/shield_io_badges/RepoShieldIo";
import LanguageShieldIo from "./badges/shield_io_badges/LanguageShieldIo";
import LatestCommitBadgeIo from "./badges/shield_io_badges/LatestCommitBadgeIo";
import DiscordBadgeIo from "./badges/shield_io_badges/DiscordBadgeIo";

interface LibraryInfoBarProps {
  repoURL: string;
  language: string;
  discordInviteURL: string;
  discordChannelName: string;
}

const LibraryInfoBar = ({
  repoURL,
  language,
  discordInviteURL,
  discordChannelName,
}: LibraryInfoBarProps) => {
  return (
    <div className="code-library-info-bar flex gap-2 items-center">
      <LanguageShieldIo language={language} isColorChanging={false} />
      <LatestCommitBadgeIo repoURL={repoURL} />
      <DiscordBadgeIo
        discordInviteURL={discordInviteURL}
        discordChannelName={discordChannelName}
      />
      <RepoShieldIo repoURL={repoURL} />
    </div>
  );
};

export default LibraryInfoBar;
