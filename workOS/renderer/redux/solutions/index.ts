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
let db = new Database();
let DB_INSTANCE = await db.InitiativeModels();

// Type for our state
export interface solutions {
  solutions: I_SolutionsModel[];
  solution: I_SolutionTableModel;
}

// Initial state
const initialState: solutions = {
  solutions: [],
  solution: null,
};

// Actual Slice
export const solutionsSlice = createSlice({
  name: "solutions",
  initialState,
  reducers: {
    getAllSolutions(
      state,
      action: {
        type: string;
        payload: { project_id: string };
      }
    ) {
      let project = DB_INSTANCE.projects.adapter
        .read()
        .find((project) => project.id == action.payload.project_id);
      let solutions = DB_INSTANCE.solutions.adapter.read();

      state.solutions = solutions.filter((solution) =>
        project.project_solution_ids.includes(solution.id)
      );
    },
    createSolution(
      state,
      action: {
        payload: {
          solution: I_SolutionsModel;
          solutionTable: I_SolutionTableModel;
        };
        type: string;
      }
    ) {
      let projectIndex = DB_INSTANCE.projects.adapter
        .read()
        .findIndex(
          (project) => project.id == action.payload.solution.project_id
        );
      let projects = DB_INSTANCE.projects.adapter.read();
      projects[projectIndex].project_solution_ids.push(
        action.payload.solution.id
      );
      state.solutions.push(action.payload.solution);
      DB_INSTANCE.projects.adapter.write(projects);
      DB_INSTANCE.solutionTable.adapter.write([
        ...DB_INSTANCE.solutionTable.adapter.read(),
        action.payload.solutionTable,
      ]);
      DB_INSTANCE.solutions.adapter.write([
        ...DB_INSTANCE.solutions.adapter.read(),
        action.payload.solution,
      ]);
    },
    deleteSolution(state, action: { payload: I_SolutionsModel }) {
      let projects = DB_INSTANCE.projects.adapter.read();
      let solutionTables = DB_INSTANCE.solutionTable.adapter.read();
      let solutions = DB_INSTANCE.solutions.adapter
        .read()
        .filter((solution) => solution.project_id != action.payload.project_id);
      let projectIndex = projects.findIndex(
        (_project) => _project.id == action.payload.project_id
      );
      projects[projectIndex].project_solution_ids = projects[
        projectIndex
      ].project_solution_ids.filter(
        (solutions) => solutions == action.payload.id
      );
      DB_INSTANCE.solutions.adapter.write(
        solutions.filter((solution) => solution.id != action.payload.id)
      );
      DB_INSTANCE.solutionTable.adapter.write(
        solutionTables.filter(
          (table) => !action.payload.table_id.includes(table.table_id)
        )
      );
      state.solutions = state.solutions.filter(
        (solution) => solution.id != action.payload.id
      );
    },
    editSolution(state, action: { payload: I_SolutionsModel }) {
      let solutions = DB_INSTANCE.solutions.adapter.read();
      let solutionIndex = solutions.findIndex(
        (solution) => solution.id != action.payload.id
      );
      solutions[solutionIndex] = action.payload;
      DB_INSTANCE.solutions.adapter.write(solutions);
      state.solutions = solutions.filter(
        (solution) => solution.project_id == action.payload.project_id
      );
    },
  },
});

export const { editSolution, getAllSolutions, deleteSolution, createSolution } =
  solutionsSlice.actions;

export const selectSolutionsState = (state: AppState) =>
  state.solutions.solutions;
export default solutionsSlice.reducer;
