import React, { useEffect, useRef, useState } from "react";
import { ReactGrid, Column, ChevronCell, Row } from "@silevis/reactgrid";
import { Button, Spacer, Row as Row_Component, Col } from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";
import { NonEditableNumberCellTemplate } from "./nonEditableNumber.cell";
import { getContextMenu } from "./getContextMenu";
import Router, { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  editSolutionTable,
  getSolutionTable,
} from "../../redux/solution-tables";
import { AppState } from "../../redux/store";
import { I_SolutionTableModel, PhasesData } from "../../utils/db/interfaces";
import SelectMemberModal from "./selectMember.modal.component";
import { addMember } from "./utils/addMember";
import LayoutContainer from "../../layout";
import { randomUUID } from "crypto";
import { createSolution } from "../../redux/solutions";
import SaveSolutionDataModal from "./modal/save-data.modal";
import { updateOnChange, getFunctions } from "./updateOnChange";
import EditPhasing from "./modal/edit-phasing.modal";

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

const SolutionSpreadSheet: React.FunctionComponent = () => {
  const tableDataRef = useRef(null);
  const columnRef = useRef(null);
  const rowRef = useRef(null);
  const ref = useRef();
  let forcedRef = useRef(null);
  const { setTheme } = useNextTheme();
  useEffect(() => {
    setTheme('light');
  }, []);
  let solutionTable = useSelector(
    (state: AppState) => state.solutionTable.solutionTable
  );
  let solutions = useSelector((state: AppState) => state.solutions.solutions);
  const _setCreateMemberData = (props) => {
    setCreateMemberData(props);
    setMemberModalVisible(true);
  };
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
    await addMember(
      columns,
      createMemberData,
      rows,
      setColumns,
      setRows,
      buildTree,
      member,
      updateOnChange
    );
    setMemberModalVisible(false);
  };
  let [forcedRouting, setForcedRouting] = useState(false);
  forcedRef.current = forcedRouting;
  let router = useRouter();
  const [visible, setVisible] = React.useState(false);

  const { handleChanges, handleColumnResize } = getFunctions(
    rows,
    columns,
    setRows,
    setRowsToRender,
    setColumns
  );
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
  const saveHandler = async () => {
    await setVisible(false);
    await setForcedRouting(true);
    dispatch(
      editSolutionTable({
        columns,
        rows,
        table_id: tableData.table_id,
        phases: {
          data: phaseData,
          list: phases,
        },
      })
    );
    router.push(router.asPath.split("/").slice(0, 3).join("/"));
  };
  const [phases, setPhases] = useState<{ name: string; disabled?: boolean }[]>(
    []
  );
  const [phaseData, setPhaseData] = useState<PhasesData[]>([]);
  //added useEffects
  useEffects();
  return (
    <>
      {/* <EditPhasing
        data={JSON.parse(JSON.stringify(tableData))}
        phases={JSON.parse(JSON.stringify(phases))}
        phaseData={JSON.parse(JSON.stringify(phaseData))}
        setVisible={setPhasingModal}
        visible={phasingModal}
        setData={setTableData}
      />
      <Spacer /> */}
      <SaveSolutionDataModal
        discardHandler={async () => {
          await setForcedRouting(true);
          await setVisible(false);
          router.push(router.asPath.split("/").slice(0, 3).join("/"));
        }}
        saveHandler={saveHandler}
        visible={visible}
        closeHandler={closeHandler}
      />
      {memberModalVisible && (
        <SelectMemberModal
          addMemberFunc={addMemberFunc}
          closeHandler={() => setMemberModalVisible(false)}
        />
      )}
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
          onColumnResized={handleColumnResize}
          customCellTemplates={{
            nonEditableNumber: NonEditableNumberCellTemplate,
          }}
          onContextMenu={(...props) => {
            return getContextMenu(
              rowsToRender,
              props,
              columns,
              rows,
              phases,
              setColumns,
              setRows,
              setRowsToRender,
              _setCreateMemberData,
              setPhases,
              phaseData,
              setPhaseData
            );
          }}
        />
      </div>
      {Array(3).fill(<Spacer />)}
      <Col>
        <Row_Component justify="flex-end">
          <Button
            onPress={() => {
              dispatch(
                editSolutionTable({
                  columns,
                  rows,
                  table_id: tableData.table_id,
                  phases: {
                    list: phases,
                    data: phaseData,
                  },
                })
              );
            }}
          >
            Save
          </Button>
        </Row_Component>
        <Spacer />
        <Row_Component justify="flex-end">
          <Button
            onPress={() => {
              let table_id = randomUUID();
              let solution = solutions.find((e) =>
                e.table_id.includes(tableData.table_id)
              );
              dispatch(
                createSolution({
                  solutionTable: { ...tableData, table_id },
                  solution: {
                    project_id:
                      typeof router.query.project_id == "string" &&
                      router.query.project_id,
                    created_on: new Date().toDateString(),
                    title: (solution.title || "") + " (Duplicate)",
                    id: randomUUID(),
                    overvew: solution.overvew,
                    table_id: [table_id],
                  },
                })
              );
            }}
            color="secondary"
          >
            Duplicate
          </Button>
        </Row_Component>
      </Col>
    </>
  );

  function useEffects() {
    useEffect(() => {
      const handleRouteChange = (...props: any[]): void => {
        const hasChanged =
          (rowRef &&
            columnRef &&
            JSON.stringify(rowRef.current) !=
              JSON.stringify(tableDataRef.current.rows)) ||
          JSON.stringify(columnRef.current) !=
            JSON.stringify(tableDataRef.current.columns);
        if (!forcedRef.current) {
          if (hasChanged) {
            setVisible(true);
            throw new Error("Hello");
          }
        } else {
          setVisible(false);
        }
      };
      router.events.on("routeChangeStart", handleRouteChange);
      return () => router.events.off("routeChangeStart", handleRouteChange);
    }, []);
    useEffect(() => {
      columnRef.current = columns;
      rowRef.current = rows;
    }, [rows, columns]);
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
      tableDataRef.current = solutionTable;
    }, [JSON.stringify(solutionTable), solutionTable]);
    useEffect(() => {
      forcedRef.current = forcedRouting;
    }, [forcedRouting]);
  }
};

export default SolutionSpreadSheet;
