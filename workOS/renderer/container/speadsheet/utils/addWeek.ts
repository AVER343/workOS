import { randomUUID } from "crypto";
import { CustomColumn } from "../../../utils/db/interfaces";
import {
  CostToCompanyPerHour_ID,
  TotalCostToCompany_ID,
  TotalHours_ID,
} from "../constants";

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
    columns.findIndex((column) => column.columnId == props[4][0][0].columnId) +
      1,
    0,
    { columnId: uuid, id: uuid, width: 50, resizable: true, reorderable: true }
  );
  let newRows: any[] = JSON.parse(JSON.stringify(rows)).map((row, index) => {
    let text = "";
    if (index == 0) {
      text = "Week";
    }
    let _index = columns.findIndex(
      (column) => column.columnId == props[4][0][0].columnId
    );
    let cell =
      row.cells[0].className == 'team'
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
          };
    if (index == 0) {
      cell = {
        type: "text",
        text: text,
        hasChildren: false,
        isExpanded: false,
        columnId: uuid,
        value: null,
      };
    }

    row.cells.splice(_index + 1, 0, cell);

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
