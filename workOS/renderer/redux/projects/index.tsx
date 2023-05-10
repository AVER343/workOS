import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { HYDRATE } from "next-redux-wrapper";
import { I_ProjectModel } from "../../utils/db/interfaces";
import { Database } from "../../utils/db";

let db = new Database();
let DB_INSTANCE = await db.initializeModels();

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
        getAllProjects(state) {
            state.projects = DB_INSTANCE.projects.adapter.read();
        },
        createProject(state, action) {
            state.projects = state.projects.concat(action.payload);
            DB_INSTANCE.projects.adapter.write(state.projects);
        },
        deleteProject(state, action) {
            let data = DB_INSTANCE.projects.adapter.read()
            let index = data.findIndex(_data => _data.id == action.payload)
            if (index >= 0) {
                data.splice(index, 1)
                state.projects = [...data]
                DB_INSTANCE.projects.adapter.write([...state.projects])
            }
        }
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

export const { getAllProjects, deleteProject, createProject } = projectsSlice.actions;

export const selectProjectsState = (state: AppState) => state.projects.projects;

export default projectsSlice.reducer;