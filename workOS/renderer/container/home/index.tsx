import React, { useEffect } from 'react'
// import ProjectListComponent from '../../component/initiatives/project-list.component'
import { useDispatch, useSelector } from 'react-redux';
import { createInitiative, deleteInitiative, getAllInitiatives } from '../../redux/intiatives';
import { AppState } from '../../redux/store';
import { I_InitiativesModel } from '../../utils/db/interfaces';
import { Button } from '@nextui-org/react';
import { v4 as uuidv4 } from 'uuid'
import ProjectListComponent from '../../component/projects/project-list.component';
import { Database } from '../../utils/db';
import HomeListComponent from '../../component/home/home-list.component';
function HomeContainer() {
    const initiatives = useSelector((state: AppState) => state.initiatives.initiatives);
    const dispatch = useDispatch();
    const handleCreate = (project: I_InitiativesModel) => {
        dispatch(createInitiative(project));
    };
    const handleDelete = (id: string) => {
        dispatch(deleteInitiative(id));
    };
    useEffect(() => {
        dispatch(getAllInitiatives());
    }, [])
    return (
        <><Button onPress={() => {
            handleCreate({
                created_at: new Date(),
                modified_at: new Date(),
                title: "title",
                description: "description",
                project_ids: [uuidv4()],
                id: uuidv4()
            });
        }}>CREATE NEW</Button>

            <HomeListComponent initiatives={initiatives} />
            <Button onClick={() => handleDelete(initiatives[0].id)}>DELETE</Button></>
    )
}

export default HomeContainer