import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Row,
  Text,
  Spacer,
  Switch,
  useTheme,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
function LayoutComponent({ children, ...props }) {
  const router = useRouter();
  const route = router;
  return (
    <Container
      style={{ maxWidth: "100vw" }}
      css={{
        w: "100vw",
        h: "100vh",
        padding: "$12",
      }}
    >
      <Row css={{ justifyContent: "flex-end" }}>
        {props.parentUrl && (
          <>
            <Row css={{}}>
              <Button
                color="gradient"
                bordered
                onPress={() => route.push(props.parentUrl)}
                iconLeftCss={{ justifyContent: "center" }}
                icon={
                  <span className="material-icons">
                    {props.parentIcon ?? "arrow_back"}
                  </span>
                }
              >
                {props.parentName}
              </Button>
            </Row>
          </>
        )}
        <Button
          color="gradient"
          bordered
          onPress={() => route.push("/members")}
          icon={<span className="material-icons">account_box</span>}
        >
          Members
        </Button>
      </Row>
      <Spacer />
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
        {children}
      </motion.div>
    </Container>
  );
}

export default LayoutComponent;
