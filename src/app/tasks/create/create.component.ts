import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {

  newTask = "Add a task.";
  onCreateTask() {
    this.newTask = "my new task";
  }

}
