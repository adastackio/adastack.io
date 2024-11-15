// components/badges/LanguageBadge.jsx
import React from "react";

const CodeLanguageShieldIoBadge = ({ language }) => {
  if (!language) return null;

  // Convert language name to lowercase and handle special cases
  const formatLanguageName = (name) => {
    const specialCases = {
      "c++": "cpp",
      "c#": "csharp",
      "f#": "fsharp",
      "objective-c": "objectivec",
      "jupyter notebook": "jupyter",
      cuda: "nvidia",
    };
    return specialCases[name.toLowerCase()] || name.toLowerCase();
  };

  const languageLower = formatLanguageName(language);

  // Logo colors mapped to GitHub's language colors
  const logoColorMap = {
    assembly: "6E4C13",
    c: "555555",
    cpp: "F34B7D",
    csharp: "178600",
    css: "563D7C",
    dart: "00B4AB",
    elixir: "6E4A7E",
    elm: "60B5CC",
    erlang: "B83998",
    fsharp: "B845FC",
    go: "00ADD8",
    groovy: "4298B8",
    haskell: "5D4F85",
    html: "E34C26",
    java: "B07219",
    javascript: "F1E05A",
    julia: "A270BA",
    jupyter: "DA5B0B",
    kotlin: "A97BFF",
    latex: "008080",
    lua: "000080",
    markdown: "083FA1",
    nix: "7E7EFF",
    objectivec: "438EFF",
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

  return (
    <img
      src={`https://img.shields.io/badge/${language}-ffffff?style=flat&logo=${languageLower}&logoColor=${logoColor}`}
      className="shields_io_button"
      alt={`${language} badge`}
    />
  );
};

export default CodeLanguageShieldIoBadge;
