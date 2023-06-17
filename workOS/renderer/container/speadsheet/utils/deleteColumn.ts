import { randomUUID } from "crypto";
import { CustomColumn } from "../../../utils/db/interfaces";

export function deleteColumn(
  columns: CustomColumn[],
  props,
  rows,
  setColumns: React.Dispatch<React.SetStateAction<CustomColumn[]>>,
  setRows,
  buildTree
) {
  let uuid = randomUUID();
  let newRows: any[] = JSON.parse(JSON.stringify(rows)).map((row, index) => {
    let _index = columns.findIndex(
      (column) => column.columnId == props[4][0][0].columnId
    );

    if (row.cells.length > 2) row.cells.splice(_index, 1);
    
    return {
      ...row,
      cells: [...row.cells],
    };
  });
  if (columns.length > 2) {
    let index = columns.findIndex(
      (column) => column.columnId == props[4][0][0].columnId
    );
    columns = [...columns.slice(0, index), ...columns.slice(index + 1)];
  }
  setColumns(JSON.parse(JSON.stringify(columns)));
  setRows(buildTree(newRows));
  return {
    newRows: JSON.parse(JSON.stringify(newRows)),
    newColumns: JSON.parse(JSON.stringify(columns)),
  };
}
