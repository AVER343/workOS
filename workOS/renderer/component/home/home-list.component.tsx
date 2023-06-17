import { Avatar, Badge, Button, Card, Grid, Tooltip } from "@nextui-org/react";
import React, { useState } from "react";
import { I_InitiativesModel } from "../../utils/db/interfaces";
import ItemComponent from "./item.component";
import ScaleWrapper from "../wrapper/scale";
import { CloseBadgeComponent } from "../badge/close";
import { DeleteModalComponent } from "../modal/common_modals/delete.modal";
import { motion } from "framer-motion";
function HomeListComponent(props: {
  initiatives: I_InitiativesModel[];
  deleteInititive: (id: string) => void;
  onEdit: any;
}) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Grid.Container gap={3} justify="flex-start">
      {isModalOpen && (
        <DeleteModalComponent
          isModalOpen={isModalOpen}
          onClose={async () => {
            setIsModalOpen(false);
          }}
          onDelete={() => {
            setIsModalOpen(false);
            props.deleteInititive(props.initiatives[selectedIndex].id);
          }}
          initiative={props.initiatives[selectedIndex]}
        />
      )}
      {props.initiatives.map((initiative, index) => (
        <Grid css={{ listStyleType: "none" }} key={initiative.id}>
          <motion.li
            layout
            // initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", delay: 0.2 }}
            key={initiative.id}
          >
            <CloseBadgeComponent
              topPercent={0}
              rightPercent={0}
              key={initiative.id}
              id={initiative.id}
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
              <ItemComponent onEdit={props.onEdit} initiative={initiative} />
            </CloseBadgeComponent>
          </motion.li>
        </Grid>
      ))}
    </Grid.Container>
  );
}

export default HomeListComponent;
