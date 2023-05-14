import React, { useState } from "react";
import ProjectComponent from "./project.component";
import { Container, Grid, Tooltip } from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { createProject } from "../../redux/projects";
import { I_ProjectModel } from "../../utils/db/interfaces";
import { CloseBadgeComponent } from "../badge/close";
import { DeleteModalComponent } from "../modal/common_modals";
function ProjectListComponent(props: {
  projects: I_ProjectModel[];
  deleteProject: any;
  onSave: any;
}) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Container
      style={{ marginTop: "25px", marginLeft: "1vw", marginRight: "1vw" }}
    >
      {isModalOpen && (
        <DeleteModalComponent
          isModalOpen={isModalOpen}
          onClose={async () => {
            setIsModalOpen(false);
          }}
          onDelete={() => {
            setIsModalOpen(false);
            props.deleteProject(props.projects[selectedIndex].id);
          }}
          initiative={props.projects[selectedIndex]}
        />
      )}
      <Grid.Container gap={2} justify="space-between">
        {props.projects.map((project, index) => (
          <Grid
            style={{ minWidth: "250px", marginTop: "15px" }}
            xs={3}
            key={project.id}
          >
            <CloseBadgeComponent
              key={project.id}
              id={project.id}
              content={
                <Tooltip enterDelay={300} color={"error"} content={"Delete"}>
                  X
                </Tooltip>
              }
              onPress={() => {
                setSelectedIndex(index);
                setIsModalOpen(true);
              }}
            >
              <ProjectComponent
                isNew={false}
                project={project}
                onSave={props.onSave}
              />
            </CloseBadgeComponent>
          </Grid>
        ))}
      </Grid.Container>
    </Container>
  );
}

export default ProjectListComponent;
