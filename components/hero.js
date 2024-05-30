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
          <p className="animation-subtitle">100+ Pages of Guides and Tools</p>
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
            Please{" "}
            <a
              href="https://cardano.ideascale.com/c/idea/119612"
              target="_blank"
            >
              vote for us
            </a>{" "}
            in{" "}
            <a href="https://projectcatalyst.io/funds/12" target="_blank">
              Catalyst Fund 12
            </a>
            ! 🙏
          </li>
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
