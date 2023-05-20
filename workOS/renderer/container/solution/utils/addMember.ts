import { randomUUID } from "crypto";
import { CustomColumn } from "../../../utils/db/interfaces";
import { Row } from "@silevis/reactgrid";

export function addMember(
  columns: CustomColumn[],
  props,
  rows: Row[],
  _setColumns: React.Dispatch<React.SetStateAction<CustomColumn[]>>,
  setRows,
  buildTree
) {
  try {
    let uuid = randomUUID();
    let newRows: any[] = [...rows];
    let rowIdx = rows.findIndex(
      (row: Row) => row.rowId == props[4][0][0].rowId
    );
    let temp_cells = rows[0].cells.filter((cell, index) => index != 0);
    let teamId;
    if (!teamId) {
      for (let i = rowIdx; i >= 1; i--) {
        console.log(rows[i]);
        if (rows[i].cells[0].type == "chevron") {
          teamId = rows[i].rowId;
          break;
        }
      }
    }
    newRows.splice(rowIdx+1, 0, {
      cells: [
        {
          type: "chevron",
          text: "Member",
          className: "",
          isExpanded: false,
          hasChildren: false,
          parentId: teamId,
        },
        ...temp_cells.map((row) => ({
          type: "text",
          text: "",
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
  } catch (e) {
    console.log(e);
  }
}
