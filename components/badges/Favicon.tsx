import Image from "next/image";
import { useState } from "react";
import { BlankFallback } from "../../assets/icons";

type FaviconProps = {
  url: string | null;
};

const Favicon = ({ url }: FaviconProps) => {
  const [imageError, setImageError] = useState(false);
  
  // Clean URL and handle edge cases
  const cleanUrl = url?.trim();
  const [src] = useState(() => {
    if (!cleanUrl) return "";
    // Encode the URL properly to avoid issues with special characters
    return `https://www.google.com/s2/favicons?sz=128&domain_url=${encodeURIComponent(cleanUrl)}`;
  });

  return (
    <span className="inline-flex size-6 items-center justify-center shrink-0 rounded-md bg-background p-1 favicon-custom-css relative h-3 w-3">
      {imageError || !src ? (
        <BlankFallback className="h-full w-full" />
      ) : (
        <Image
          loading="lazy"
          className="aspect-square"
          src={src}
          alt="Favicon"
          fill
          unoptimized={true}
          onError={() => setImageError(true)}
        />
      )}
    </span>
  );
};

export default Favicon;
