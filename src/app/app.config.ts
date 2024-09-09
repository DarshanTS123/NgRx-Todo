import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { reducers } from './posts/store/post/reducers';
import { PostsEffects } from './posts/store/post/effects';
import { todoReducers } from './posts/store/todo/todo.reducers';
import { metaReducers } from './posts/store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({ posts: reducers, todos: todoReducers }, { metaReducers }),
    provideStoreDevtools({
      maxAge: 25, logOnly: !isDevMode(),
    }),
    provideEffects([PostsEffects]),
  ],
};
