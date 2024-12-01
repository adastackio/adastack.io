const CategoryTag = ({ color = "blue", category }) => {
  if (!category) return null;

  const colorVariants = {
    blue: "bg-blue-100 text-blue-800 dark:bg-gray-700 dark:text-blue-400",
    gray: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400",
    red: "bg-red-100 text-red-800 dark:bg-gray-700 dark:text-red-400",
    green: "bg-green-100 text-green-800 dark:bg-gray-700 dark:text-green-400",
    yellow:
      "bg-yellow-100 text-yellow-800 dark:bg-gray-700 dark:text-yellow-300",
    indigo:
      "bg-indigo-100 text-indigo-800 dark:bg-gray-700 dark:text-indigo-400",
    purple:
      "bg-purple-100 text-purple-800 dark:bg-gray-700 dark:text-purple-400",
    pink: "bg-pink-100 text-pink-800 dark:bg-gray-700 dark:text-pink-400",
  };

  const baseClasses =
    "inline-flex items-center text-[10px] font-medium me-2 px-2.5 py-0.5 rounded dark:bg-transparent";

  return (
    <span
      className={`${baseClasses} ${colorVariants[color] || colorVariants.blue}`}
    >
      {category}
    </span>
  );
};

export default CategoryTag;
