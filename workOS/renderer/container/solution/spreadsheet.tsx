import React, { useEffect, useState } from "react";
import {
  ReactGrid,
  Column,
  ChevronCell,
  Row,
  CellChange,
  Highlight,
  Cell,
} from "@silevis/reactgrid";
import { UUID, randomUUID } from "crypto";
import { I_SolutionTableModel } from "../../utils/db/interfaces";
import { Database } from "../../utils/db";
import { Button, Text, Popover, Col, Spacer, Row as Row_Component, Container } from "@nextui-org/react";
import { ModalFormComponent } from "../../component/modal/common_modals/forms/form";
import EditModal from "../../component/modal/common_modals/edit.modal";
import { CustomColumn } from "../../utils/db/interfaces/index";
import { NonEditableNumberCellTemplate } from "./nonEditableNumber.cell";
import { addToRight } from "./utils/addWeek";
import { addTeam } from "./utils/addTeam";
import { addMember } from "./utils/addMember";
import { getContextMenu } from "./getContextMenu";
import { useRouter } from "next/router";
const db = new Database();
const DB_INSTANCE = await db.InitiativeModels();

/* 
  searches for a chevron cell in given row
*/
const findChevronCell = (row: Row) =>
  row.cells.find((cell) => cell.type === "chevron") as ChevronCell | undefined;

/* 
  searches for a parent of given row
*/
const findParentRow = (rows: Row[], row: Row) =>
  rows.find((r) => {
    const foundChevronCell = findChevronCell(row);
    return foundChevronCell ? r.rowId === foundChevronCell.parentId : false;
  });

/* 
  check if the row has children
*/
const hasChildren = (rows: Row[], row: Row): boolean =>
  rows.some((r) => {
    const foundChevronCell = findChevronCell(r);
    return foundChevronCell ? foundChevronCell.parentId === row.rowId : false;
  });

/* 
  Checks is row expanded
*/
const isRowFullyExpanded = (rows: Row[], row: Row): boolean => {
  const parentRow = findParentRow(rows, row);
  if (parentRow) {
    const foundChevronCell = findChevronCell(parentRow);
    if (foundChevronCell && !foundChevronCell.isExpanded) return false;
    return isRowFullyExpanded(rows, parentRow);
  }
  return true;
};

export const getExpandedRows = (rows: Row[]): Row[] =>
  rows.filter((row) => {
    const areAllParentsExpanded = isRowFullyExpanded(rows, row);
    return areAllParentsExpanded !== undefined ? areAllParentsExpanded : true;
  });

const getDirectChildRows = (rows: Row[], parentRow: Row): Row[] =>
  rows.filter(
    (row) =>
      !!row.cells.find(
        (cell) =>
          cell.type === "chevron" &&
          (cell as ChevronCell).parentId === parentRow.rowId
      )
  );

export const assignIndentAndHasChildren = (
  rows: Row[],
  parentRow: Row,
  indent: number = 0
) => {
  ++indent;
  getDirectChildRows(rows, parentRow).forEach((row) => {
    const foundChevronCell = findChevronCell(row);
    const hasRowChildrens = hasChildren(rows, row);
    if (foundChevronCell) {
      foundChevronCell.indent = indent;
      foundChevronCell.hasChildren = hasRowChildrens;
    }
    if (hasRowChildrens) assignIndentAndHasChildren(rows, row, indent);
  });
};

export const buildTree = (rows: Row[]): Row[] =>
  rows.map((row) => {
    const foundChevronCell = findChevronCell(row);
    if (foundChevronCell && !foundChevronCell.parentId) {
      const hasRowChildrens = hasChildren(rows, row);
      foundChevronCell.hasChildren = hasRowChildrens;
      if (hasRowChildrens) assignIndentAndHasChildren(rows, row);
    }
    return row;
  });

const ChevronCellExample: React.FunctionComponent = () => {
  let tableData = {
    table_id: DB_INSTANCE.solutionTable.adapter.read()[0].table_id,
    rows: DB_INSTANCE.solutionTable.adapter.read()[0].rows,
    columns: DB_INSTANCE.solutionTable.adapter.read()[0].columns,
  };
  const [columns, setColumns] = useState(tableData.columns);
  const [rows, setRows] = useState(() => buildTree(tableData.rows));
  const [rowsToRender, setRowsToRender] = useState<Row[]>([
    ...getExpandedRows(rows),
  ]);
  let router = useRouter()
  useEffect(() => {
    setRowsToRender([...getExpandedRows(rows)]);
  }, [JSON.stringify(rows)]);

  const handleChanges = async (changes: CellChange[]) => {
    const newRows = [...rows];
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
      });
    await setRows(buildTree(newRows));
    await setRowsToRender([...getExpandedRows(newRows)]);
  };
  const handleColumnResize = (ci: string, width: number) => {
    setColumns((prevColumns) => {
      const columnIndex = prevColumns.findIndex(el => el.columnId === ci);
      const resizedColumn = prevColumns[columnIndex];
      const updatedColumn = { ...resizedColumn, width };
      prevColumns[columnIndex] = updatedColumn;
      return [...prevColumns];
    });
  }

  return (
    <div>
      <Button onPress={() => router.push(`/projects/${router.query.project_id}`)}>Back</Button>
      <div style={{
        overflow: 'scroll'
      }}>
        <ReactGrid
          rows={rowsToRender}
          columns={columns}
          onCellsChanged={handleChanges}
          onColumnResized={handleColumnResize}
          enableGroupIdRender
          customCellTemplates={{
            nonEditableNumber: NonEditableNumberCellTemplate,
          }}
          onContextMenu={(...props) => {
            return getContextMenu(rowsToRender, props, columns, rows, setColumns, setRows, setRowsToRender);
          }}
        />

      </div>
      <Spacer />
      <Row_Component justify="flex-end">
        <Button

          onPress={() => {
            let solutionTables = DB_INSTANCE.solutionTable.adapter.read().filter(table => table.table_id != tableData.table_id);
            solutionTables.push({ 'columns': columns, rows, table_id: tableData.table_id });
            DB_INSTANCE.solutionTable.adapter.write(solutionTables);
          }}>Save</Button></Row_Component>
    </div>
  );
};

export default ChevronCellExample;
