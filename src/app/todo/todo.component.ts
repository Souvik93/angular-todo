import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {

  private todos;
  private activeTasks;
  public newTodo;
  private path;
  posts: any = [];
  private result;
  private nTask;
  private key;

 constructor(private todoService: TodoService, private route: ActivatedRoute) { }
  getTodos(query = ''){
    return this.todoService.get(query).then(todos => {
      this.todos = todos;
      this.activeTasks = this.todos.filter(todo => todo.isDone).length;
    });
  }
  
  addTodo(){
  //console.log(this.newTodo);
  this.todoService.add({ title: this.newTodo, isDone: false }).then(() => {
    return this.getTodos();
  }).then(() => {
    this.newTodo = ''; // clear input form value
  });
  }
  
  updateTodo(todo, newValue) {
  todo.title = newValue;
  return this.todoService.put(todo).then(() => {
    todo.editing = false;
    return this.getTodos();
  });
}
destroyTodo(todo){
  this.todoService.delete(todo._id).then(() => {
    return this.getTodos();
  });
}
  clearCompleted() {
  this.todoService.deleteCompleted().then(() => {
    return this.getTodos();
  });
}

getToDoTasks()
{
	//var tasks=[];
	 this.todoService.getAllTasks().subscribe(posts => {
      this.posts = posts;
    });
	
}
addToDoTask()
{
	
	//console.log(this.nTask);
	this.todoService.addTask({ text: this.nTask, isDone: true, key:Date.now() })
    //newToDo="";
	this.nTask="";
	this.getToDoTasks();
	
}

deleteToDoTask(todo)
{
	
	
	this.todoService.deleteTask({key:todo.key})
    //newToDo="";
	this.getToDoTasks();
	
}


  ngOnInit() {
 this.route.params.subscribe(params => {
      this.path = params['status'];
      this.getTodos(this.path);
	 
    });
	this.getToDoTasks();
	//console.log(this.newToDo);
	
  }

}
