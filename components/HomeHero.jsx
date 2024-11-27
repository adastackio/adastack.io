// components/HomeHero.jsx
import Link from "next/link";
import Image from "next/image";
import bgImage from "../assets/images/bg.jpg";

const HomeHero = () => {
  return (
    <div className="homehero relative  flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src={bgImage}
        alt=""
        fill
        priority
        className="object-cover z-0"
        quality={100}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl font-bold text-white mb-4">Cardano Library</h1>
        <p className="text-xl text-gray-300 mb-8">
          130+ pages of tools and resources
        </p>

        {/* Features list */}
        <div className="flex flex-col items-center gap-2 mb-8 text-gray-300">
          <div className="flex items-center gap-2 w-[335px]">
            <span>
              We are an open source ecosystem explorer. This website is still in
              development. Please vote for us in Catalyst Fund 13!
            </span>
          </div>
          {/* <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
            <span>The website is still in development.</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
            <span>Please vote for us in Catalyst Fund 13!</span>
          </div> */}
        </div>

        {/* CTA Button */}
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
