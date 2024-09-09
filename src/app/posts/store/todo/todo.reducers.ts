import { createReducer, on } from "@ngrx/store";
import { Todo } from "../../types/todo.interface";
import * as TodoActions from './todo.actions';

export const initialState: Todo[] = []

export const todoReducers = createReducer(
    initialState,
    on(TodoActions.getTodoList, (state) => state),
    on(TodoActions.addTodo, (state, action) => [...state, action]),
    on(TodoActions.editTodo, (state, action) => {
        return state.map(data =>
            data.id === action.id ?
                { ...data, title: action.title }
                : data
        )
    }),
    on(TodoActions.deleteTodo, (state, action) => {
        return state.filter(data => data.id !== action.id)
    }),
    on(TodoActions.toggleTodoStatus, (state, action) => {
        return state.map(data =>
            data.id === action.id
                ? { ...data, completed: !data.completed }
                : data
        );
    })
)