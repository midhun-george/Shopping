import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {UiService } from '../../Services/ui.service';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-add-tasks',
  templateUrl: './add-tasks.component.html',
  styleUrls: ['./add-tasks.component.css']
})
export class AddTasksComponent implements OnInit {

  @Output() addTaskDetails = new EventEmitter();
  constructor(
  ) {
    
   }
  subscription: Subscription;
  reminder:boolean=false;
  text:string='';
  day:string='';
  ngOnInit(): void {
   
  }

  //prepare object and emit addTaskDetails event with prepared object
  //pass data from child to parent
  addTask(f){
    
    let fVal = {}
    fVal["text"] = f.value.text;
    fVal["day"] = f.value.day;
    fVal["reminder"] = f.value.reminder;
    
    this.addTaskDetails.emit(fVal);

    this.text = '';
    this.day = '';
    this.reminder = false;
  }
}
