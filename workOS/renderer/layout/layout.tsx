import React, { useEffect, useState } from "react";
import HeaderComponent from "./header";
import { Container, Row, Switch, useTheme } from "@nextui-org/react";
import { MoonIcon } from "./icons/moon.icon";
import { SunIcon } from "./icons/sun.icon";
import { useTheme as useNextTheme } from "next-themes";
import { useRouter } from "next/router";
import { Routing } from "./routing";
function LayoutComponent({ children }) {
  const { setTheme } = useNextTheme();
  const { theme } = useTheme();
  const router = useRouter();
  const [isLight, setIsLight] = useState(true);
  useEffect(() => {
    const route = router;
    Routing(route);
  }, [router.asPath]);
  return (
    <Container
      style={{ maxWidth: "100vw" }}
      css={{
        w: "100vw",
        h: "100vh",
        padding: "$12",
      }}
    >
      <Row justify="space-between">
        {/* <Switch
          checked={isLight}
          size="xl"
          onChange={(e) => {
            {
              setTheme(e.target.checked ? "light" : "dark");
              setIsLight(!isLight);
            }
          }}
          iconOn={<SunIcon filled />}
          iconOff={<MoonIcon filled />}
        />
        <Switch
          checked={isLight}
          size="xl"
          onChange={(e) => {
            setTheme(e.target.checked ? "light" : "dark");
            setIsLight(!isLight);
          }}
          iconOn={<SunIcon filled />}
          iconOff={<MoonIcon filled />}
        /> */}
      </Row>
      {children}
    </Container>
  );
}

export default LayoutComponent;
