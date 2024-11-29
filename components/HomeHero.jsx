// components/HomeHero.jsx
import Link from "next/link";
import Image from "next/image";
import bgImage from "../assets/images/bg.jpg";

const HomeHero = () => {
  return (
    <div className="homehero relative flex items-center justify-center overflow-hidden">
      <Image
        src={bgImage}
        alt="Background"
        priority
        fill
        sizes="100vw"
        className="object-cover"
        quality={100}
        padding="0px 50px"
      />

      <div className="relative z-10 text-center px-4">
        <h1 className="text-[36px] font-bold text-[#c9d3ee] mb-4">
          Cardano Library
        </h1>
        <p className="text-xl text-gray-300 mb-4 specialized_font">
          Learn, Explore, and Discover
        </p>

        <div className="flex flex-col items-center gap-2 mb-8 text-gray-300">
          <div className="flex items-center gap-2 w-[335px]">
            <span>
              Adastack is your comprehensive guide to the Cardano ecosystem.
              Open-source knowledge curated by the Cardano community.
            </span>
          </div>
        </div>

        <Link
          href="/all_pages"
          className="homehero-button inline-flex px-4 py-2 bg-[#4363ee] text-white rounded border-2 border-[#5c78e8] hover:bg-[#0c1123] transition-colors"
        >
          <span>Explore All Pages</span>
        </Link>
      </div>
    </div>
  );
};

export default HomeHero;
