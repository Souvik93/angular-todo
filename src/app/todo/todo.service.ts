import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

let todos = [
  { _id: 1, title: 'Install Angular CLI', isDone: true },
  { _id: 2, title: 'Style app', isDone: true },
  { _id: 3, title: 'Finish service functionality', isDone: false },
  { _id: 4, title: 'Setup API', isDone: false },
];

@Injectable()
export class TodoService {

  constructor(private http: Http) { }
 
  get(query = ''){
    return new Promise(resolve => {
      var data;

      if(query === 'completed' || query === 'active'){
        var isCompleted = query === 'completed';
        data = todos.filter(todo => todo.isDone === isCompleted);
      } else {
        data = todos;
      }

      resolve(data);
    });
  }
  add(data) {
  return new Promise(resolve => {
    todos.push(data);
    resolve(data);
  });
}

put(data) {
  return new Promise(resolve => {
    let index = todos.findIndex(todo => todo._id === data._id);
    todos[index].title = data.title;
    resolve(data);
  });
}

delete(id) {
  return new Promise(resolve => {
    let index = todos.findIndex(todo => todo._id === id);
    todos.splice(index, 1);
    resolve(true);
  });
}
deleteCompleted() {
  return new Promise(resolve => {
    todos = todos.filter(todo => !todo.isDone);
    resolve(todos);
  });
}

getAllTasks()
{
	  return this.http.get('/api/getTasks')
      .map(res => res.json());
}

addTask(task)
{
//console.log("Hell");
  return this.http
    .post('/api/tasks', task)
      .subscribe(data => {
            alert('ok');
      }, error => {
          console.log(error.json());
      });
}

deleteTask(key)
{
//console.log(key);
  return this.http
    .post('/api/deleteTask',key)
      .subscribe(data => {
            //alert('ok');

			console.log("Deletion Successful")
      }, error => {
          console.log(error.json());
      });
}



}
