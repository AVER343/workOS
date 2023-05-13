import { Button, Grid, Modal, Spacer, Text } from "@nextui-org/react";
import React, { ReactNode, useState } from "react";
import { I_InitiativesModel } from "../../../utils/db/interfaces";
import { FaTrash } from "react-icons/fa";
import { ModalFormComponent } from "./components/form";
import { useDispatch } from "react-redux";
import { editInitiative } from "../../../redux/intiatives";

function EditinitiativeModal({
  onClose,
  isModalOpen,
  initiative,
  isNew,
  onEdit
}: {
  onClose?: () => {};
  isModalOpen: boolean;
  initiative: I_InitiativesModel;
  isNew: boolean;
  onEdit: any;
}) {
  let [title, setTitle] = useState(initiative.title);
  let [description, setDescription] = useState(initiative.description);

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
                <Text h3>{`${isNew ? "Create new" : "Edit"} Initiative`}</Text>
                <p>
                  {isNew
                    ? `Create new initiative`
                    : `Edit an existing initiative`}
                </p>
              </div>
              <Spacer />
              <ModalFormComponent
                setDescription={setDescription}
                setTitle={setTitle}
                initiative={initiative}
                title={title}
                description={description}
              />
              <Grid.Container justify="center">
                <Grid xs={4}>
                  <Button size={"sm"} ghost color="default" onClick={onClose}>
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
                    onClick={() => {
                      let new_init = { ...initiative, title, description };
                      onEdit(new_init);
                      onClose();
                      
                    }}
                  ></Button>
                </Grid>
              </Grid.Container>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default (EditinitiativeModal);
