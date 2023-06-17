import React, { useState } from "react";
import { Card, Col, Row, Button, Text } from "@nextui-org/react";
import { I_ProjectModel } from "../../utils/db/interfaces";
import EditModal from "../modal/common_modals/edit.modal";
import { ModalFormComponent } from "../modal/common_modals/forms/form";
import EditProjectModal from "../modal/projects/project-edit.modal";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
function ProjectComponent(props: {
  project: I_ProjectModel;
  onSave: any;
  isNew: boolean;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  return (
    <>
      {isModalOpen && (
        <EditProjectModal
          isNew={false}
          project={props.project}
          isModalOpen={isModalOpen}
          onSave={props.onSave}
          onClose={async () => setIsModalOpen(false)}
        />
      )}
      <Card
        variant="shadow"
        isPressable
        isHoverable
        onPress={() => {
          router.push(`/projects/${props.project.id}`);
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
            {props.project.project_title
              ? props.project.project_title
              : `Card Title`}
          </Text>
        </Card.Header>
        <Card.Divider />
        <Card.Body>
          <Text>
            {props.project.project_description
              ? `${
                  props.project.project_description.length > 92
                    ? props.project.project_description.slice(0, 92) + " ..."
                    : props.project.project_description
                }`
              : "Some quick example text to build on the card title and make up the bulk of the card's content."}
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

export default ProjectComponent;
