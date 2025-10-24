import { Routes } from '@angular/router';

export const routes: Routes = [

  { path: '', redirectTo: 'users', pathMatch: 'full' },

  {
    path: 'users',
    loadComponent: () => import('./pages/users/users.component')
    .then(m => m.UsersComponent)
  },

  {
    path: 'user-details',
    loadComponent: () => import('./pages/users/user-details/user-details.component')
    .then(m => m.UserDetailsComponent)
  },

  {
    path: 'posts',
    loadComponent: () => import('./pages/posts/posts.component')
    .then(m => m.PostsComponent)
  },

  {
    path: 'todos',
    loadComponent: () => import('./pages/todos/todos.component')
    .then(m => m.TodosComponent)
  },

  {
    path: 'shares',
    loadComponent: () => import('./pages/shares/shares.component')
    .then(m => m.sharesComponent)
  },

  { path: '**', redirectTo: 'users' }

];
