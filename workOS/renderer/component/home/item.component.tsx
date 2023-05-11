import { Button, Card, Grid, Link, Text } from "@nextui-org/react";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import { I_InitiativesModel } from "../../utils/db/interfaces";

function ItemComponent(props: { initiative: I_InitiativesModel }) {
  const router = useRouter();
  return (
    <Card
      onPress={() => {
        router.push(`/initiatives/${props.initiative.id}`);
      }}
      isPressable
      isHoverable
      css={{
        maxW: "max-content",
        mw: "400px",
        margin: "$6",
        minWidth: "250px",
      }}
    >
      <Card.Header>
        <img
          alt="nextui logo"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width="34px"
          height="34px"
        />
        <Grid.Container css={{ pl: "$6" }}>
          <Grid xs={12}>
            <Text h4 css={{ lineHeight: "$xs" }}>
              Next UI
            </Text>
          </Grid>
          <Grid xs={12}>
            <Text css={{ color: "$accents8" }}>nextui.org</Text>
          </Grid>
        </Grid.Container>
      </Card.Header>
      <Card.Body css={{ py: "$2" }}>
        <Text>
          Make beautiful websites regardless of your design experience.
        </Text>
      </Card.Body>
      <Card.Footer style={{ justifyContent: "flex-end" }}>
        {/* <Link
          style={{ flex: "3" }}
          color="primary"
          target="_blank"
          href="https://github.com/nextui-org/nextui"
        >
          Visit source code on GitHub.
        </Link> */}
        <Button
          style={{ width: "10%" }}
          light
          animated
          rounded
          bordered
          color={"primary"}
        >
          Edit
        </Button>
      </Card.Footer>
    </Card>
  );
}

export default ItemComponent;
