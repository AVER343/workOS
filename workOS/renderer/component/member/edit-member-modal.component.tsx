import React, { useEffect, useRef, useState } from "react";
import { I_MembersModel } from "../../utils/db/interfaces";
import EditModal from "../modal/common_modals/edit.modal";
import { ModalFormComponent } from "../modal/common_modals/forms/form";

function EditMemberModal({
  member,
  isNew,
  onClose,
  isModalOpen,
  onEdit,
}: {
  isNew;
  onClose;
  isModalOpen;
  onEdit;
  member: I_MembersModel;
}) {
  let inputFields = [
    { field: "name", display_name: "Name", labelPlaceholder: "Name" },
    { field: "email", display_name: "Email", labelPlaceholder: "Email" },
    {
      field: "role",
      display_name: "Role",
      labelPlaceholder: "Role",
    },
    { field: "age", display_name: "Age", labelPlaceholder: "Age" },
    { field: "ctc", display_name: "CTC", labelPlaceholder: "Cost To Company" },
    { field: "client_ctc", display_name: "Client_CTC", labelPlaceholder: "Cost To Client" },
  ];

  let [memberData, setmemberData] = useState({ ...member });
  const memberDataRef = useRef(memberData);
  useEffect(() => {
    memberDataRef.current = memberData;
  }, [memberData]);
  const _onEdit = () => {
    let new_project_data = { ...member, ...memberDataRef.current };
    onEdit(new_project_data);
    onClose();
  };
  return (
    <EditModal
      heading={isNew ? `Create new Member` : `Update an existing Member`}
      isModalOpen={isModalOpen}
      onClose={async () => onClose()}
      isNew={isNew}
      onSave={_onEdit}
      subheading={
        isNew
          ? "Create a new member by providing the following details."
          : "Update the existing member by editing the details here."
      }
    >
      <ModalFormComponent
        data={memberData}
        inputFields={inputFields}
        setData={setmemberData}
      />
    </EditModal>
  );
}

export default EditMemberModal;
