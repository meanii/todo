import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Task } from "./list/task.model";

@Injectable({providedIn: 'root'})
export class TaskService {
  private tasks: Task[] = [];
  private tasksUpdated = new Subject<Task[]>();

  constructor(private http: HttpClient){
    this.http.get<{status:{}, data:Task[]}>('http://localhost:3000/api/tasks')
      .subscribe((taskData)=> {
          this.tasks = taskData.data;
          this.tasksUpdated.next([...this.tasks]);
      });
  }

  getTasks(){


  }

  getTaskUpdateLister() {
    return this.tasksUpdated.asObservable();
  }

  addTask(task: Task){

    this.http.post<{status:{}}>('http://localhost:3000/api/tasks', task)
      .subscribe((resp)=>{
        console.log(resp);

        this.tasks.push(task);
        this.tasksUpdated.next([...this.tasks]);
      })

  }
}
