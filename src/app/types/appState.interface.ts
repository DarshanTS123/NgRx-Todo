import { PostsStateInterface } from '../posts/types/postsState.interface';
import { Todo } from '../posts/types/todo.interface';

export interface AppStateInterface {
    posts: PostsStateInterface,
    todos: Todo[]
}