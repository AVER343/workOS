import React, { useEffect } from 'react'
import ProjectListComponent from '../../component/projects/project-list.component'
import { useDispatch, useSelector } from 'react-redux';
import { createProject, deleteProject, getAllProjects } from '../../redux/projects';
import { AppState } from '../../redux/store';
import { I_ProjectModel } from '../../utils/db/interfaces';
import { Button } from '@nextui-org/react';
import { v4 as uuidv4 } from 'uuid'
function ProjectContainer() {
    const projects = useSelector((state: AppState) => state.projects.projects);
    const dispatch = useDispatch();
    const handleCreate = (project: I_ProjectModel) => {
        dispatch(createProject(project));
    };
    const handleDelete = (id: string) => {
        dispatch(deleteProject(id));
    };
    useEffect(() => {
        dispatch(getAllProjects());
    }, [])
    return (
        <><Button onPress={() => {
            handleCreate({
                project_title: "Project Title",
                id: uuidv4(),
                initiative_id: '123',
                project_description: '',
                project_objective: { client: '', internal: '' },
                project_solution_ids: []
            });
        }}>CREATE NEW</Button>

            <ProjectListComponent projects={projects} />
            <Button onClick={() => handleDelete(projects[0].id)}>DELETE</Button></>
    )
}

export default ProjectContainer