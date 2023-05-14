import { Button, Card, Grid, Link, Text } from "@nextui-org/react";
import { useRouter } from "next/router";
import React, { ReactNode, useState } from "react";
import { I_InitiativesModel } from "../../utils/db/interfaces";
import EditInitiativeModal from "../modal/initiative/initiative-edit.modal";

function ItemComponent(props: { initiative: I_InitiativesModel; onEdit: any }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      {isModalOpen && (
        <EditInitiativeModal
          isNew={false}
          setIsModalOpen={setIsModalOpen}
          initiative={props.initiative}
          isModalOpen={isModalOpen}
          onEdit={props.onEdit}
          onClose={async () => setIsModalOpen(false)}
        />
      )}
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
                {props.initiative.title}
              </Text>
            </Grid>
            <Grid xs={12}></Grid>
          </Grid.Container>
        </Card.Header>
        <Card.Body css={{ py: "$2" }}>
          <Text>{props.initiative.description}</Text>
        </Card.Body>
        <Card.Footer style={{ justifyContent: "flex-end" }}>
          <Button
            style={{ width: "10%" }}
            light
            animated
            rounded
            bordered
            onPress={() => setIsModalOpen(true)}
            color={"primary"}
          >
            Edit
          </Button>
        </Card.Footer>
      </Card>
    </>
  );
}

export default ItemComponent;
