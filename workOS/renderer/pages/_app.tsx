import { AppProps } from "next/app";
import { wrapper } from "../redux/store";
import { Database } from "../utils/db";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Navbar, NextUIProvider } from "@nextui-org/react";
import NavbarComponent from "../component/navbar";
import "../styles/global.css";
import "../styles/initiative_modal.css";
import LayoutComponent from "../layout";

function App({ Component, pageProps }: AppProps) {
  return (
    <AnimatePresence>
      <NextUIProvider>
        <LayoutComponent>
          <Component {...pageProps} />
        </LayoutComponent>
      </NextUIProvider>
    </AnimatePresence>
  );
}
export default wrapper.withRedux(App);
