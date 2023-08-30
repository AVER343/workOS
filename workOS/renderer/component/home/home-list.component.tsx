import {
  Avatar,
  Badge,
  Text,
  Button,
  Card,
  Grid,
  Tooltip,
} from "@nextui-org/react";
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
    <>
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
      <Grid.Container
        gap={1}
        className="card-container"
        justify="flex-start"
        css={{
          listStyleType: "none",
        }}
      >
        {props.initiatives.map((initiative, index) => (
          <Grid css={{ listStyleType: "none" }} key={initiative.id}>
            <motion.li
              layout
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", delay: 0.2 }}
              key={initiative.id}
            >
              <CloseBadgeComponent
                topPercent={100}
                rightPercent={`calc`}
                key={initiative.id}
                id={initiative.id}
                content={<Text>X</Text>}
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
    </>
  );
}

export default HomeListComponent;
