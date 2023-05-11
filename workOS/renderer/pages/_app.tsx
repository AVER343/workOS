import { AppProps } from "next/app";
import { wrapper } from "../redux/store";
import { Database } from "../utils/db";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Navbar, NextUIProvider } from "@nextui-org/react";
import NavbarComponent from "../component/navbar";
import "../styles/global.css";
function App({ Component, pageProps }: AppProps) {
  return (
    <AnimatePresence>
      <NextUIProvider>
        <NavbarComponent />
        <Component {...pageProps} />
      </NextUIProvider>
    </AnimatePresence>
  );
}
export default wrapper.withRedux(App);
