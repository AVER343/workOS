import React from "react";
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";

export default function SaveSolutionDataModal({
  visible,
  discardHandler,
  closeHandler,
  saveHandler,
}) {
  return (
    <div>
      <Modal
        preventClose
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Are you sure you want to navigate away?
          </Text>
        </Modal.Header>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button auto flat color="secondary" onPress={discardHandler}>
            Discard
          </Button>
          <Button auto onPress={saveHandler}>
            Save & Go Back
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
