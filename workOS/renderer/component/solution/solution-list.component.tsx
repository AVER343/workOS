import React, { useState } from "react";
import { Container, Grid, Tooltip } from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { createProject } from "../../redux/projects";
import { motion } from "framer-motion";
import { I_ProjectModel, I_SolutionsModel } from "../../utils/db/interfaces";
import { CloseBadgeComponent } from "../badge/close";
import { DeleteModalComponent } from "../modal/common_modals";
import SolutionItemComponent from "./solution-item.component";
import { useRouter } from "next/router";
function SolutionListComponent(props: {
  solutions: I_SolutionsModel[];
  isDeleteModalOpen: boolean;
  deleteSolution: any;
  onSave: any;
  setIsDeleteModalOpen: (modalOpen: boolean) => void;
  setSelectedIndex: (index: number) => void;
  selectedIndex: number;
  setIsEditModalOpen: any;
}) {
  return (
    <Container style={{ padding: "0px" }} css={{ listStyleType: "none" }}>
      <Grid.Container gap={4} justify="flex-start">
        {props.solutions.map((solution, index) => (
          <Grid style={{ minWidth: "350px" }} xs={3} key={solution.id}>
            <motion.li
              layout
              // initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", delay: 0.2 }}
              key={solution.id}
            >
              <CloseBadgeComponent
                key={solution.id}
                id={solution.id}
                topPercent={0}
                rightPercent={0}
                content={
                  <Tooltip enterDelay={300} color={"error"} content={"Delete"}>
                    X
                  </Tooltip>
                }
                onPress={() => {
                  props.setSelectedIndex(index);
                  props.setIsDeleteModalOpen(true);
                }}
              >
                <SolutionItemComponent
                  solution={solution}
                  setSolution={() => props.setSelectedIndex(index)}
                  setIsModalOpen={props.setIsEditModalOpen}
                />
              </CloseBadgeComponent>
            </motion.li>
          </Grid>
        ))}
      </Grid.Container>
    </Container>
  );
}

export default SolutionListComponent;
