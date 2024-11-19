import "../css/styles.css";
import { StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider, theme } from "antd";
import { useEffect, useState } from "react";

const ThemeWrapper = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const callback = (entries) => {
      const isDarkMode = document.documentElement.classList.contains("dark");
      setIsDark(isDarkMode);
    };

    callback();

    const observer = new MutationObserver(callback);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Return null instead of children during SSR
  if (!mounted) return null;

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

// Create a loading wrapper component
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
