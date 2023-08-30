import React, { useEffect, useState } from "react";
import { Navbar, Link, Card, Radio, Tooltip } from "@nextui-org/react";
import {
  Button,
  Container,
  Row,
  Text,
  Spacer,
  Switch,
  useTheme,
  Loading,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { MoonIcon } from "./icons/moon.icon";
import { useTheme as useNextTheme } from "next-themes";
import { SunIcon } from "./icons/sun.icon";
function LayoutComponent({ children, ...props }) {
  const router = useRouter();
  const route = router;
  const [child, setChildren] = useState(null);
  let { setTheme } = useNextTheme();
  let { theme, isDark } = useTheme();
  useEffect(() => {
    setChildren(children);
  }, [children]);
  const changeTheme = () => {
    if (isDark) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
  return (
    <>
      <Navbar css={{ zIndex: 12 }} isBordered variant={"sticky"}>
        <Navbar.Brand>
          {props.parentUrl && (
              <Row>
                <Button
                  color="primary"
                  auto
                  onPress={() => route.push(props.parentUrl)}
                  iconLeftCss={{ justifyContent: "center" }}
                  icon={
                    <Tooltip placement="rightEnd" content={props.parentName}>
                      <span className="material-icons">
                        {props.parentIcon ?? "arrow_back"}
                      </span>
                    </Tooltip>
                  }
                ></Button>
              </Row>
          )}
        </Navbar.Brand>
        <Navbar.Content>
          <Row css={{ justifyContent: "flex-end" }}>
            {route.asPath && route.asPath.split("/solution/")[1] ? (
              <></>
            ) : !isDark ? (
              <Button auto icon={<MoonIcon />} onPress={changeTheme} />
            ) : (
              <Button auto icon={<SunIcon />} onPress={changeTheme} />
            )}
            <Spacer />
            <Button
              onPress={() => route.push("/members")}
              icon={<span className="material-icons">account_box</span>}
            >
              Members
            </Button>
          </Row>
        </Navbar.Content>
      </Navbar>
      <Spacer />
      <Container
        style={{ maxWidth: "100vw" }}
        css={{
          w: "100vw",
          h: "100vh",
        }}
      >
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 30, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          {child}
        </motion.div>
      </Container>
    </>
  );
}

export default LayoutComponent;
