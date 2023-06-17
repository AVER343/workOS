import { UUID } from "crypto";
import { ReactGrid, Column, Row, Highlight, Cell } from "@silevis/reactgrid";

export interface I_SolutionTableModel {
  table_id: UUID;
  rows: Row[];
  columns: CustomColumn[];
}

export interface CustomColumn extends Column {

    readonly id: string;
    readonly columnId: string;
    /** Width of each grid column (in default set to `150px`) */
    readonly width?: number;
    /** Allow column to change its position in grid,
     * default: `false` (row reorder implementation is on the developers side)
     */
    readonly reorderable?: boolean;
    /** Allow column to change is width in grid,
     * default: `false` (row resize implementation is on the developers side)
     */
    readonly resizable?: boolean;
}
