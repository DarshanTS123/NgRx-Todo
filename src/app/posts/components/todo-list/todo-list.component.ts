import { Component } from '@angular/core';
import { Todo } from '../../types/todo.interface';
import { select, Store } from '@ngrx/store';
import { selectTodo } from '../../store/todo/todo.selectors';
import { Observable } from 'rxjs';
import * as TodoAction from '../../store/todo/todo.actions'
import { AsyncPipe, CommonModule } from '@angular/common';
import { AppStateInterface } from '../../../types/appState.interface';
import { TodoFormComponent } from "../todo-form/todo-form.component";

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, AsyncPipe, TodoFormComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  todos$: Observable<Todo[]>;
  editInputValue: Todo = { id: '', title: '', completed: false }
  todoEdit: boolean = false

  constructor(private store: Store<AppStateInterface>) {
    this.todos$ = this.store.pipe(select(selectTodo));
  }

  ngOnInit(): void {
    this.store.dispatch(TodoAction.getTodoList());
  }

  onStatusChange(todo: Todo) {
    this.store.dispatch(TodoAction.toggleTodoStatus(todo))
  }

  deleteTodo(todo: Todo) {
    this.store.dispatch(TodoAction.deleteTodo(todo))
  }

  editTodo(todo: Todo) {
    this.editInputValue = todo
    this.todoEdit = true
  }
}
