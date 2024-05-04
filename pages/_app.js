import { Script } from "next/script";
import "../css/styles.css";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <Script src="../scripts/plausible.js">
      <Component {...pageProps} />
    </Script>
  );
}
