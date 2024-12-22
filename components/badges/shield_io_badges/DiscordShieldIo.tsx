import React from "react";

interface DiscordShieldIoProps {
  discordInviteURL?: string;
  discordChannelName?: string;
}

const DiscordShieldIo: React.FC<DiscordShieldIoProps> = ({
  discordInviteURL,
  discordChannelName = "Discord",
}) => {
  if (!discordInviteURL) {
    return null;
  }

  // Replace dashes with HTML entity for en dash
  const formattedChannelName = discordChannelName.replace(/-/g, "–");

  return (
    <a
      href={discordInviteURL}
      className="inline-block"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        className="shield_io_badge badge-io-custom-shading shields_io_repo_badge"
        alt={`${discordChannelName} Discord`}
        src={`https://img.shields.io/badge/${encodeURIComponent(
          formattedChannelName
        )}-ffffff?style=flat&logo=discord&logoColor=7289DA&labelColor=dfe8f0`}
      />
    </a>
  );
};

export default DiscordShieldIo;
