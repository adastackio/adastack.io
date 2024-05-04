import { Plausible } from "../scripts/plausible.js";
import "../css/styles.css";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <Plausible>
      <Component {...pageProps} />
    </Plausible>
  );
}
