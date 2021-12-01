import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { Task } from "./list/task.model";

@Injectable({providedIn: 'root'})
export class TaskService {
  private tasks: Task[] = [];
  private tasksUpdated = new Subject<{tasks:Task[], totalCount: number}>();

  constructor(private http: HttpClient, private router: Router){

  }

  getTasks(taskPerPage?: number, currentPage?: number){

    let url = 'http://localhost:2000/api/tasks'

    if(taskPerPage &&  (currentPage > -1)){
      url += `?pagesize=${taskPerPage}&currentpage=${currentPage}`;
    }

    this.http.get<{status:{}, data:Task[], totalCount: number}>(url)
      .subscribe((taskData)=> {
          this.tasks = taskData.data;
          this.tasks = taskData.data.filter(task => task.creator == localStorage.getItem("userId"))
          this.tasksUpdated.next({tasks:[...this.tasks], totalCount: taskData.totalCount});
      });
  }

  getTask(id: string){
    console.log(id)
    return this.http.get<{status:{}, data: Task}>('http://localhost:2000/api/tasks/' + id);
  }

  getUserTask(userid: string){
    console.log(userid)
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'userid': userid});
    return this.http.post<{status:{}, data: Task}>('http://localhost:2000/api/tasks/', null, {headers: headers})
  }

  // edit service instance
  updateTask(task: Task){

    let taskData = null;

    if(typeof(task.imagePath) == 'string'){
      taskData = task;
    }
    else {
      taskData = new FormData();
      taskData.append("_id", task._id);
      taskData.append("title", task.title);
      taskData.append("description", task.description);
      taskData.append("image", task.imagePath, task.title);
    }

    this.http.put<{status:{}, data: Task}>('http://localhost:2000/api/tasks/' + task._id, taskData)
    .subscribe((resp) => {

      this.router.navigate(['/']);

    });
  }

  getTaskUpdateLister() {
    return this.tasksUpdated.asObservable();
  }

  // create new post service instanse
  addTask(task: Task, image: File){

    const taskData = new FormData();
    taskData.append("title", task.title);
    taskData.append("description", task.description);
    taskData.append("image", image, task.title);


    this.http.post<{status:{}, data: Task}>('http://localhost:2000/api/tasks', taskData)
      .subscribe((resp)=>{
        this.router.navigate(['/']);
      })

  }

  // delete service instance
  deleteTask(id: string){
    return this.http.delete('http://localhost:2000/api/tasks/' + id)

  }
}


