import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Task } from "./list/task.model";

@Injectable({providedIn: 'root'})
export class TaskService {
  private tasks: Task[] = [];
  private tasksUpdated = new Subject<Task[]>();

  constructor(private http: HttpClient){

  }

  getTasks(){
    this.http.get<{status:{}, data:Task[]}>('http://localhost:2000/api/tasks')
      .subscribe((taskData)=> {
          this.tasks = taskData.data;
          this.tasksUpdated.next([...this.tasks]);
      });
  }

  getTask(id: string){
    console.log(id)
    return this.http.get<{status:{}, data: Task}>('http://localhost:2000/api/tasks/' + id);
  }

  // edit service instance
  updateTask(task: Task){
    console.log(task)
    console.log('http://localhost:2000/api/tasks/' + task._id)
    this.http.put<{status:{}, data: Task}>('http://localhost:2000/api/tasks/' + task._id, task)
    .subscribe((resp) => {
      console.log(resp);

      let index = this.tasks.findIndex(t => t._id == task._id)
      if(index > -1) {
        this.tasks[index] = task;
        this.tasksUpdated.next([...this.tasks]);
      }
    })
  }

  getTaskUpdateLister() {
    return this.tasksUpdated.asObservable();
  }

  // create new post service instanse
  addTask(task: Task){

    this.http.post<{status:{}, data: Task}>('http://localhost:3000/api/tasks', task)
      .subscribe((resp)=>{
        this.tasks.push(resp.data);
        this.tasksUpdated.next([...this.tasks]);
      })

  }

  // delete service instance
  deleteTask(id: string){
    this.http.delete('http://localhost:3000/api/tasks/' + id)
    .subscribe((resp)=>{
      this.tasks = this.tasks.filter(task => task._id != id);
      this.tasksUpdated.next([...this.tasks]);
    })
  }
}


