import { AppProps } from "next/app";
import { wrapper } from "../redux/store";
import { Database } from "../utils/db";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Navbar, NextUIProvider, createTheme } from "@nextui-org/react";
import NavbarComponent from "../component/navbar";
import "@silevis/reactgrid/styles.css";

import "../styles/global.css";
import "../styles/initiative_modal.css";
import LayoutComponent from "../layout";
import { ThemeProvider as NextThemesProvider } from "next-themes";
function App({ Component, pageProps }: AppProps) {
  let lightTheme = createTheme({
    type: "light",
    theme: {
      colors: {},
    },
  });
  let darkTheme = createTheme({ type: "dark" });
  return (
    <AnimatePresence>
      <NextThemesProvider
        defaultTheme="light"
        attribute="class"
        value={{
          light: lightTheme.className,
          dark: darkTheme.className,
        }}
      >
        <NextUIProvider>
          <LayoutComponent>
            <Component {...pageProps} />
          </LayoutComponent>
        </NextUIProvider>
      </NextThemesProvider>
    </AnimatePresence>
  );
}
export default wrapper.withRedux(App);
