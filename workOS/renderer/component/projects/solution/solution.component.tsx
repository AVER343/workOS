import React, { useState } from "react";
import { Card, Spacer, Col, Row, Button, Text } from "@nextui-org/react";
import { I_SolutionsModel } from "../../../utils/db/interfaces";
import { useRouter } from "next/router";
import EditSolutionModal from "./editSolution.modal";
function SolutionComponent(props: {
  solution: I_SolutionsModel;
  onSave: any;
  isNew: boolean;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  return (
    <>
      {isModalOpen && (
        <EditSolutionModal
          isNew={false}
          solutionData={props.solution}
          onEdit={props.onSave}
          onClose={async () => setIsModalOpen(false)}
        />
      )}
      <Card
        variant="shadow"
        isPressable
        isHoverable
        onPress={() => {
          router.push(`/projects/${props.onSave.id}`);
        }}
        css={{
          width: "300px",
          height: "200px",
          minHeight: "200px",
          mw: "300px",
          minWidth: "stretch",
        }}
      >
        <Card.Header>
          <Text b>
            {props.solution.title ? props.solution.title : `Card Title`}
          </Text>
        </Card.Header>
        <Card.Divider />
        <Card.Body>
          <Text>
            {props.solution.title
              ? `${props.solution.title}`
              : "Some quick example text to build on the card title and make up the bulk of the card's content."}
          </Text>
        </Card.Body>
        <Spacer />
        <Card.Divider />
        <Spacer />
        <Card.Footer>
          <Row justify="flex-end">
            <Button
              color={"secondary"}
              ghost
              onPress={() => {
                setIsModalOpen(true);
              }}
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

export default SolutionComponent;
