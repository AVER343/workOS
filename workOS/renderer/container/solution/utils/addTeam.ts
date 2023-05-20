import { randomUUID } from "crypto";
import { CustomColumn } from "../../../utils/db/interfaces";
import { Row } from "@silevis/reactgrid";

export function addTeam(
  columns: CustomColumn[],
  props,
  rows: Row[],
  _setColumns: React.Dispatch<React.SetStateAction<CustomColumn[]>>,
  setRows,
  buildTree
) {
  let uuid = randomUUID();
  let newRows: any[] = [...rows];
  let temp_cells = rows[0].cells.filter((cell, index) => index != 0);
  newRows.push({
    cells: [
      {
        type: "chevron",
        text: "Team",
        className: "year header",
        hasChildren: true,
        isExpanded: false,
      },
      ...temp_cells.map((row) => ({
        type: "nonEditableNumber",
        value: "",
        className: "",
      })),
    ],
    rowId: uuid,
  });
  setRows(buildTree(newRows));
  return {
    newRows: newRows,
    newColumns: columns,
  };
}
