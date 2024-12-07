import React from "react";

interface LanguageShieldIoProps {
  language: string;
  isColorChanging?: boolean;
}

const LanguageShieldIo = ({ language, isColorChanging = false }: LanguageShieldIoProps) => {
  if (!language) return null;

  const capitalizedLanguage = language.charAt(0).toUpperCase() + language.slice(1);

  // Convert language name to lowercase and handle special cases
  const formatLanguageName = (name) => {
    const specialCases = {
      "c++": "cplusplus",
      "c#": "csharp",
      "f#": "fsharp",
      "objective-c": "objectivec",
      "jupyter notebook": "jupyter",
      html: "html5",
      java: "openjdk", 
      nix: "nixos", 
    };
    return specialCases[name.toLowerCase()] || name.toLowerCase();
  };
  
  const languageLower = formatLanguageName(language);
  
  const encodedLanguage = encodeURIComponent(capitalizedLanguage);
  
  // Logo colors mapped to GitHub's language colors
  const logoColorMap = {
    cplusplus: "007cc7",
    csharp: "178600",
    objectivec: "438EFF",
    jupyter: "DA5B0B",
    html5: "E34C26",
    openjdk: "ED8B00",
    nixos: "5277c3",
    assembly: "6E4C13",
    c: "555555",
    fsharp: "B845FC",
    css: "563D7C",
    dart: "00B4AB",
    elixir: "6E4A7E",
    elm: "60B5CC",
    erlang: "B83998",
    go: "00ADD8",
    groovy: "4298B8",
    gleam: "FFAFF3",
    haskell: "5D4F85",
    javascript: "F1E05A",
    julia: "A270BA",
    kotlin: "A97BFF",
    latex: "008080",
    lua: "000080",
    markdown: "083FA1",
    ocaml: "3BE133",
    perl: "0298C3",
    php: "4F5D95",
    python: "3572A5",
    r: "198CE7",
    ruby: "701516",
    rust: "DEA584",
    scala: "C22D40",
    shell: "89E051",
    solidity: "AA6746",
    swift: "F05138",
    typescript: "007ACC",
    vim: "199F4B",
    vue: "41B883",
    webassembly: "04133B",
    zig: "EC915C",
    default: "333333",
  };

  const logoColor = logoColorMap[languageLower] || logoColorMap.default;

  if (!isColorChanging) {
    return (
      <img
        src={`https://img.shields.io/badge/${encodedLanguage}-ffffff?style=flat&logo=${languageLower}&logoColor=${logoColor}`}
        className="shield_io_badge shields_io_language_badge inline-block"
        alt={`${encodedLanguage} badge`}
      />
    );
  }

  return (
    <>
      <img
        src={`https://img.shields.io/badge/${encodedLanguage}-ffffff?style=flat&logo=${languageLower}&logoColor=${logoColor}`}
        className="shield_io_badge shields_io_language_badge  inline-block light"
        alt={`${encodedLanguage} badge`}
      />
      <img
        src={`https://img.shields.io/badge/${encodedLanguage}-1a1a1a?style=flat&logo=${languageLower}&logoColor=${logoColor}`}
        className="shield_io_badge shields_io_language_badge  inline-block dark"
        alt={`${encodedLanguage} programming language`}
      />
    </>
  );
};

export default LanguageShieldIo;
