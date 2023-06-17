import React from "react";
import { Pagination, Grid, Radio } from "@nextui-org/react"

export default function PaginationComponent(props: {
  total: number;
  onChange: any;
}) {
  const [selectedColor, setSelectedColor] = React.useState("primary");
  const perPageResults = 10;
  return (
    <Grid.Container gap={2}>
      <Grid xs={12}>
        <Pagination
          color={"gradient"}
          total={Math.ceil(props.total / perPageResults)}
          onChange={(pageNumber) => {
            props.onChange(pageNumber);
          }}
        />
      </Grid>
    </Grid.Container>
  );
}
