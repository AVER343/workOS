import React, { useState } from "react";
import { Layout } from "./layout";
import { Navbar, Button, Text, Tooltip } from "@nextui-org/react";
import Link from "next/link";
import { HeartIcon } from "./home-icon.component";
import { useRouter } from "next/router";

function NavbarComponent() {
  const [isDark, setIsDark] = useState(false);
  const router = useRouter();
  return (
    <Layout>
      <Navbar isBordered={isDark} variant="sticky">
        <Navbar.Brand>
          <Text b color="inherit" hideIn="xs">
            <Tooltip
              placement="rightEnd"
              enterDelay={500}
              color={"primary"}
              rounded
              content="Initiative"
            >
              <Button
                auto
                color="default"
                onPress={() => router.push("/home")}
                icon={
                  <HeartIcon
                    filled
                    size={24}
                    height={24}
                    width={24}
                    label={"Home"}
                  />
                }
              />
            </Tooltip>
          </Text>
        </Navbar.Brand>
      </Navbar>
    </Layout>
  );
}

export default NavbarComponent;
