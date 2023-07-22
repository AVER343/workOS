import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { HYDRATE } from "next-redux-wrapper";
import {
  I_ProjectModel,
  I_SolutionTableModel,
  I_SolutionsModel,
} from "../../utils/db/interfaces";
import { Database } from "../../utils/db";
import intiatives from "../intiatives";
import { find } from "lodash";
import { getAllSolutions } from "../solutions";
import { randomUUID } from "crypto";
let db = new Database();
let DB_INSTANCE = await db.InitiativeModels();

// Type for our state
export interface solutionTable {
  solutionTable: I_SolutionTableModel;
}

// Initial state
const initialState: solutionTable = {
  solutionTable: {
    columns: [],
    rows: [],
    table_id: randomUUID(),
    phases: { data: [], list: [] },
  },
};

// Actual Slice
export const solutionTableSlice = createSlice({
  name: "solutionTable",
  initialState,
  reducers: {
    editSolutionTable(state, action: { payload: I_SolutionTableModel }) {
      let solutionTables = DB_INSTANCE.solutionTable.adapter.read();
      let index = solutionTables.findIndex(
        (table) => table.table_id == action.payload.table_id
      );

      if (index == -1) {
        index = solutionTables.length;
        solutionTables.push(action.payload);
      }
      solutionTables[index] = action.payload;
      DB_INSTANCE.solutionTable.adapter.write(solutionTables);
      state.solutionTable = action.payload;
    },
    getSolutionTable(state, action: { payload: { solution_id: string } }) {
      const solution = DB_INSTANCE.solutions.adapter
        .read()
        .find((solution) => solution.id == action.payload.solution_id);
      const solutionTable = DB_INSTANCE.solutionTable.adapter
        .read()
        .find((table) => table.table_id == solution.table_id[0]);
      state.solutionTable = solutionTable;
    },
  },
});

export const { editSolutionTable, getSolutionTable } =
  solutionTableSlice.actions;

export const selectSolutionsState = (state: AppState) =>
  state.solutions.solutions;
export default solutionTableSlice.reducer;
