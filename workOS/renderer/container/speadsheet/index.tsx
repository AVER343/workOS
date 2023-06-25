import React, { useEffect, useRef, useState } from "react";
import {
  ReactGrid,
  Column,
  ChevronCell,
  Row,
  CellChange,
  Id,
} from "@silevis/reactgrid";
import {
  Button,
  Spacer,
  Row as Row_Component,
} from "@nextui-org/react";
import { NonEditableNumberCellTemplate } from "./nonEditableNumber.cell";
import { getContextMenu } from "./getContextMenu";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  editSolutionTable,
  getSolutionTable,
} from "../../redux/solution-tables";
import { AppState } from "../../redux/store";
import { I_SolutionTableModel } from "../../utils/db/interfaces";
import {
  CONST_COLUMN_IDS,
  CostToClient_ID,
  CostToCompanyPerHour_ID,
  Profit_ID,
  TotalCostToCompany_ID,
  TotalHours_ID
} from "./constants";
import SelectMemberModal from "./selectMember.modal.component";
import { addMember } from "./utils/addMember";
import LayoutContainer from "../../layout";

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
  const ref = useRef();
  let solutionTable = useSelector(
    (state: AppState) => state.solutionTable.solutionTable
  );
  const _setCreateMemberData = (props) => {
    setCreateMemberData(props);
    setMemberModalVisible(true);
  }
  let [tableData, setTableData] = useState<I_SolutionTableModel>(null);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState(() => buildTree([]));
  const dispatch = useDispatch();
  const [rowsToRender, setRowsToRender] = useState<Row[]>([
    ...getExpandedRows(rows),
  ]);
  const [createMemberData, setCreateMemberData] = useState({});
  const [memberModalVisible, setMemberModalVisible] = useState(false);
  const addMemberFunc = async (member) => {
    await addMember(columns, createMemberData, rows, setColumns, setRows, buildTree, member)
    setMemberModalVisible(false);
  }
  let router = useRouter();
  useEffect(() => {
    setRowsToRender([...getExpandedRows(rows)]);
  }, [JSON.stringify(rows)]);
  useEffect(() => {
    if (typeof router.query.solution_id == "string")
      dispatch(getSolutionTable({ solution_id: router.query.solution_id }));
  }, [router.asPath]);

  useEffect(() => {
    setTableData({ ...solutionTable });
    setColumns([...solutionTable.columns]);
    setRows([...solutionTable.rows]);
  }, [JSON.stringify(solutionTable)]);
  const { handleChanges, handleColumnsReorder, handleColumnResize } = getFunctions(rows, columns, setRows, setRowsToRender, setColumns);
  return (
    <LayoutContainer parentName={'Solution'} parentUrl={router.asPath.split("/").slice(0, 3).join("/")}>
      {memberModalVisible && <SelectMemberModal
        addMemberFunc={addMemberFunc}
        closeHandler={() => setMemberModalVisible(false)} />}
      <div
        style={{
          overflow: "scroll",
        }}
      >
        <ReactGrid
          enableFullWidthHeader
          rows={rowsToRender}
          columns={columns}
          onCellsChanged={handleChanges}
          stickyLeftColumns={1}
          stickyTopRows={1}
          ref={ref}
          onColumnsReordered={handleColumnsReorder}
          onColumnResized={handleColumnResize}
          customCellTemplates={{
            nonEditableNumber: NonEditableNumberCellTemplate,
          }}
          enableRowSelection
          enableColumnSelection
          onContextMenu={(...props) => {
            return getContextMenu(
              rowsToRender,
              props,
              columns,
              rows,
              setColumns,
              setRows,
              setRowsToRender,
              _setCreateMemberData
            );
          }}
        />
      </div>
      <Spacer />
      <Row_Component justify="flex-end">
        <Button
          onPress={() => {
            dispatch(
              editSolutionTable({ columns, rows, table_id: tableData.table_id })
            );
          }}
        >
          Save
        </Button>
      </Row_Component>
    </LayoutContainer >
  );
};

export default ChevronCellExample;
function getFunctions(rows, columns: any[], setRows, setRowsToRender, setColumns: React.Dispatch<React.SetStateAction<any[]>>) {
  const handleChanges = async (changes: CellChange[]) => {
    const newRows = JSON.parse(JSON.stringify(rows));
    let headerRowId = rows[0].rowId;
    if (headerRowId == changes[0].rowId &&
      changes[0].newCell["isExpanded"] != changes[0].previousCell["isExpanded"]) {
      changes.forEach((change) => {
        const changeColumnIdx = columns.findIndex(
          (el) => el.columnId === change.columnId
        );
        newRows[0].cells[changeColumnIdx] = change.newCell;
      });
    }
    else
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
    const targetIdx = Math.min(...idxs) < to
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
    const columnIdxs = columnIds.map((columnId) => columns.findIndex((c) => c.columnId === columnId)
    );
    setColumns((prevColumns) => reorderArray(prevColumns, columnIdxs, to));
  };
  return { handleChanges, handleColumnsReorder, handleColumnResize };
}

function updateOnChange(newRows: any, changeRowIdx: number) {
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
  while (newRows[i].cells[0].parentId) {
    teamObject.totalTeamCost =
      teamObject.totalTeamCost +
      parseFloat(newRows[i].cells[columnTotalCost].value);
    teamObject.totalTeamHours =
      teamObject.totalTeamHours +
      parseFloat(newRows[i].cells[columnTotalHours].value);
    let tCTC = !isNaN(parseFloat(newRows[i].cells[columnCostToClient].value) *
      parseFloat(newRows[i].cells[columnTotalHours].value)) ? parseFloat(newRows[i].cells[columnCostToClient].value) *
    parseFloat(newRows[i].cells[columnTotalHours].value) : 0;
    teamObject.totalCostToClient =
      teamObject.totalCostToClient + tCTC;
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
