import { createAction, props } from "@ngrx/store";
import { Todo } from "../../types/todo.interface";

export const getTodoList = createAction('[Todo] Get Todo')

export const addTodo = createAction(
    '[Todo] Add Todo',
    props<Todo>()
);

export const editTodo = createAction(
    '[Todo] Edit Todo',
    props<Todo>()
);

export const deleteTodo = createAction(
    '[Todo] Delete Todo',
    props<Todo>()
);

export const toggleTodoStatus = createAction(
    '[Todo] Toggle Todo Status',
    props<Todo>()
);