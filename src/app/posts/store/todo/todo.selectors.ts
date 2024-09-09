import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "../../../types/appState.interface";

export const selectFeature = (state: AppStateInterface) => state.todos;


export const selectTodo = createSelector(
    selectFeature,
    (state) => state
);
