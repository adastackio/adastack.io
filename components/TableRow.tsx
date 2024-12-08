import React from "react";

// Memoized StarIcon component with display name
const StarIcon = React.memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    aria-hidden="true"
    data-slot="icon"
    className="mr-1 inline-block h-4 w-4 align-text-bottom text-gray-600"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
    />
  </svg>
));
StarIcon.displayName = "StarIcon"; // Assign display name

interface TableRowProps {
  repoURL: string;
  stars: number | null;
  error: string | null;
}

// Memoized TableRow component with display name
const TableRow: React.FC<TableRowProps> = React.memo(
  ({ repoURL, stars, error }) => {
    if (!repoURL) {
      return "";
    }

    const getBadgeContent = () => {
      if (error) {
        console.log(error);
      }
      if (stars !== null) {
        return stars.toLocaleString();
      } else {
        return "...";
      }
    };

    // Render the star badge
    return (
      <a href={repoURL} target="_blank" rel="noopener noreferrer">
        <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-sm font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
          <StarIcon />
          <span className="stars">{getBadgeContent()}</span>
        </span>
      </a>
    );
  }
);
TableRow.displayName = "TableRow"; // Assign display name

export default TableRow;
