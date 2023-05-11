import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { HYDRATE } from "next-redux-wrapper";
import { I_InitiativesModel, I_ProjectModel } from "../../utils/db/interfaces";
import { Database } from "../../utils/db";

let db = new Database();
let DB_INSTANCE = await db.initializeModels();

// Type for our state
export interface initiatives {
  initiatives: I_InitiativesModel[];
}

// Initial state
const initialState: initiatives = {
  initiatives: [],
};

// Actual Slice
export const InitiativeSlice = createSlice({
  name: "initiatives",
  initialState,
  reducers: {
    getAllInitiatives(state) {
      state.initiatives = DB_INSTANCE.initiative.adapter.read();
    },
    createInitiative(state, action) {
      let initiatives = DB_INSTANCE.initiative.adapter.read();
      state.initiatives = [...initiatives, action.payload];
      DB_INSTANCE.initiative.adapter.write(state.initiatives);
    },
    deleteInitiative(state, action: { payload: string; type: string }) {
      let initiative_data: I_InitiativesModel[] =
        DB_INSTANCE.initiative.adapter.read();
      let index = initiative_data.findIndex(
        (_data) => _data.id == action.payload
      );
      if (index >= 0) {
        let projects = DB_INSTANCE.projects.adapter.read();
        let project_index = projects.findIndex((_data) =>
          initiative_data[index].project_ids.includes(_data.initiative_id)
        );
        projects.splice(project_index, 1);
        initiative_data.splice(index, 1);
        console.log({ initiative_data, projects });
        state.initiatives = [...initiative_data];
        DB_INSTANCE.initiative.adapter.write([...initiative_data]);
        DB_INSTANCE.projects.adapter.write([...projects]);
      }
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.initiatives,
      };
    },
  },
});

export const { createInitiative, deleteInitiative, getAllInitiatives } =
  InitiativeSlice.actions;

export const selectInitiativeState = (state: AppState) =>
  state.initiatives.initiatives;

export default InitiativeSlice.reducer;
