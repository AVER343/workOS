import React, { useEffect, useState } from "react";
import { Button, Container, Row, Spacer, Switch, useTheme } from "@nextui-org/react";
import { useRouter } from "next/router";
function LayoutComponent({ children, ...props }) {
  const router = useRouter();
  const route = router;
  console.log({ children, props });
  return (
    <Container
      style={{ maxWidth: "100vw" }}
      css={{
        w: "100vw",
        h: "100vh",
        padding: "$12",
      }}
    >
      <Row css={{ justifyContent: 'flex-end' }}>
        {props.parentUrl && (
          <>
            <Row css={{ justifyContent: 'space-between' }}>
              <Button
                light
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
          light
          onPress={() => route.push('/members')}
          icon={
            <span className="material-icons">
              account_box
            </span>
          }
        >
          Members
        </Button>
      </Row>
      <Spacer />
      {children}
    </Container>
  );
}

export default LayoutComponent;
