import "@/styles/globals.scss";
import "react-tooltip/dist/react-tooltip.css";
import 'reactjs-popup/dist/index.css';

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
