import { Button, Card, Grid, Link, Row, Spacer, Text } from "@nextui-org/react";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";
import { I_InitiativesModel } from "../../utils/db/interfaces";
import EditInitiativeModal from "../modal/initiative/initiative-edit.modal";
import { motion } from "framer-motion";
const displayLetters = 80;
function ItemComponent(props: { initiative: I_InitiativesModel; onEdit: any }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      {isModalOpen && (
        <EditInitiativeModal
          isNew={false}
          initiative={props.initiative}
          isModalOpen={isModalOpen}
          onEdit={props.onEdit}
          onClose={async () => setIsModalOpen(false)}
        />
      )}
      <Card
        variant="shadow"
        isPressable
        isHoverable
        onPress={() => {
          router.push(`/initiatives/${props.initiative.id}`);
        }}
        css={{
          width: "300px",
          height: "200px",
          minHeight: "200px",
          mw: "330px",
          minWidth: "stretch",
        }}
      >
        <Card.Header>
          <Text b>
            {props.initiative.title ? props.initiative.title : `Card Title`}
          </Text>
        </Card.Header>
        <Card.Divider />
        <Card.Body>
          <Text>
            {props.initiative.description
              ? `${
                  props.initiative.description.length > displayLetters
                    ? props.initiative.description.slice(0, displayLetters) +
                      " ..."
                    : props.initiative.description
                }`
              : ""}
          </Text>
        </Card.Body>
        <Card.Divider />
        <Card.Footer>
          <Row justify="flex-end">
            <Button
              color={"secondary"}
              ghost
              onPress={() => setIsModalOpen(true)}
              size="sm"
            >
              Edit
            </Button>
          </Row>
        </Card.Footer>
      </Card>
    </>
  );
}

export default ItemComponent;
