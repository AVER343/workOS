import { Modal, Table, Text, Input } from "@nextui-org/react";
import SelectMemberTableComponent from "./modal/select-member-table.component";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllMembers } from "../../redux/members";
import { I_MembersModel } from "../../utils/db/interfaces";

export default function SelectMemberModal({ closeHandler, addMemberFunc }) {
    const dispatch = useDispatch();
    const members: I_MembersModel[] = useSelector((state: any) => state.members.members);

    useEffect(() => {
        dispatch(getAllMembers());
    }, [])
    return (
        <Modal
            noPadding
            scroll
            width="600px"
            closeButton
            aria-labelledby="modal-title"
            open={true}
            onClose={closeHandler}
        >
            <Modal.Header>
                <Text id="modal-title" size={18}>
                    Select 
                    <Text b size={18}>
                       {` Member `}
                    </Text>
                    to add
                </Text>
            </Modal.Header>
            <Modal.Body>
                <SelectMemberTableComponent addMemberFunc={addMemberFunc} members={members.filter(member => member.status == 'active')} />
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    );
}
