import React, { useState } from "react";
import ProjectComponent from "./project.component";
import { Container, Grid, Tooltip } from "@nextui-org/react";
import { motion } from "framer-motion";
import { I_ProjectModel } from "../../utils/db/interfaces";
import { CloseBadgeComponent } from "../badge/close";
import { DeleteModalComponent } from "../modal/common_modals";
import { Spacer } from "@chakra-ui/react";
function ProjectListComponent(props: {
  projects: I_ProjectModel[];
  deleteProject: any;
  onSave: any;
}) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Container
      css={{
        listStyleType: "none",
        paddingLeft: "24px",
        paddingRight: "24px",
      }}
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
      <Spacer />
      <Spacer />
      <Grid.Container
        gap={4}
        className="card-container"
        justify="flex-start"
        css={{
          listStyleType: "none",
          paddingLeft: "24px",
          paddingRight: "24px",
        }}
      >
        {props.projects.map((project, index) => (
          <Grid key={project.id} css={{ listStyleType: "none" }}>
            <motion.li
              layout
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", delay: 0.2 }}
              key={project.id}
            >
              <CloseBadgeComponent
                key={project.id}
                id={project.id}
                topPercent={10}
                rightPercent={0}
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
            </motion.li>
          </Grid>
        ))}
      </Grid.Container>
    </Container>
  );
}

export default ProjectListComponent;
