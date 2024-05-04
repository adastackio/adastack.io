import PlausibleProvider from "next-plausible";
import "../css/styles.css";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <PlausibleProvider domain="adastack.io">
      <Component {...pageProps} />
    </PlausibleProvider>
  );
}
