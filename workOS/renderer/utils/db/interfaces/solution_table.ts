import { UUID } from "crypto";
import { ReactGrid, Column, Row, Highlight, Cell } from "@silevis/reactgrid";

export interface I_SolutionTableModel {
  table_id: UUID;
  headers: Row;
  rows: Row[];
  columns: CustomColumn[];
  data: any[];
}

interface CustomColumn extends Column {
  id: string;
}
