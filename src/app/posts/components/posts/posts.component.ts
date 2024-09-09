import { Component } from '@angular/core';
import { AppStateInterface } from '../../../types/appState.interface';
import { select, Store } from '@ngrx/store';
import * as PostsActions from '../../store/post/actions'
import { Observable } from 'rxjs';
import { errorSelector, isLoadingSelector, postsSelector } from '../../store/post/selectors';
import { AsyncPipe, CommonModule } from '@angular/common';
import { PostInterface } from '../../types/post.interface';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent {
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  posts$: Observable<PostInterface[]>;

  constructor(private store: Store<AppStateInterface>, private postService: PostService) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.posts$ = this.store.pipe(select(postsSelector));
  }

  ngOnInit(): void {
    this.store.dispatch(PostsActions.getPosts());
    this.posts$.subscribe(data => {
      console.log(data);
      
    })
  }
}
