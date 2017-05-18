import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { PostsComponent } from './posts/posts.component';

import { PostsService } from './posts/posts.service';
import { ToDoAppRoutingModule } from './app-routing.module'

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
	PostsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    ToDoAppRoutingModule
  ],
  providers: [PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
