import { useRouter } from "next/router";
import { usePageLoading } from "@/hooks/use-page-loading";
import Loading from "@/components/Loading";
import "../css/styles.css";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      {isPageLoading && <Loading /> && console.log("loading")}
    </>
  );
}
