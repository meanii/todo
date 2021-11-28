import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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
  isLoading: boolean = false;

  totalTasks = 100;
  pageSize = 10;
  pageSizeOptions = [1, 5, 10, 100];

  private tasksSub: Subscription;

  constructor(public tasksService: TaskService) {

  }

  ngOnInit() {
    this.tasksService.getTasks();
    this.isLoading = true;


    this.tasksSub = this.tasksService.getTaskUpdateLister()
      .subscribe((tasks: Task[])=> {
        this.isLoading = false;
        this.storedTasks = tasks;
      })
    }

    onChangePage(event: PageEvent){
      console.log(event)
    }

    onDelete(id: string){
      this.tasksService.deleteTask(id)
    }

  ngOnDestroy() { // ngOnDestroy for memories leacks
    this.tasksSub.unsubscribe();
  }

}

