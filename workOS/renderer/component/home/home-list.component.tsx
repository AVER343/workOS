import { Avatar, Badge, Button, Card, Grid, Tooltip } from "@nextui-org/react";
import React, { useState } from "react";
import { I_InitiativesModel } from "../../utils/db/interfaces";
import ItemComponent from "./item.component";
import ScaleWrapper from "../wrapper/scale";
import { CloseBadgeComponent } from "../badge/close";
import { InitiativeModalComponent } from "../modal/initiative_modal/delete.modal";
function HomeListComponent(props: {
  initiatives: I_InitiativesModel[];
  deleteInititive: (id: string) => void;
  onEdit: any
}) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Grid.Container gap={4} justify="center">
      <Grid>
        {isModalOpen && (
          <InitiativeModalComponent
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
          <React.Fragment key={initiative.id}>
            <CloseBadgeComponent
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
          </React.Fragment>
        ))}
      </Grid>
    </Grid.Container>
  );
}

export default HomeListComponent;
