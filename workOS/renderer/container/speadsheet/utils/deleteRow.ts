import { randomUUID } from "crypto";
import { CustomColumn } from "../../../utils/db/interfaces";
import { Row } from "@silevis/reactgrid";

export function deleteRow(
  columns: CustomColumn[],
  props,
  rows,
  setColumns: React.Dispatch<React.SetStateAction<CustomColumn[]>>,
  setRows,
  buildTree
) {
  let newRows: any[] = JSON.parse(JSON.stringify(rows)).filter((row, index) => {
    return row.rowId != props[4][0][0].rowId;
  });
  setRows(buildTree(newRows));
  return {
    newRows: JSON.parse(JSON.stringify(newRows)),
  };
}
