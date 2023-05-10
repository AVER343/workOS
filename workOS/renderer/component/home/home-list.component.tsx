import { Avatar, Badge, Button, Card, Grid } from '@nextui-org/react'
import React from 'react'
import { I_InitiativesModel } from '../../utils/db/interfaces'
import ItemComponent from './item.component'
function HomeListComponent(props: { initiatives: I_InitiativesModel[] }) {
    return (
        <Grid.Container gap={2} justify="center">
            {props.initiatives.map(initiative => <Badge content={"X"} color="error" placement="top-right" size="lg">
                <ItemComponent />
            </Badge>)}
            <Grid>
            </Grid>
        </Grid.Container>
    )
}

export default HomeListComponent