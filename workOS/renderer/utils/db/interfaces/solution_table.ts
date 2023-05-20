import { UUID } from "crypto";
import { ReactGrid, Column, Row, Highlight, Cell } from "@silevis/reactgrid";

export interface I_SolutionTableModel {
  table_id: UUID;
  rows: Row[];
  columns: CustomColumn[];
}

export interface CustomColumn extends Column {
  id: UUID;
}
