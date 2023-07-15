import { Button, Grid, Modal, Spacer, Text } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import { I_ProjectModel } from "../../../utils/db/interfaces";
import { ModalFormComponent } from "../common_modals/forms/form";
import EditModal from "../common_modals/edit.modal";
function EditProjectModal({
  onClose,
  isModalOpen,
  project,
  isNew,
  onSave,
}: {
  onClose?: () => {};
  isModalOpen: boolean;
  project: I_ProjectModel;
  isNew: boolean;
  onSave: any;
}) {
  let inputFields: {
    field: keyof I_ProjectModel;
    labelPlaceholder: string;
    display_name: string;
  }[] = [
    {
      field: "project_title",
      display_name: "Title",
      labelPlaceholder: "Title",
    },
    {
      field: "project_description",
      display_name: "Description",
      labelPlaceholder: "Description",
    },
    {
      field: "project_overview",
      display_name: "Overview",
      labelPlaceholder: "Overview",
    },
    {
      field: "project_url",
      display_name: "Project URL",
      labelPlaceholder: "Project URL",
    },
  ];
  let [projectData, setprojectData] = useState({ ...project });
  const projectDataRef = useRef(projectData);
  useEffect(() => {
    projectDataRef.current = projectData;
  }, [projectData]);
  const _onSave = () => {
    onSave({ ...project, ...projectDataRef.current });
    onClose();
  };
  return (
    isModalOpen && (
      <EditModal
        onSave={_onSave}
        heading={isNew ? `Create new project` : `Update an existing Project`}
        isModalOpen={isModalOpen}
        onClose={async () => onClose()}
        isNew={isNew}
        subheading={
          isNew
            ? "Create a new project by providing the following details."
            : "Update the existing project by editing the details here."
        }
      >
        <ModalFormComponent
          data={projectData}
          inputFields={inputFields}
          setData={setprojectData}
        />
      </EditModal>
    )
  );
}

export default EditProjectModal;
