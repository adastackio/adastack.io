import React from "react";
import Image from "next/image";
import BGImg from "./../assets/dark/1.jpg";
import { handleHeroButtonClick } from "../scripts/handleHeroButtonClick";
import { handleHeroButtonClickMobile } from "../scripts/handleHeroButtonClickMobile";

function Hero() {
  return (
    <div id="animation" className="experience animation">
      <Image
        src={BGImg}
        fill
        style={{ objectFit: "cover" }}
        placeholder="blur"
        priority
        quality={80}
        alt="adastack background texture"
        className="hero-bg"
      />
      <div className="animation-overlay"></div>
      <div className="animation-content-container">
        <div className="animation-title-container">
          <h2 className="animation-title">Cardano Library</h2>
          <p className="animation-subtitle">
            125+ pages of tools and resources
          </p>
        </div>
        <ul className="animation-description-text">
          <li>
            We are an{" "}
            <a href="https://github.com/adastackio/adastack.io" target="_blank">
              open source
            </a>{" "}
            ecosystem explorer.
          </li>
          <li>The website is still in development.</li>
          <li>
            <a href="https://adastack.io/all_pages">All live pages here</a>.
          </li>
          <li>Please vote for us in Catalyst Fund 13! 🙏</li>
        </ul>
        <div className="animation-button-container">
          <button
            className="animation-button mx-1 px-5 mt-4 text-white transition-colors duration-150 border border-white rounded-lg focus:shadow-outline"
            title="Explore All"
            onClick={() => handleHeroButtonClick(event)}
          >
            Explore All
          </button>
          <button
            className="animation-button-mobile mx-1 px-5 mt-4 text-white transition-colors duration-150 border border-white rounded-lg focus:shadow-outline"
            title="Explore All"
            onClick={() => handleHeroButtonClickMobile(event)}
          >
            Explore All
          </button>
        </div>
      </div>
    </div>
  );
}
export { Hero };
