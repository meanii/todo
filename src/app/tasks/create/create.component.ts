import { Component, EventEmitter, Output } from '@angular/core';
import { Task } from '../list/task.model';

@Component({
  selector: 'app-task-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {

  enteredTitle = "";
  enteredDescription = "";
  @Output() taskCreate = new EventEmitter<Task>();

  onCreateTask() {

    const task: Task = {
      title: this.enteredTitle,
      discription: this.enteredDescription
    }
    this.taskCreate.emit(task);

  }

}
