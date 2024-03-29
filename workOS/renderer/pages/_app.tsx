import { AppProps } from "next/app";
import { wrapper } from "../redux/store";
import { Database } from "../utils/db";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import {
  Navbar,
  NextUIProvider,
  createTheme,
  useTheme,
} from "@nextui-org/react";
import NavbarComponent from "../component/navbar";

import "../styles/global.css";
import "../styles/initiative_modal.css";
import "@silevis/reactgrid/styles.css";
import LayoutComponent from "../layout";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/router";
import { ChakraProvider } from "@chakra-ui/react";
function App({ Component, pageProps }: AppProps) {
  let lightTheme = createTheme({
    type: "light",
    theme: {
      colors: {},
    },
  });
  let darkTheme = createTheme({ type: "dark" });
  const router = useRouter();
  useEffect(() => {
    new Database().InitiativeModels();
  }, [router.asPath]);
  return (
    <AnimatePresence>
      <div className="progress"></div>
      <AnimatePresence mode="wait" initial={false}>
        <NextThemesProvider
          defaultTheme="system"
          attribute="class"
          value={{
            light: lightTheme.className,
            dark: darkTheme.className,
          }}
        >
          <NextUIProvider>
            <Component {...pageProps} />
          </NextUIProvider>
        </NextThemesProvider>
      </AnimatePresence>
    </AnimatePresence>
  );
}
export default wrapper.withRedux(App);
