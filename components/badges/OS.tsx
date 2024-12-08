import { OSIcon } from "../../assets/icons";

const OS = ({ repoURL, className }) => {
  if (!repoURL) return null;

  return (
    <span className={`inline-block h-3 w-3 ${className}`}>
      <a href={repoURL} target="_blank" rel="noopener noreferrer">
        <OSIcon />
      </a>
    </span>
  );
};

export default OS;
