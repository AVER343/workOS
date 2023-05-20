import { randomUUID } from "crypto";
import { CustomColumn } from "../../../utils/db/interfaces";

export function addToRight(
  columns: CustomColumn[],
  props,
  rows,
  setColumns: React.Dispatch<React.SetStateAction<CustomColumn[]>>,
  setRows,
  buildTree
) {
  let uuid = randomUUID();
  columns.splice(
    columns.findIndex((column) => column.columnId == props[4][0][0].columnId)+1,
    0,
    { columnId: uuid, id: uuid, width: 150 }
  );
  let newRows: any[] = rows.map((row, index) => {
    let text = "";
    if (index == 0) {
      text = "Week";
    }
    let _index = columns.findIndex((column) => column.columnId == props[4][0][0].columnId);
    row.cells.splice(
      _index+1,
      0,
      row.cells[index].type == "nonEditableNumber" ? {
        type: "nonEditableNumber",
        value: "",
        className: "disabled",
      }:{
        type: "text",
        text: text,
        hasChildren: false,
        isExpanded: false,
        columnId: uuid,
        value: null,
      }
    );
    for (let i = 0; i < row.cells.length; i++){
      row.cells.forEach((cell) => {
        console.log({ cell });
      })
    }
   
    return {
      ...row,
      cells: [...row.cells],
    };
  });
  setColumns(JSON.parse(JSON.stringify(columns)));
  setRows(buildTree(newRows));
  return {
    newRows: JSON.parse(JSON.stringify(newRows)),
    newColumns: JSON.parse(JSON.stringify(columns)),
  };
}
