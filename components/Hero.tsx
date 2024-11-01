import Image from "next/image";

interface HeroProps {
  title: string;
  subtitle: string;
  description?: string[];
  backgroundImage: string;
  buttonText?: string;
  buttonLink?: string;
}

export const Hero = ({
  title,
  subtitle,
  description = [],
  backgroundImage,
  buttonText,
  buttonLink
}: HeroProps) => (
  <div id="animation" className="experience animation">
    <Image
      src={backgroundImage}
      fill
      style={{ objectFit: "cover" }}
      placeholder="blur"
      priority
      quality={80}
      alt="hero background texture"
      className="hero-bg"
    />
    <div className="animation-overlay"></div>
    <div className="animation-content-container">
      <div className="animation-title-container">
        <h2 className="animation-title">{title}</h2>
        <p className="animation-subtitle">{subtitle}</p>
      </div>
      {description.length > 0 && (
        <ul className="animation-description-text">
          {description.map((item, index) => (
            <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      )}
      {buttonText && buttonLink && (
        <div className="animation-button-container">
          <a href={buttonLink}>
            <button
              className="animation-button mx-1 px-5 mt-4 text-white transition-colors duration-150 border border-white rounded-lg focus:shadow-outline"
              title={buttonText}
            >
              {buttonText}
            </button>
            <button
              className="animation-button-mobile mx-1 px-5 mt-4 text-white transition-colors duration-150 border border-white rounded-lg focus:shadow-outline"
              title={buttonText}
            >
              {buttonText}
            </button>
          </a>
        </div>
      )}
    </div>
  </div>
);

export default Hero;
