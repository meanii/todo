import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-task-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {

  enteredTitle = "";
  enteredDescription = "";
  @Output() taskCreate = new EventEmitter();

  onCreateTask() {

    const task = {
      title: this.enteredTitle,
      discription: this.enteredDescription
    }
    this.taskCreate.emit(task);

  }

}
