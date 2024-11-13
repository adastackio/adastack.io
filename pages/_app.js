import "../css/styles.css";
import { StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider } from "antd";

export default function MyApp({ Component, pageProps }) {
  return (
    <StyleProvider hashPriority="high">
      <ConfigProvider>
        <Component {...pageProps} />
      </ConfigProvider>
    </StyleProvider>
  );
}
