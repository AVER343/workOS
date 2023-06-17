import {
  Button,
  Modal,
  Text,
  Input,
  Row,
  Checkbox,
  Container,
  Spacer,
  Grid,
} from "@nextui-org/react";
import React, { ReactNode } from "react";
import {
  I_InitiativesModel,
  I_ProjectModel,
  I_SolutionsModel,
} from "../../../utils/db/interfaces";
import { FaTrash } from "react-icons/fa";

export function DeleteModalComponent({
  onClose,
  onDelete,
  isModalOpen,
  initiative,
}: {
  children?: ReactNode;
  onClose?: () => void;
  onDelete?: any;
  isModalOpen: boolean;
  initiative: I_InitiativesModel | I_ProjectModel | I_SolutionsModel;
}) {
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
              <div className="modal-header flex-column">
                <div className="icon-box">
                  <i className="material-icons">&#xE5CD;</i>
                </div>

                <h4 className="modal-title w-100">Are you sure?</h4>
              </div>
              <Spacer />
              <div className="modal-body">
                <p>
                  Do you really want to delete these records? This process
                  cannot be undone.
                </p>
              </div>
              <Spacer />
              <Grid.Container justify="center">
                <Grid xs={4}>
                  <Button size={"sm"} ghost color="default" onClick={onClose}>
                    Cancel
                  </Button>
                </Grid>
                <Spacer style={{ width: "30px" }} />
                <Grid xs={4} style={{ marginRight: "20px" }}>
                  <Button
                    icon={<FaTrash color="white" />}
                    color="error"
                    size={"sm"}
                    onClick={() => {
                      onDelete(initiative)
                    }}
                  >
                    Delete
                  </Button>
                </Grid>
              </Grid.Container>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
