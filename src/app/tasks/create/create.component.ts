import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Task } from '../list/task.model';
import { TaskService } from '../tasks.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit{

  mode = 'create';
  private taskId: string = null;
  task: Task;


  constructor(public tasksService: TaskService, public route: ActivatedRoute) {

  }

  ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has("taskId")){
        this.mode = 'edit';
        this.taskId = paramMap.get('taskId');
        this.tasksService.getTask(this.taskId)
        .subscribe((resp)=> {
          this.task = resp.data;
        })
      }
      else {
        this.mode = 'create';
        this.taskId = null;
      }
    })
  }

  onSaveTask(form: NgForm) {

    // form validation
    if(!form.valid) {
      return;
    }

    const task: Task = {
      _id: null,
      title: form.value.title,
      description: form.value.description
    };
    if(this.mode === 'edit'){
      task._id = this.task._id;
      this.tasksService.updateTask(task);
    } else {
      this.tasksService.addTask(task)
    }
    form.resetForm(); // to reset the froms

  }

}
