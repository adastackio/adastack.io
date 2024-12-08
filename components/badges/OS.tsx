import { OSIcon } from "../../assets/icons";

const OS = ({ repoURL, className }) => {
  if (!repoURL) return null;

  const spanClass = className
    ? `open-source-icon-inline inline-block h-3 w-3 ${className}`
    : "open-source-icon-inline inline-block h-3 w-3";

  return (
    <span className={spanClass}>
      <a href={repoURL} target="_blank" rel="noopener noreferrer">
        <OSIcon />
      </a>
    </span>
  );
};

export default OS;
