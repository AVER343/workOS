import React from "react";
import HeaderComponent from "./header";
import { Container, Row, Switch, useTheme } from "@nextui-org/react";
import { MoonIcon } from "./icons/moon.icon";
import { SunIcon } from "./icons/sun.icon";
import { useTheme as useNextTheme } from "next-themes";
function LayoutComponent({ children }) {
  const { setTheme } = useNextTheme();
  const { theme } = useTheme();

  return (
    <Container fluid lg md>
      <Row justify="flex-end">
        <Switch
          checked={true}
          size="xl"
          onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
          iconOn={<SunIcon filled />}
          iconOff={<MoonIcon filled />}
        />
      </Row>
      {children}
    </Container>
  );
}

export default LayoutComponent;
