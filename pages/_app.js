import "../css/styles.css";
import { StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider, theme } from "antd";
import { useEffect, useState } from "react";

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
          },
        }}
      >
        {children}
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
