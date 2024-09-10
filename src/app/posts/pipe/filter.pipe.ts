import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../types/todo.interface';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(todo: Todo[] | null, type: string) {
    if (!todo) return

    if (todo?.length > 0) {
      let filteredTodo = todo
      if (type === 'active') {
        filteredTodo = todo.filter(item => !item.completed)
        return filteredTodo
      } else if (type === 'completed') {
        filteredTodo = todo.filter(item => item.completed)
        return filteredTodo
      } else {
        return todo
      }
    } else {
      return []
    }
  }

}
