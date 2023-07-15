import { Button, Grid, Modal, Spacer, Text } from "@nextui-org/react";
import React, { ReactNode, useState, useEffect } from "react";
import {
  I_InitiativesModel,
  I_ProjectModel,
} from "../../../utils/db/interfaces";

function EditModal({
  onClose,
  isModalOpen,
  data,
  isNew,
  heading,
  children,
  subheading,
  onSave,
}: {
  onSave: any;
  onClose?: () => {};
  isModalOpen: boolean;
  data?: I_ProjectModel | I_InitiativesModel;
  isNew: boolean;
  heading: ReactNode;
  children: ReactNode;
  subheading: ReactNode;
}) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Handle keydown event here
      if (event.key == "Enter") {
        onSave();
      }
    };

    // Attach the event listener
    document.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={isModalOpen}
        onClose={onClose}
      >
        <div id="myModal" className="modal fade">
          <div className="modal-dialog modal-confirm">
            <div className="modal-content">
              <div className="modal-header flex-column"></div>
              <div className="modal-body">
                <Text h3>{heading}</Text>
                <p>{subheading}</p>
              </div>
              <Spacer />
              {children}
              <ButtonContainer
                onClose={onClose}
                isNew={isNew}
                onSave={onSave}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default EditModal;
function ButtonContainer({
  onClose,
  isNew,
  onSave,
}: {
  onClose: () => void;
  isNew: boolean;
  onSave: any;
}) {
  return (
    <Grid.Container justify="center">
      <Grid xs={4}>
        <Button size={"sm"} ghost color="default" onPress={onClose}>
          Cancel
        </Button>
      </Grid>
      <Spacer style={{ width: "30px" }} />
      <Grid xs={4} style={{ marginRight: "20px" }}>
        <Button
          icon={
            <>
              <span className="material-icons">
                {isNew ? `add_circle` : "save"}
              </span>
              {isNew ? "Create" : " Save"}
            </>
          }
          color={isNew ? "success" : "secondary"}
          size={"sm"}
          onPress={onSave}
        ></Button>
      </Grid>
    </Grid.Container>
  );
}
