import { CustomColumn } from "../../utils/db/interfaces";
import { addMember } from "./utils/addMember";
import { addTeam } from "./utils/addTeam";
import { addToRight } from "./utils/addWeek";
import { buildTree, getExpandedRows } from "./spreadsheet";

export function getContextMenu(rowsToRender, props, columns: CustomColumn[], rows, setColumns: React.Dispatch<React.SetStateAction<CustomColumn[]>>, setRows, setRowsToRender) {
    let onClickMenu = [];

    if (rowsToRender[0].rowId == props[4][0][0].rowId) {
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
                setRowsToRender([...getExpandedRows(newRows)]);

            },
            id: "addToWeek",
            label: "Add Column To Right",
        });
    } else {
        onClickMenu.push({
            handler: () => {
                addMember(columns, props, rows, setColumns, setRows, buildTree);
            },
            id: "addMember",
            label: "Add Member",
        });
        if (!rows.filter(row => row.rowId == props[4][0][0].rowId)[0]['parentId']) {
            onClickMenu.push({
                handler: () => addTeam(columns, props, rows, setColumns, setRows, buildTree),
                id: "addToLeft",
                label: "Add Team",
            });
        }
    }
    if ("topHeader" == props[4][0][0].rowId && "begin-column-id" == props[4][0][0].columnId) {
        {

            onClickMenu.push({
                handler: () => addTeam(columns, props, rows, setColumns, setRows, buildTree),
                id: "addToLeft",
                label: "Add Team",
            });
        }
    }
    return [...onClickMenu];
}

