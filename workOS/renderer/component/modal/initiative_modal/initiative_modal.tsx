import { Button, Modal, Text, Input, Row, Checkbox } from "@nextui-org/react";
import React, { ReactNode } from "react";
import { I_InitiativesModel } from "../../../utils/db/interfaces";
export function InitiativeModalComponent({
  onClose,
  onDelete,
  isModalOpen,
  initiative,
}: {
  children?: ReactNode;
  onClose?: () => {};
  onDelete?: any;
  isModalOpen: boolean;
  initiative: I_InitiativesModel;
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
        <Modal.Header></Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button auto flat light color={"default"} onPress={onClose}>
            Cancel
          </Button>
          <Button auto flat light color="error" onPress={onDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
