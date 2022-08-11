import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../Services/task.service'; 
import {Task } from '../../Task';
import {UiService } from '../../Services/ui.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  
})
export class TaskListComponent implements OnInit {

  constructor(private taskService:TaskService, private uiService:UiService) { }
  taskDetails:Task[]=[];
  addFlag
  subscription:Subscription;
  ngOnInit(): void {
  this.taskService.getTasks().subscribe(data=>{
    this.taskDetails = data;
  })

  this.subscription = this.uiService
  .getShowHideVal()
  .subscribe((value) => {
    
    console.log(value)
    this.addFlag = value["showHide"];
    })
  }
  toggeleReminder(t){
    console.log(t);
    t.reminder = !t.reminder;

    this.taskService.updateReminder(t).subscribe(res=>{
      
    })
  }
  deleteTask(t){
    var ind = this.taskDetails.findIndex(function(val){
      return val.id === t.id;
    })

    console.log(ind);
    this.taskDetails.splice(ind,1);
    this.taskService.deleteTask(t).subscribe(res=>{
      
    })
  }
  //add a new task to the taskslist
  saveTask(t:Task){
    
    this.taskService.addTask(t).subscribe(res=>{
      
      if(res){
        this.taskDetails.push(res);
      }

     
    })
    // this.taskService.addTask(t.value).subscribe(res=>{
    //   this.taskDetails.push(t.value);
    // })
  }

}
