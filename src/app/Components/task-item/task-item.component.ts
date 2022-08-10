import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input() task
  @Output() reminderToggle = new EventEmitter();
  @Output() deleteTaskDetails = new EventEmitter();
  constructor() { }

  ngOnInit(): void {

  }
  deleteTask(){
    
    this.deleteTaskDetails.emit(this.task)
  }

  onDoubleClick(){
    this.reminderToggle.emit(this.task)
  }

}
