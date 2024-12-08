import "../css/styles.css";
import { useEffect, useState } from "react";
import { StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider, theme } from "antd";
import localFont from "next/font/local";

const campton = localFont({
  src: [
    { path: "../assets/fonts/3_campton_normal.otf", weight: "400" },
    { path: "../assets/fonts/4_campton_medium.otf", weight: "500" },
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
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    handleThemeChange(); // Initial check

    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  if (!mounted) return null; // Prevent hydration errors

  const themeConfig = {
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
        headerBorderRadius: 4,
      },
    },
  };

  return (
    <StyleProvider hashPriority="high">
      <ConfigProvider theme={themeConfig}>
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

  return isClient ? (
    children
  ) : (
    <div style={{ visibility: "hidden" }}>{children}</div>
  );
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
