import React, { useState } from "react";
import { Input, useInput, Grid, Spacer, Textarea } from "@nextui-org/react";
import {
  I_InitiativesModel,
  I_ProjectModel,
} from "../../../../utils/db/interfaces";
export type color =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error";

export function ModalFormComponent<T>(props: {
  data: T;
  setData: (data: T) => void;
  inputFields: {
    field: string;
    display_name: string;
    labelPlaceholder: string;
  }[];
}) {
  return (
    <Grid.Container gap={4} justify="space-around">
      <Grid>
        {props.inputFields.map((inputField) => {
          return (
            <React.Fragment key={inputField.display_name}>
              <Input
                clearable
                width="300px"
                bordered
                labelPlaceholder={inputField.labelPlaceholder}
                value={props.data[inputField.field]}
                onChange={(event) =>
                  props.setData({
                    ...props.data,
                    [inputField.field]: event.target.value,
                  })
                }
              />
              <Spacer y={2.5} />
            </React.Fragment>
          );
        })}

        <Spacer />
      </Grid>
    </Grid.Container>
  );
}
