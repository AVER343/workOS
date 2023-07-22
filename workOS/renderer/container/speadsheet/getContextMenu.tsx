import {
  CustomColumn,
  I_MembersModel,
  PhasesData,
} from "../../utils/db/interfaces";
import { addMember } from "./utils/addMember";
import { addTeam } from "./utils/addTeam";
import { addToRight } from "./utils/addWeek";
import { buildTree, getExpandedRows } from ".";
import { deleteColumn } from "./utils/deleteColumn";
import { CellLocation, Id, MenuOption, Row } from "@silevis/reactgrid";
import {
  CONST_COLUMN_IDS,
  CostToClient_ID,
  CostToCompanyPerHour_ID,
  EmailColumn_ID,
  NameColumn_ID,
  RoleColumn_ID,
  TeamsColumn_ID,
  TitleColumn_ID,
  TotalCostToCompany_ID,
  TotalHours_ID,
} from "./constants";
import { deleteRow } from "./utils/deleteRow";
import { randomUUID } from "crypto";

export function getContextMenu(
  rowsToRender,
  props,
  columns: CustomColumn[],
  rows,
  phases: any[],
  setColumns: React.Dispatch<React.SetStateAction<CustomColumn[]>>,
  setRows,
  setRowsToRender,
  setCreateMemberData,
  setPhases: (data: PhasesData[]) => void,
  phraseData,
  setPhraseData
) {
  let onClickMenu = [];
  if (!props[4][0]) return [];
  if (rowsToRender?.[0]?.rowId == props[4]?.[0]?.[0]?.rowId) {
    onClickMenu.push({
      handler: async () => {
        let { newRows } = await addToRight(
          columns,
          props,
          rows,
          setColumns,
          setRows,
          buildTree
        );
        let weekIdx = columns.findIndex(
          (column) => column.columnId == props[4]?.[0]?.[0]?.columnId
        );
        // get week not added and replace the rest with new text
        setPhraseData([
          ...phraseData,
          {
            created_on: new Date(),
            id: randomUUID(),
            name: "Default",
            week: newRows[0].cells[weekIdx + 1].text,
          },
        ]);
        const new_phases = [
          ...phases,
          {
            name: "Default",
            disabled: false,
          },
        ].filter(
          (obj, index, self) =>
            index === self.findIndex((o: PhasesData) => o.name === obj.name)
        );
        setPhases(new_phases);
        await setRowsToRender([...getExpandedRows(newRows)]);
      },
      id: "addToWeek",
      label: "Add Week",
    });
    if (
      rows[0].cells.length > 2 &&
      !CONST_COLUMN_IDS.includes(props[4][0][0].columnId)
    )
      onClickMenu.push({
        handler: async () => {
          let { newRows } = await deleteColumn(
            columns,
            props,
            rows,
            setColumns,
            setRows,
            buildTree
          );
          setRowsToRender([...getExpandedRows(newRows)]);
        },
        id: "delteColumn",
        label: "Delete Column",
      });
  } else {
    onClickMenu.push({
      handler: () => {
        setCreateMemberData(props);
      },
      id: "addMember",
      label: "Add Member",
    });
    if (
      !rows.filter((row) => row.rowId == props[4][0][0].rowId)[0]["parentId"]
    ) {
      onClickMenu.push({
        handler: () =>
          addTeam(columns, props, rows, setColumns, setRows, buildTree),
        id: "addToLeft",
        label: "Add Team",
      });
      onClickMenu.push({
        id: "deleteRow",
        label: "Delete Row",
        handler: () =>
          deleteRow(columns, props, rows, setColumns, setRows, buildTree),
      });
    }
  }
  if (
    "topHeader" == props[4]?.[0]?.[0]?.rowId &&
    "64e82fff-bd45-4560-b9f1-a7ed25d62da6" == props[4]?.[0]?.[0]?.columnId
  ) {
    {
      onClickMenu.push({
        handler: () =>
          addTeam(columns, props, rows, setColumns, setRows, buildTree),
        id: "addToLeft",
        label: "Add Team",
      });
    }
  }
  return [...onClickMenu];
}
