import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { TodoListPageComponent } from './todoList/todo-list-page/todo-list-page.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    TodoListPageComponent,

    RegisterComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, Ng2SearchPipeModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
