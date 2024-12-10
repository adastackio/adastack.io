import { OSIcon } from "../../assets/icons";

const OS = ({ url, className }) => {
  if (!url) return null;

  const spanClass = className
    ? `open-source-icon-inline inline-block h-3 w-3 ${className}`
    : "open-source-icon-inline inline-block h-3 w-3";

  return (
    <span className={spanClass}>
      <a href={url} target="_blank" rel="noopener">
        <OSIcon />
      </a>
    </span>
  );
};

export default OS;
