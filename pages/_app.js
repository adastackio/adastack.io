import "../css/styles.css";
import { StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider, theme } from "antd";
import { useEffect, useState } from "react";
import localFont from "next/font/local";

const campton = localFont({
  src: [
    { path: "../assets/fonts/0_campton_thin.otf", weight: "100" },
    { path: "../assets/fonts/1_campton_extra_light.otf", weight: "200" },
    { path: "../assets/fonts/2_campton_light.otf", weight: "300" },
    { path: "../assets/fonts/3_campton_normal.otf", weight: "400" },
    { path: "../assets/fonts/4_campton_medium.otf", weight: "500" },
    { path: "../assets/fonts/5_campton_semi_bold.otf", weight: "600" },
    { path: "../assets/fonts/6_campton_bold.otf", weight: "700" },
    { path: "../assets/fonts/7_campton_extra_bold.otf", weight: "800" },
    { path: "../assets/fonts/8_campton_black.otf", weight: "900" },
  ],
  variable: "--font-campton",
  fallback: [
    "Segoe UI",
    "Roboto",
    "Noto Sans",
    "Ubuntu",
    "Cantarell",
    "Helvetica Neue",
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Arial",
    "sans-serif",
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "Noto Color Emoji",
  ],
});

const ThemeWrapper = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleThemeChange = () => {
      const isDarkMode = document.documentElement.classList.contains("dark");
      setIsDark(isDarkMode);
    };

    handleThemeChange();

    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  if (!mounted) return null;

  return (
    <StyleProvider hashPriority="high">
      <ConfigProvider
        theme={{
          algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
          cssVar: true,
          token: {
            colorPrimary: "#3964f6",
            colorBgContainer: isDark ? "#141414" : "#ffffff",
            colorBgSpotlight: isDark ? "#141414" : "#ffffff",
            colorTextLightSolid: isDark ? "#ffffff" : "#000000",
          },
          components: {
            Table: {
              colorBgContainer: isDark ? "#0e121e" : "#f7f7f7",
            },
          },
        }}
      >
        <div className={campton.variable}>{children}</div>
      </ConfigProvider>
    </StyleProvider>
  );
};

const LoadingWrapper = ({ children }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

  return children;
};

export default function MyApp({ Component, pageProps }) {
  return (
    <LoadingWrapper>
      <ThemeWrapper>
        <Component {...pageProps} />
      </ThemeWrapper>
    </LoadingWrapper>
  );
}
