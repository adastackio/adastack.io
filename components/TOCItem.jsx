import React from "react";
import Link from "next/link";
import { BlueBullet } from "../assets/icons";

const TOCItem = ({ pageName, relativeUrl }) => {
  return (
    <div className="toc-item group relative">
      <BlueBullet className="h-2 w-2 inline-block mb-[3.7px] bullet" />
      <Link
        href={relativeUrl}
        className="toc-link pt-2 pb-2 px-2 ml-3 inline-block dark:!text-indigo-100 !text-blue-950 opacity-80 dark:opacity-100 text-lg transition-transform duration-300"
      >
        {pageName}
      </Link>
    </div>
  );
};

export default TOCItem;
