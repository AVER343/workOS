import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { HYDRATE } from "next-redux-wrapper";
import { I_MembersModel, I_ProjectModel } from "../../utils/db/interfaces";
import { Database } from "../../utils/db";
import intiatives from "../intiatives";

let db = new Database();
let DB_INSTANCE = await db.InitiativeModels();
// Type for our state
export interface members {
    members: I_MembersModel[];
}

// Initial state
const initialState: members = {
    members: [],
};
export const membersSlice = createSlice({
    name: "members",
    initialState,
    reducers: {
        getAllMembers(state) {
            let members = DB_INSTANCE.members.adapter.read();
            state.members = members;
        }, deleteMember(state, action: {
            type: string;
            payload: { member: I_MembersModel };
        }) {
            let data = DB_INSTANCE.members.adapter.read();
            let memberIndex = data.findIndex(_member => action.payload.member._id == _member._id)
            if (memberIndex == -1) {
                //add user
                // data.push(action.payload.member);
            } else {
                //edit
                data[memberIndex] = { ...action.payload.member, status: 'paused' }
            }
            DB_INSTANCE.members.adapter.write(data);
            state.members = data;
        },
        editMember(state,
            action: {
                type: string;
                payload: { member: I_MembersModel };
            }) {
            let data = DB_INSTANCE.members.adapter.read();
            let memberIndex = data.findIndex(_member => action.payload.member._id == _member._id)
            if (memberIndex == -1) {
                //add user
                data.push(action.payload.member);
            } else {
                //edit
                data[memberIndex] = { ...action.payload.member, status: 'active' }
            }
            DB_INSTANCE.members.adapter.write(data);
            state.members = data;
        }
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.members,
            };
        },
    },
});

export const { getAllMembers, editMember, deleteMember } =
    membersSlice.actions;

export const selectMembersState = (state: AppState) => state.members.members;

export default membersSlice.reducer;
