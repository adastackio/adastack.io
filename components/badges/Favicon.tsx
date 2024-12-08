import Image from "next/image";

type FaviconProps = {
  url: string | null;
};

const Favicon = ({ url }: FaviconProps) => {
  return (
    <span className="inline-flex size-6 items-center justify-center shrink-0 rounded-md bg-background p-1 favicon-custom-css">
      <Image
        loading="lazy"
        className="aspect-square h-3"
        src={`https://www.google.com/s2/favicons?sz=128&domain_url=${url}`} alt={""}      />
    </span>
  );
};

export default Favicon;
