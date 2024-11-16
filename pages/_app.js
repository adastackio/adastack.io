import "../css/styles.css";
import { StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider, theme } from "antd";

export default function MyApp({ Component, pageProps }) {
  return (
    <StyleProvider hashPriority="high">
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          cssVar: true,
        }}
      >
        <Component {...pageProps} />
      </ConfigProvider>
    </StyleProvider>
  );
}
