import React, { useState } from "react";
import { Card, Col, Row, Button, Text } from "@nextui-org/react";
import { I_ProjectModel } from "../../utils/db/interfaces";
import EditModal from "../modal/common_modals/edit.modal";
import { ModalFormComponent } from "../modal/common_modals/forms/form";
import EditProjectModal from "../modal/projects/project-edit.modal";
function ProjectComponent(props: {
  project: I_ProjectModel;
  onSave: any;
  isNew: boolean;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  return (
    <Card isPressable isHoverable css={{ w: "250px", h: "350px" }}>
      {isModalOpen && (
        <EditProjectModal
          isModalOpen={isModalOpen}
          onClose={async () => setIsModalOpen(false)}
          isNew={props.isNew}
          onSave={props.onSave}
          project={selectedProject}
        />
      )}
      <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
        <Col>
          <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
            {props.project.project_title}
          </Text>
          <Text h3 color="black">
            {props.project.project_description}
          </Text>
        </Col>
      </Card.Header>
      <Card.Body css={{ p: 0 }}>
        <Card.Image
          src="https://nextui.org/images/card-example-6.jpeg"
          width="100%"
          height="100%"
          objectFit="cover"
          alt="Card example background"
        />
      </Card.Body>
      <Card.Footer
        isBlurred
        css={{
          position: "absolute",
          bgBlur: "#ffffff66",
          borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Row>
          <Col>
            <Text color="#000" size={12}>
              {props.project.project_url}
            </Text>
            <Text color="#000" size={12}>
              {props.project.id}
            </Text>
          </Col>
          <Col>
            <Row justify="flex-end">
              <Button
                onPress={async () => {
                  await setSelectedProject(props.project);
                  setIsModalOpen(true);
                }}
                flat
                auto
                rounded
                color="secondary"
              >
                <Text
                  css={{ color: "inherit" }}
                  size={12}
                  weight="bold"
                  transform="uppercase"
                >
                  Edit Me
                </Text>
              </Button>
            </Row>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
}

export default ProjectComponent;
