import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateInterface } from '../../../types/appState.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import * as TodoAction from '../../store/todo/todo.actions'
import { Todo } from '../../types/todo.interface';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.css'
})
export class TodoFormComponent {
  @Input('todoInput') todoInput!: Todo
  @Input('isEditing') isEditing: boolean = false
  @ViewChild('inputEl') inputEl!: ElementRef
  todoForm: FormGroup

  constructor(private store: Store<AppStateInterface>, private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      title: ['', Validators.required]
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['todoInput'].isFirstChange()) {
      this.isEditing = true
      this.inputEl.nativeElement.focus()
    }
  }

  onSubmit() {
    if (this.todoForm.valid) {
      if (this.isEditing) {
        this.store.dispatch(TodoAction.editTodo({ ...this.todoInput, title: this.todoForm.value.title }))
        this.isEditing = false
      } else {
        this.store.dispatch(TodoAction.addTodo({ id: Date.now().toString(), completed: false, title: this.todoForm.value.title }));
      }
      this.todoForm.reset()
    }
  }
}
