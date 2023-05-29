import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  completed: boolean = false;
  taskList: any[] = [];
  newTodoForm: FormGroup; // Declare newTodoForm as a FormGroup

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.newTodoForm = this.formBuilder.group({
      todoItem: '',
      description: ''
    });
    
    this.taskList = window.localStorage.getItem('task') ? JSON.parse(localStorage.getItem('task')) : [];
  }

  addTask() {
    const name = this.newTodoForm.value.todoItem;
    const description = this.newTodoForm.value.description;
    this.taskList.push({ id: this.taskList.length, name: name, description: description });
    window.localStorage.setItem('task', JSON.stringify(this.taskList));
    this.newTodoForm.reset();
  }

  removeTask(i: any) {
    this.taskList.splice(i, 1);
    window.localStorage.setItem('task', JSON.stringify(this.taskList));
  }

  editTask(task: any) {
    task.editMode = true;
  }

  saveTask(task: any) {
    task.editMode = false;
    window.localStorage.setItem('task', JSON.stringify(this.taskList));
  }

  cancelEdit(task: any) {
    task.editMode = false;
  }
}
