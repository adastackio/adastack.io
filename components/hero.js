import React, { useEffect } from "react";
import { handleHeaderButtonClick } from "../scripts/handleHeaderButtonClick";

function Hero() {
  useEffect(() => {}, []);
  return (
    <div id="animation" className="experience animation">
      <div className="animation-overlay"></div>
      <div className="animation-content-container">
        <div className="animation-title-container">
          <h2 className="animation-title">Cardano Library</h2>
          <p className="animation-subtitle">100+ Pages of Guides and Tools</p>
        </div>
        <div className="animation-button-container">
          <button
            className="animation-button mx-1 px-5 mt-4 text-white transition-colors duration-150 border border-white rounded-lg focus:shadow-outline"
            title="Explore All"
            onClick={() => handleHeaderButtonClick(event)}
          >
            Explore All
          </button>
          <button
            className="animation-button-mobile mx-1 px-5 mt-4 text-white transition-colors duration-150 border border-white rounded-lg focus:shadow-outline"
            title="Explore All"
            onClick={() => handleHeaderButtonClick(event)}
          >
            Explore All
          </button>
        </div>
      </div>
    </div>
  );
}
export { Hero };
