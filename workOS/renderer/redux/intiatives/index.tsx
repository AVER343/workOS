import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { HYDRATE } from "next-redux-wrapper";
import { I_InitiativesModel } from "../../utils/db/interfaces";
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
            state.initiatives = state.initiatives.concat(action.payload);
            DB_INSTANCE.initiative.adapter.write(state.initiatives);
        },
        deleteInitiative(state, action) {
            let data = DB_INSTANCE.initiative.adapter.read()
            let index = data.findIndex(_data => _data.id == action.payload)
            if (index >= 0) {
                data.splice(index, 1)
                state.initiatives = [...data]
                DB_INSTANCE.initiative.adapter.write([...data])
            }
        }
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

export const { createInitiative, deleteInitiative, getAllInitiatives } = InitiativeSlice.actions;

export const selectInitiativeState = (state: AppState) => state.initiatives.initiatives;

export default InitiativeSlice.reducer;