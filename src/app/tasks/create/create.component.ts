import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from '../list/task.model';
import { TaskService } from '../tasks.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {

  constructor(public tasksService: TaskService) {

  }

  onCreateTask(form: NgForm) {

    // form validation
    if(!form.valid) {
      return;
    }
    const task: Task = {
      _id: null,
      title: form.value.title,
      description: form.value.description
    }
    this.tasksService.addTask(task)
    form.resetForm(); // to reset the froms
  }

}
