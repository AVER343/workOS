import { Button, Grid, Modal, Spacer, Text } from "@nextui-org/react";
import React, { useState } from "react";
import { I_InitiativesModel } from "../../../utils/db/interfaces";
import { ModalFormComponent } from "../common_modals/forms/form";
import EditModal from "../common_modals/edit.modal";
import { v4 as uuidv4 } from "uuid";
function EditinitiativeModal({
  onClose,
  isModalOpen,
  initiative,
  isNew,
  onEdit,
}: {
  onClose?: () => {};
  isModalOpen: boolean;
  initiative: I_InitiativesModel;
  isNew: boolean;
  onEdit: any;
}) {
  let inputFields = [
    { field: "title", display_name: "Title", labelPlaceholder: "Title" },
    {
      field: "description",
      display_name: "Description",
      labelPlaceholder: "Description",
    },
  ];
  let [initiativeData, setInitiativeData] = useState({ ...initiative });
  return (
    <>
      {isModalOpen && (
        <EditModal
          heading={isNew ? `Create new project` : `Update an existing Project`}
          isModalOpen={isModalOpen}
          onClose={async () => onClose()}
          isNew={isNew}
          onSave={() => {
            let new_project_data = { ...initiative, ...initiativeData };
            onEdit(new_project_data);
            onClose();
          }}
          subheading={
            isNew
              ? "Create a new initiative by providing the following details."
              : "Update the existing initiative by editing the details here."
          }
        >
          <ModalFormComponent
            data={initiativeData}
            inputFields={inputFields}
            setData={setInitiativeData}
          />
        </EditModal>
      )}
    </>
  );
}

export default EditinitiativeModal;
