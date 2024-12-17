import React from "react";
import Link from "next/link";

const TOCBullet = ({ pageName, relativeUrl }) => {
  return (
    <div className="toc-item group relative">
      <Link
        className="toc-link pt-2 pb-2 px-4 ml-3 inline-block dark:!text-indigo-100 !text-blue-950 opacity-80 dark:opacity-100 text-lg transition-transform duration-300"
        href={relativeUrl}
      >
        {pageName}
      </Link>
    </div>
  );
};

export default TOCBullet;
