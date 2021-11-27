import { Component, Input } from '@angular/core';
import { Task } from './task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  @Input() storedTasks: Task[] = []

}
