import React, { useEffect, useState } from "react";
import { ReactGrid, Column, Row, Highlight, Cell } from "@silevis/reactgrid";
import { UUID, randomUUID } from "crypto";
import { I_SolutionTableModel } from "../../utils/db/interfaces";
import { Database } from "../../utils/db";
import { Button, Text, Popover } from "@nextui-org/react";
const db = new Database();
const DB_INSTANCE = await db.InitiativeModels();

export default function StickyPanesSample() {
  let [tableData, setTableData] = useState<I_SolutionTableModel>({
    table_id: DB_INSTANCE.solutionTable.adapter.read()[0].table_id,
    headers: DB_INSTANCE.solutionTable.adapter.read()[0].headers,
    rows: DB_INSTANCE.solutionTable.adapter.read()[0].rows,
    columns: DB_INSTANCE.solutionTable.adapter.read()[0].columns,
    data: DB_INSTANCE.solutionTable.adapter.read()[0].data,
  });
  interface Data {
    cells: any[];
  }

  interface CustomColumn extends Column {
    id: string;
  }
  const getData = (tableData: I_SolutionTableModel): any[] => tableData.data;

  const getColumns = (data: I_SolutionTableModel): CustomColumn[] => {
    return data.columns;
  };

  const headerRow: Row = tableData.headers;

  const getRows = (data: Data[]): Row[] => [
    headerRow,
    ...data.map<Row>((data, idx) => ({
      rowId: idx,
      cells: [...data.cells],
    })),
  ];
  const [data, setData] = React.useState<Data[]>(getData(tableData));

  const [rows, setRows] = useState(getRows(data));
  const [columns, setColumns] = React.useState<Column[]>(getColumns(tableData));
  useEffect(() => {
    setData(getData(tableData));
    setRows(getRows(data));
    getColumns(tableData);
  }, [JSON.stringify(tableData)]);
  const handleColumnResize = (ci: string, width: number) => {
    setColumns((prevColumns) => {
      const columnIndex = prevColumns.findIndex((el) => el.columnId === ci);
      const resizedColumn = prevColumns[columnIndex];
      const updatedColumn = { ...resizedColumn, width };
      prevColumns[columnIndex] = updatedColumn;
      return [...prevColumns];
    });
  };
  function handleCellChanged(cells) {
    for (const iterator of cells) {
      let newCell = iterator.newCell;
      setRows((prevRows: Row[]) => {
        return prevRows.map((row) => {
          row.cells.map((cell) => {
            if (cell["id"] == newCell.id) {
              console.log({ cell });
              cell[cell.type] = newCell.text;
            }
            return cell;
          });
          return row;
        });
      });
    }
  }

  return (
    <>
      <ReactGrid
        onColumnResized={handleColumnResize}
        rows={rows}
        columns={columns}
        stickyLeftColumns={1}
        stickyTopRows={1}
        onContextMenu={(...props) => {
          return [
            {
              id: "addToRight",
              label: "Add Column To Right",
              handler: (...props) => {},
            },
          ];
        }}
        onCellsChanged={handleCellChanged}
        stickyBottomRows={1}
      />
      <Popover>
        <Popover.Trigger>
          <i className="material-icons">add_circle</i>
        </Popover.Trigger>
        <Popover.Content>
          <div className="rg-context-menu">
            <div className="rg-context-menu-option">Add Column To Right</div>
          </div>
          {/* add buttons for adding team or members to a team*/}
        </Popover.Content>
      </Popover>
    </>
  );
  {
  }
}
