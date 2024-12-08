import Image from "next/image";

type FaviconProps = {
  url: string | null;
};

const Favicon = ({ url }: FaviconProps) => {
  return (
    <div className="inline-flex size-6 items-center justify-center shrink-0 rounded-md border bg-background p-1 favicon-custom-css">
      <Image
        loading="lazy"
        width="64"
        height="64"
        className="aspect-square size-6 rounded"
        src={`https://www.google.com/s2/favicons?sz=128&domain_url=${url}`} alt={""}      />
    </div>
  );
};

export default Favicon;
