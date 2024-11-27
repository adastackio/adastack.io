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
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50 z-[1]" />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl font-bold text-white mb-4">Cardano Library</h1>
        <p className="text-xl text-gray-300 mb-8">
          130+ pages of tools and resources
        </p>

        {/* Features list */}
        <div className="flex flex-col items-center gap-2 mb-8 text-gray-300">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
            <span>We are an open source ecosystem explorer.</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
            <span>The website is still in development.</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
            <span>Please vote for us in Catalyst Fund 13!</span>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href="/explore"
          className="inline-flex px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
        >
          Explore Live Pages &gt;
        </Link>
      </div>
    </div>
  );   
};

export default HomeHero;
