import React from "react";

interface DiscordBadgeIoProps {
  discordInviteURL?: string;
  discordChannelName?: string;
}

const DiscordBadgeIo: React.FC<DiscordBadgeIoProps> = ({
  discordInviteURL,
  discordChannelName = "Discord",
}) => {
  if (!discordInviteURL) {
    return null;
  }

  return (
    <a
      href={discordInviteURL}
      className="inline-block"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        className="shield_io_badge shields_io_repo_badge"
        alt={`${discordChannelName} Discord`}
        src={`https://img.shields.io/badge/${encodeURIComponent(
          discordChannelName
        )}-ffffff?style=flat&logo=discord&logoColor=7289DA&labelColor=dfe8f0`}
      />
    </a>
  );
};

export default DiscordBadgeIo;
