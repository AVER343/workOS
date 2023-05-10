import React from 'react'
import ProjectComponent from './project.component';
import { Container, Grid } from '@nextui-org/react';
import { useSelector, useDispatch } from 'react-redux';
import { createProject } from '../../redux/projects';
import { I_ProjectModel } from '../../utils/db/interfaces';
function ProjectListComponent(props: { projects: I_ProjectModel[] }) {
    return (
        <Container style={{ marginTop:'25px',marginLeft: '1vw', marginRight: '1vw' }}>
            <Grid.Container gap={2} justify="space-between">
                {props.projects.map((project) =>
                    <Grid style={{ 'minWidth': '250px', marginTop: '15px' }} xs={3} key={project.id}>
                        <ProjectComponent project={project} />
                    </Grid>)}
            </Grid.Container>
        </Container>
    )
}

export default ProjectListComponent
