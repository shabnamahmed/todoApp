import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterComponent } from './register/register.component';

import { TodoListPageComponent } from './todoList/todo-list-page/todo-list-page.component';

const routes: Routes = [
  {
    path: ' ',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login', component: LoginPageComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'list/:uid', component: TodoListPageComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
