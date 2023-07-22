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
  let columnIdx = columns.findIndex(
    (column) => column.columnId == props[4][0][0].columnId
  );
  columns.splice(columnIdx + 1, 0, {
    columnId: uuid,
    id: uuid,
    width: 75,
    resizable: true,
  });
  let newRows: any[] = JSON.parse(JSON.stringify(rows)).map((row, index) => {
    let text = "";
    let className = "";
    if (index == 0) {
      //9 constant columns
      text = "Week-" + (columnIdx - 8);
      className = "week";
    }
    let _index = columns.findIndex(
      (column) => column.columnId == props[4][0][0].columnId
    );
    let cell: any =
      row.cells[0].className == "team"
        ? {
            type: "nonEditableNumber",
            value: "",
            className: "disabled",
          }
        : {
            type: "text",
            text: text,
            hasChildren: false,
            isExpanded: false,
            columnId: uuid,
            value: null,
            className: className,
          };
    if (index == 0) {
      cell = {
        type: "text",
        text: text,
        hasChildren: false,
        isExpanded: false,
        columnId: uuid,
        value: null,
        className: className,
      };
    }
    row.cells.splice(_index + 1, 0, cell);
    if (cell.className == "week") {
      columns = columns.map((value, idx) => {
        if (idx > columnIdx + 1) {
          row.cells[idx].text =
            "Week-" + (parseInt(row.cells[idx]?.text.split("-")[1]) + 1);
        }
        return value;
      });
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
