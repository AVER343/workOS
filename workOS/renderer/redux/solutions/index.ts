import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { HYDRATE } from "next-redux-wrapper";
import { I_ProjectModel, I_SolutionsModel } from "../../utils/db/interfaces";
import { Database } from "../../utils/db";
import intiatives from "../intiatives";
import { find } from "lodash";
let db = new Database();
let DB_INSTANCE = await db.InitiativeModels();

// Type for our state
export interface solutions {
  solutions: I_SolutionsModel[];
}

// Initial state
const initialState: solutions = {
  solutions: [],
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
        payload: { project_id: string; solution: I_SolutionsModel };
        type: string;
      }
    ) {
      let projects = DB_INSTANCE.projects.adapter.read();
      let project = projects.find(
        (project) => project.id == action.payload.project_id
      );
      console.log({ project });
      project.project_solution_ids.push(action.payload.solution.id);
      state.solutions = [...state.solutions, action.payload.solution];
      DB_INSTANCE.projects.adapter.write(projects);
      DB_INSTANCE.solutions.data.push(action.payload.solution);
      DB_INSTANCE.solutions.write();
    },
    deleteSolution(state, action) {},
    editSolution(state, action: { payload: I_SolutionsModel }) {},
  },
});

export const { editSolution, getAllSolutions, deleteSolution, createSolution } =
  solutionsSlice.actions;

export const selectSolutionsState = (state: AppState) =>
  state.solutions.solutions;
export default solutionsSlice.reducer;
