import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { imageTypeValidatior } from 'src/app/validators/image-type.validator';
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
  isLoading: boolean = false;
  imagePreview = null;

  taskForm: FormGroup;


  constructor(public tasksService: TaskService, public route: ActivatedRoute) {

  }

  ngOnInit(){

    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has("taskId")){

        this.taskForm = new FormGroup({
          'title': new FormControl(null, {validators: [Validators.required]}),
          'description': new FormControl(null, {validators: [Validators.required]}),
          'image': new FormControl(null, {validators: [Validators.required]})
        })

        this.mode = 'edit';
        this.taskId = paramMap.get('taskId');
        this.isLoading = true;
        this.tasksService.getTask(this.taskId)
        .subscribe((resp)=> {
          this.isLoading = false;
          this.task = resp.data;
          this.taskForm.setValue({
            'title': this.task.title,
            'description': this.task.description,
            'image': this.task.imagePath
          })
        })
      }
      else {
        this.taskForm = new FormGroup({
          'title': new FormControl(null, {validators: [Validators.required]}),
          'description': new FormControl(null, {validators: [Validators.required]}),
          'image': new FormControl(null, {validators: [Validators.required, imageTypeValidatior]})
        })

        this.mode = 'create';
        this.taskId = null;
      }
    })
  }

  onImagePicked(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.taskForm.patchValue({image: file});
    this.taskForm.get('image').updateValueAndValidity();
    this.imageReader(file);
    console.log(file)
  }

  imageReader(file: File){
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result
    }
    reader.readAsDataURL(file);
  }

  onSaveTask() {

    // form validation
    if(!this.taskForm.valid) {
      return;
    }

    const task: Task = {
      _id: null,
      title: this.taskForm.value.title,
      description: this.taskForm.value.description,
      imagePath: this.taskForm.value.image,
      creator: null
    };
    if(this.mode === 'edit'){
      task._id = this.task._id;
      this.tasksService.updateTask(task);
    } else {
      this.tasksService.addTask(task, this.taskForm.value.image)
    }
    this.taskForm.reset(); // to reset the froms

  }

}
