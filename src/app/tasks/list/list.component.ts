import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { TaskService } from '../tasks.service';
import { Task } from './task.model';
import { AuthService } from 'src/app/auth/auth.service';



@Component({
  selector: 'app-task-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  storedTasks: Task[] = [];
  userTasks: any
  isLoading: boolean = false;

  totalTasks = 0;
  pageSize = 10;
  pageSizeOptions = [1, 5, 10, 100];
  pageIndex = 0;

  userId = null;

  private authListenerSubs: Subscription;

  private tasksSub: Subscription;
  public userIsAuthenticated: boolean;
  public creator: string;
  public loginUser = localStorage.getItem("userId")

  constructor(public tasksService: TaskService, private authService: AuthService) {

  }

  ngOnInit() {


    this.userTasks = this.tasksService.getUserTask(localStorage.getItem("userId"))
    console.log(this.userTasks)


    this.tasksService.getTasks(this.pageSize, this.pageIndex);
    this.isLoading = true;

    this.tasksSub = this.tasksService.getTaskUpdateLister()
      .subscribe((taskData: any)=> {
        this.isLoading = false;

        this.storedTasks = taskData.tasks;
        this.totalTasks = taskData.totalCount;
      })


    this.userIsAuthenticated = this.authService.getAuthStatus();
    this.userId = this.authService.getUserId();

    this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      this.userId = this.authService.getUserId();
    })

    }

    onChangePage(event: PageEvent){
      this.pageSize = event.pageSize;
      this.pageIndex = event.pageIndex
      this.tasksService.getTasks(this.pageSize, event.pageIndex);
    }

    onDelete(id: string){
      this.tasksService.deleteTask(id).subscribe(r=>{
        this.tasksService.getTasks(this.pageSize, this.pageIndex);
      })
    }

  ngOnDestroy() { // ngOnDestroy for memories leacks
    this.tasksSub.unsubscribe();
  }


}

