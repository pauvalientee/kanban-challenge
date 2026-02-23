import { Routes } from '@angular/router';
import {KanbanBoardComponent} from './components/kanban-board/kanban-board';
import {LoginComponent} from './components/login/login';
import {authGuard} from './guards/auth-guard';
import {RegisterComponent} from './components/register/register';

export const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },
  { path: 'register',
    component: RegisterComponent
  },
  {
    path: 'kanban',
    component: KanbanBoardComponent,
    canActivate: [authGuard],
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
