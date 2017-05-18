import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {

  private todos;
  private activeTasks;
  private completedTasks;
  public newTodo;
  private path;
  posts: any = [];
  private result;
  private nTask;
  private key;
  public status;
  

 constructor(private todoService: TodoService, private route: ActivatedRoute, private router :Router) { }
  
 ngOnInit() {
 this.route.params.subscribe(params => {
      this.path = params['status'];
      this.getTodos(this.path);
	 
    });
    this.route.params.subscribe(params=>{
      this.status=params['status'];
      this.getToDoTasks(this.status);
    })
  }

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

getToDoTasks(status)
{
	//var tasks=[];
  //console.log("Hi"+status);
	 this.todoService.getAllTasks().subscribe(posts => {

     if(status=="active")
     {
       //console.log("If Block 1");
      this.posts=posts.filter(todo => todo.isDone == false);
     }
      

    if(status=="completed")
    {
        this.posts=posts.filter(todo => todo.isDone == true);
        //console.log("If Block 2");
    }
      
    
    if(status=="all")
    {
      this.posts = posts;
      //console.log("If Block 3");

    }
      
      this.activeTasks = this.posts.filter(post => !post.isDone).length;
      this.completedTasks=this.posts.filter(post=> post.isDone).length;      
    });
	
}
addToDoTask()
{
	
	//console.log(this.nTask);
	this.todoService.addTask({ text: this.nTask, isDone: false, key:Date.now() }).subscribe(data=>{
  this.nTask="";
  console.log(status);
  if(status=="completed")
  this.router.navigate['/todo/all'];
	this.getToDoTasks(this.status);  
  });
    //newToDo="";
}

deleteToDoTask(todo)
{
	
	
	this.todoService.deleteTask({key:todo.key});	
  this.getToDoTasks(this.status);
}

completeTask(todo)
{
  this.todoService.updateCompleteTask({key:todo.key}).subscribe(data=>{
    this.getToDoTasks(this.status);
  });
  //this.getToDoTasks(this.status);
}

completeAllTasks()
{
  //console.log("Hello Souvik");
  //this.todoService.updateCompleteTask({key:todo.key});
  this.todoService.completeAllTasks().subscribe(data=>{
    this.getToDoTasks(this.status);
  });
}

markAllTaskCompleted(){
  this.todoService.marlAllTasksCompleted().subscribe(data=>{
this.getToDoTasks(this.status);
  });
}

updateTodoTask(todo,newText)
{
  todo.text=newText;
  this.todoService.updateToDoTaskService(todo).subscribe(data=>{
    todo.editing = false;
  this.getToDoTasks(this.status);
  });
}
}