import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { projectsSlice } from "./projects";
import { InitiativeSlice } from "./intiatives";
import { solutionsSlice } from "./solutions";
import { solutionTableSlice } from "./solution-tables";
import { membersSlice } from "./members";

export const store = () =>
  configureStore({
    reducer: {
      [projectsSlice.name]: projectsSlice.reducer,
      [InitiativeSlice.name]: InitiativeSlice.reducer,
      [solutionsSlice.name]: solutionsSlice.reducer,
      [solutionTableSlice.name]: solutionTableSlice.reducer,
      [membersSlice.name]: membersSlice.reducer
    },
    devTools: true,
  });
export type AppStore = ReturnType<typeof store>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(store);
