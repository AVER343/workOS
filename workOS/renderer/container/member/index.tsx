import React, { useEffect, useState } from 'react'
import { MemberListComponent } from '../../component/member/table/member-table'
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { I_MembersModel, I_ProjectModel } from '../../utils/db/interfaces';
import { deleteMember, editMember, getAllMembers } from '../../redux/members';
import EditMemberModal from '../../component/member/edit-member-modal.component';
import { Button, Spacer } from '@nextui-org/react';
import { randomUUID } from 'crypto';

function MemberContainer() {
    const router = useRouter();
    const members: I_MembersModel[] = useSelector((state: any) => state.members.members);
    const dispatch = useDispatch();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const handleEdit = (obj: I_MembersModel) => {
        dispatch(editMember({ member: obj }));
    };
    const handleDelete = (user: I_MembersModel) => {
        dispatch(deleteMember({ member: user }));
    }

    useEffect(() => {
        dispatch(getAllMembers());
    }, [router.asPath]);
    return (
        <div>
            <Button onClick={async () => {
                await setIndex(-1);
                setIsEditModalOpen(true);
            }}><span className="material-icons">add</span>Create Member</Button>
            <Spacer />
            {isEditModalOpen && <EditMemberModal
                isModalOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onEdit={handleEdit}
                isNew={index >= 0 ? false : true}
                member={index >= 0 ? members[index] : {
                    "_id": randomUUID(),
                    "name": "",
                    "role": "",
                    "status": "active",
                    "age": "1",
                    "avatar": "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
                    "email": "",
                    created_at: new Date(),
                    ctc: "0",
                    title: ""
                }} />}
            <MemberListComponent deleteMember={handleDelete} setSelectIndex={setIndex} setEditModalOpen={setIsEditModalOpen} users={members} editUser={handleEdit} />
        </div>
    )
}

export default MemberContainer
