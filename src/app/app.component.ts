import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/model/Todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode: String = 'list';
  public todos: Todo[] = [];
  public title: string = "Minhas Tarefas";
  public form: FormGroup;

  constructor(private fb: FormBuilder){
    this.form = this.fb.group({
      title: ['',Validators.compose([
        Validators.required,
        Validators.maxLength(50),
      ])]
    });
    
    this.load();
  }

  add(){
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id,title));
    this.save();
    this.clear();
  }

  clear(){
    this.form.reset();
  }

  remove(todo: Todo){
    const index = this.todos.indexOf(todo);
    if(index !==-1){
      this.todos.splice(index,1);
    }
    this.save();
  }

  markAsDone(todo: Todo){
    todo.done = true;
    const doneTodo = document.getElementsByTagName('li');
    this.save();
  }

  markAsUndone(todo: Todo){
    todo.done = false;
    this.save();
  }

  save(){
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos',data);
  }
  load(){
    const data = localStorage.getItem('todos');
    if(data){
      const items = JSON.parse(data);
      this.todos = items;
    }
    else{
      this.todos = [];
    }   
  }

  changeMode(mode: string){
    this.mode = mode;
  }
}
