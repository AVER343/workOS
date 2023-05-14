import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { HYDRATE } from "next-redux-wrapper";
import { I_ProjectModel } from "../../utils/db/interfaces";
import { Database } from "../../utils/db";
import intiatives from "../intiatives";

let db = new Database();
let DB_INSTANCE = await db.InitiativeModels();

// Type for our state
export interface projects {
  projects: I_ProjectModel[];
}

// Initial state
const initialState: projects = {
  projects: [],
};

// Actual Slice
export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    getAllProjects(
      state,
      action: {
        type: string;
        payload: { initiative_id?: string; project_id?: string };
      }
    ) {
      state.projects = DB_INSTANCE.projects.adapter
        .read()
        .filter(
          (project) =>
            project.id == action.payload.project_id ||
            project.initiative_id == action.payload.initiative_id
        );
    },
    createProject(state, action: { payload: I_ProjectModel; type: string }) {
      let projects = DB_INSTANCE.projects.adapter.read();
      let initiatives = DB_INSTANCE.initiative.adapter.read();
      initiatives
        .find((_intiative) => _intiative.id == action.payload.initiative_id)
        .project_ids.push(action.payload.id);
      state.projects = [...state.projects, action.payload];

      DB_INSTANCE.initiative.adapter.write(initiatives);
      DB_INSTANCE.projects.adapter.write([...projects, action.payload]);
    },
    deleteProject(state, action) {
      let data = DB_INSTANCE.projects.adapter.read();
      let index = data.findIndex((_data) => _data.id == action.payload);
      if (index >= 0) {
        data.splice(index, 1);
        state.projects = [
          ...state.projects.filter((project) => project.id != action.payload),
        ];
        DB_INSTANCE.projects.adapter.write([...data]);
      }
    },
    editProject(state, action: { payload: I_ProjectModel }) {
      let projects = DB_INSTANCE.projects.adapter.read();
      const intiative = projects.findIndex(
        (project) => project.id == action.payload.id
      );
      if (intiative >= 0) {
        projects[intiative] = action.payload;
        let pI = state.projects.findIndex(
          (project) => project.id == action.payload.id
        );
        state.projects.splice(pI, 1);
        state.projects = [
          ...state.projects.slice(0, pI),
          action.payload,
          ...state.projects.slice(pI),
        ];
        DB_INSTANCE.projects.adapter.write([...projects]);
      } else {
        state.projects = [...state.projects, action.payload];
        DB_INSTANCE.projects.adapter.write(state.projects);
      }
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.projects,
      };
    },
  },
});

export const { editProject, getAllProjects, deleteProject, createProject } =
  projectsSlice.actions;

export const selectProjectsState = (state: AppState) => state.projects.projects;

export default projectsSlice.reducer;
