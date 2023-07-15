import { randomUUID } from "crypto";
import { CustomColumn, I_MembersModel } from "../../../utils/db/interfaces";
import { Row } from "@silevis/reactgrid";
import {
  CostToClient_ID,
  CostToCompanyPerHour_ID,
  EmailColumn_ID,
  NameColumn_ID,
  Profit_ID,
  RoleColumn_ID,
  TitleColumn_ID,
  TotalCostToCompany_ID,
  TotalHours_ID,
} from "../constants";

export async function addMember(
  columns: CustomColumn[],
  props,
  rows: Row[],
  _setColumns: React.Dispatch<React.SetStateAction<CustomColumn[]>>,
  setRows,
  buildTree,
  member: I_MembersModel,
  updateOnChange
) {
  try {
    let uuid = randomUUID();
    let newRows: any[] = [...rows];
    let rowIdx = rows.findIndex(
      (row: Row) => row.rowId == props[4][0][0].rowId
    );
    let temp_cells = rows[0].cells.filter((cell, index) => index != 0);
    let teamId;
    for (let i = rowIdx; i >= 1; i--) {
      if (rows[i].cells[0].type == "chevron") {
        teamId = rows[i].rowId;
        break;
      }
    }
    newRows.splice(rowIdx + 1, 0, {
      cells: [
        {
          type: "chevron",
          text: member.name,
          className: "",
          isExpanded: false,
          hasChildren: false,
          parentId: teamId,
        },
        ...temp_cells.map((row) => {
          if (
            [TotalCostToCompany_ID, TotalHours_ID, Profit_ID].includes(
              row["columnId"]
            )
          )
            return {
              type: "nonEditableNumber",
              value: 0,
              text: "0",
              className: "disabled",
            };
          if ([CostToCompanyPerHour_ID].includes(row["columnId"])) {
            return {
              type: "text",
              text: member.ctc?.toString() ?? "0",
              className: "",
            };
          }
          if (NameColumn_ID == row["columnId"]) {
            return {
              type: "text",
              text: member.name?.toString() ?? "",
              className: "",
            };
          }
          if (EmailColumn_ID == row["columnId"]) {
            return {
              type: "text",
              text: member.email?.toString() ?? "",
              className: "",
            };
          }
          if (CostToClient_ID == row["columnId"]) {
            return {
              type: "text",
              text: member.client_ctc?.toString() ?? "",
              className: "",
            };
          }
          if (RoleColumn_ID == row["columnId"]) {
            return {
              type: "text",
              text: member.role?.toString() ?? "",
              className: "",
            };
          }
          return {
            type: "text",
            text: "",
            className: "",
          };
        }),
      ],
      rowId: uuid,
    });

    await setRows(buildTree(JSON.parse(JSON.stringify(newRows))));
    updateOnChange(JSON.parse(JSON.stringify(newRows)), 2);
    return {
      newRows: newRows,
      newColumns: columns,
    };
  } catch (e) {
    console.log(e);
  }
}
