import React, { useState } from "react";
import { ModalFormComponent } from "../../modal/common_modals/forms/form";
import EditModal from "../../modal/common_modals/edit.modal";
import { I_SolutionsModel } from "../../../utils/db/interfaces";

function EditSolutionModal({
  isNew,
  onClose,
  onEdit,
  solutionData,
}: {
  isNew: boolean;
  onClose: any;
  onEdit: any;
  solutionData: I_SolutionsModel;
}) {
  let inputFields: {
    field: keyof I_SolutionsModel;
    labelPlaceholder: string;
    display_name: string;
  }[] = [
    {
      field: "title",
      display_name: "Title",
      labelPlaceholder: "Title",
    },
    {
      field: "overvew",
      display_name: "Description",
      labelPlaceholder: "Description",
    },
  ];
  const [data, setData] = useState(JSON.parse(JSON.stringify(solutionData)));
  return (
    <>
      <EditModal
        heading={isNew ? `Create new solution` : `Update an existing Solution`}
        isModalOpen={true}
        onClose={async () => onClose()}
        isNew={isNew}
        onSave={() => {
          onEdit(data);
          onClose();
        }}
        subheading={
          isNew
            ? "Create a new initiative by providing the following details."
            : "Update the existing initiative by editing the details here."
        }
      >
        <ModalFormComponent
          data={data}
          inputFields={inputFields}
          setData={setData}
        />
      </EditModal>
    </>
  );
}

export default EditSolutionModal;
