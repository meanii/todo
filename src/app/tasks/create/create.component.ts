import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from '../list/task.model';

@Component({
  selector: 'app-task-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {

  @Output() taskCreate = new EventEmitter<Task>();

  onCreateTask(form: NgForm) {

    // form validation
    if(!form.valid) {
      return;
    }
    const task: Task = {
      title: form.value.title,
      discription: form.value.description
    }
    this.taskCreate.emit(task);

  }

}
