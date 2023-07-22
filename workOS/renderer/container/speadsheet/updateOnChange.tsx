import React from "react";
import { CellChange, Id } from "@silevis/reactgrid";
import {
  CONST_COLUMN_IDS,
  CostToClient_ID,
  CostToCompanyPerHour_ID,
  Profit_ID,
  TotalCostToCompany_ID,
  TotalHours_ID,
} from "./constants";
import { buildTree, getExpandedRows } from ".";

export function getFunctions(
  rows,
  columns: any[],
  setRows,
  setRowsToRender,
  setColumns: React.Dispatch<React.SetStateAction<any[]>>
) {
  const handleChanges = async (changes: CellChange[]) => {
    const newRows = JSON.parse(JSON.stringify(rows));
    let headerRowId = rows[0].rowId;
    if (
      headerRowId == changes[0].rowId &&
      changes[0].newCell["isExpanded"] != changes[0].previousCell["isExpanded"]
    ) {
      changes.forEach((change) => {
        const changeColumnIdx = columns.findIndex(
          (el) => el.columnId === change.columnId
        );
        newRows[0].cells[changeColumnIdx] = change.newCell;
      });
    } else
      changes.forEach((change) => {
        const changeRowIdx = rows.findIndex((el) => el.rowId === change.rowId);
        const changeColumnIdx = columns.findIndex(
          (el) => el.columnId === change.columnId
        );
        newRows[changeRowIdx].cells[changeColumnIdx] = change.newCell;
        if (newRows[0].cells[changeColumnIdx].columnId == CostToClient_ID) {
        }
        updateOnChange(newRows, changeRowIdx);
      });
    await setRows(buildTree(JSON.parse(JSON.stringify(newRows))));
    await setRowsToRender([...getExpandedRows(newRows)]);
  };

  const handleColumnResize = (ci: string, width: number) => {
    setColumns((prevColumns) => {
      const columnIndex = prevColumns.findIndex((el) => el.columnId === ci);
      const resizedColumn = prevColumns[columnIndex];
      const updatedColumn = { ...resizedColumn, width };
      prevColumns[columnIndex] = updatedColumn;
      return [...prevColumns];
    });
  };
  const reorderArray = <T extends {}>(arr: T[], idxs: number[], to: number) => {
    const movedElements = arr.filter((_, idx) => idxs.includes(idx));
    const targetIdx =
      Math.min(...idxs) < to
        ? (to += 1)
        : (to -= idxs.filter((idx) => idx < to).length);
    const leftSide = arr.filter(
      (_, idx) => idx < targetIdx && !idxs.includes(idx)
    );
    const rightSide = arr.filter(
      (_, idx) => idx >= targetIdx && !idxs.includes(idx)
    );
    return [...leftSide, ...movedElements, ...rightSide];
  };
  const handleColumnsReorder = (targetColumnId: Id, columnIds: Id[]) => {
    const to = columns.findIndex(
      (column) => column.columnId === targetColumnId
    );
    const columnIdxs = columnIds.map((columnId) =>
      columns.findIndex((c) => c.columnId === columnId)
    );
    setColumns((prevColumns) => reorderArray(prevColumns, columnIdxs, to));
  };
  return { handleChanges, handleColumnsReorder, handleColumnResize };
}
export function updateOnChange(newRows: any, changeRowIdx: number) {
  let rowIndex = newRows[0].cells
    .map((e, index) => (CONST_COLUMN_IDS.includes(e.columnId) ? -1 : index))
    .filter((e) => e != -1);
  let totalHours = rowIndex.reduce((a, b) => {
    let num = isNaN(parseFloat(newRows[changeRowIdx].cells[b].value))
      ? 0
      : parseFloat(newRows[changeRowIdx].cells[b].text);
    return a + num;
  }, 0);
  let columnTotalHours = newRows[0].cells.findIndex(
    (cell) => cell.columnId == TotalHours_ID
  );
  newRows[changeRowIdx].cells[columnTotalHours].value = totalHours;
  let perHourCostIndex = newRows[0].cells.findIndex(
    (cell) => cell.columnId == CostToCompanyPerHour_ID
  );
  let perHourCost = newRows[changeRowIdx].cells[perHourCostIndex];
  perHourCost = isNaN(parseFloat(perHourCost.text))
    ? 0
    : parseFloat(perHourCost.text);
  let columnTotalCost = newRows[0].cells.findIndex(
    (cell) => cell.columnId == TotalCostToCompany_ID
  );
  let columnCostToClient = newRows[0].cells.findIndex(
    (cell) => cell.columnId == CostToClient_ID
  );
  let columnProfit = newRows[0].cells.findIndex(
    (cell) => cell.columnId == Profit_ID
  );
  let nearestTeamIndex = -1;
  let teamObject = {
    totalTeamProfit: 0,
    totalTeamCost: 0,
    totalTeamHours: 0,
    totalCostToClient: 0,
  };
  newRows[changeRowIdx].cells[columnTotalCost].value = totalHours * perHourCost;
  for (let i = changeRowIdx; i >= 0; i--) {
    if (
      newRows[i].cells[0].type == "chevron" &&
      !newRows[i].cells[0].parentId
    ) {
      nearestTeamIndex = i;
      break;
    }
  }
  let i = nearestTeamIndex + 1;
  while (i < newRows.length && newRows[i].cells[0].parentId) {
    teamObject.totalTeamCost =
      teamObject.totalTeamCost +
      parseFloat(newRows[i].cells[columnTotalCost].value);
    teamObject.totalTeamHours =
      teamObject.totalTeamHours +
      parseFloat(newRows[i].cells[columnTotalHours].value);

    let tCTC = !isNaN(
      parseFloat(newRows[i].cells[columnCostToClient].text) *
        parseFloat(newRows[i].cells[columnTotalHours].value)
    )
      ? parseFloat(newRows[i].cells[columnCostToClient].text) *
        parseFloat(newRows[i].cells[columnTotalHours].value)
      : 0;
    teamObject.totalCostToClient = teamObject.totalCostToClient + tCTC;
    i++;
    if (!newRows[i]) break;
  }
  if (changeRowIdx == 0) return;
  newRows[nearestTeamIndex].cells[columnProfit].value =
    totalHours *
    (newRows[changeRowIdx].cells[columnCostToClient].value -
      newRows[changeRowIdx].cells[columnTotalCost].value);
  newRows[nearestTeamIndex].cells[columnTotalCost].value =
    teamObject.totalTeamCost;
  newRows[nearestTeamIndex].cells[columnTotalHours].value =
    teamObject.totalTeamHours;
  newRows[nearestTeamIndex].cells[columnCostToClient].value =
    teamObject.totalCostToClient;
  newRows[nearestTeamIndex].cells[columnProfit].value =
    -newRows[nearestTeamIndex].cells[columnTotalCost].value +
    teamObject.totalCostToClient;
  newRows[nearestTeamIndex].cells[perHourCostIndex].value =
    newRows[nearestTeamIndex].cells[columnTotalCost].value /
    newRows[nearestTeamIndex].cells[columnTotalHours].value;
}
