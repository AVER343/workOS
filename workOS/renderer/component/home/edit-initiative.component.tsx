import { Button, Container, Text } from "@nextui-org/react";
import { I_InitiativesModel } from "../../utils/db/interfaces";

import { v4 as uuidv4 } from "uuid";
import EditInitiativeModal from "../modal/initiative/initiative-edit.modal";
import { useState } from "react";
export function CreateInitiative(props: {
  handleCreate: (project: I_InitiativesModel) => void;
  onEdit: any;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      {isModalOpen && (
        <EditInitiativeModal
          onEdit={props.onEdit}
          isModalOpen={isModalOpen}
          onClose={async () => setIsModalOpen(false)}
          isNew={true}
          initiative={{
            created_at: new Date().toString(),
            modified_at: new Date().toString(),
            title: "",
            description: "",
            project_ids: [],
            id: uuidv4(),
          }}
        />
      )}
      <Button
        color={"primary"}
        onPress={() => {
          setIsModalOpen(true);
        }}
      >
        <span className="material-icons">add_circle</span>
        <Text color="white">New Initiative</Text>
      </Button>
    </>
  );
}
