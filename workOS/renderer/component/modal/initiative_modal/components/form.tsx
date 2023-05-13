import React, { useState } from "react";
import { Input, useInput, Grid, Spacer, Textarea } from "@nextui-org/react";
import { I_InitiativesModel } from "../../../../utils/db/interfaces";
export type color =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error";

export function ModalFormComponent(props: {
  initiative: I_InitiativesModel;
  title: string;
  description: string;
  setTitle: any;
  setDescription: any;
}) {
  return (
    <Grid.Container gap={4} justify="space-around">
      <Grid>
        <Input
          clearable
          width="300px"
          bordered
          labelPlaceholder="Title"
          value={props.title}
          onChange={(event) => props.setTitle(event.target.value)}
        />
        <Spacer y={2.5} />
        <Input
          clearable
          width="300px"
          bordered
          labelPlaceholder="Description"
          value={props.description}
          onChange={(event) => props.setDescription(event.target.value)}
        />

        <Spacer />
      </Grid>
    </Grid.Container>
  );
}
