import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskService } from '../tasks.service';
import { Task } from './task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  storedTasks: Task[] = [];

  private tasksSub: Subscription;
  constructor(public tasksService: TaskService) {

  }

  ngOnInit() {
    this.storedTasks = this.tasksService.getTasks();
    this.tasksSub = this.tasksService.getTaskUpdateLister()
      .subscribe((tasks: Task[])=> {
        this.storedTasks = tasks;
      })
    }

  ngOnDestroy() { // ngOnDestroy for memories leacks
    this.tasksSub.unsubscribe();
  }

}

