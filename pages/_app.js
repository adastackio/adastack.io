import "../css/styles.css";
import { StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider, theme } from "antd";
import { useConfig } from "nextra-theme-docs";
import { useEffect, useState } from "react";

const ThemeWrapper = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Create a single function for the observer callback
    const callback = (entries) => {
      const isDarkMode = document.documentElement.classList.contains("dark");
      setIsDark(isDarkMode);
      console.log("Theme changed to:", isDarkMode ? "dark" : "light");
    };

    // Initial theme check
    callback();

    // Set up observer
    const observer = new MutationObserver(callback);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Early return for SSR
  if (!mounted) return children;

  return (
    <StyleProvider hashPriority="high">
      <ConfigProvider
        theme={{
          algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
          cssVar: true,
        }}
      >
        {children}
      </ConfigProvider>
    </StyleProvider>
  );
};

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeWrapper>
      <Component {...pageProps} />
    </ThemeWrapper>
  );
}
