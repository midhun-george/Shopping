import { Component, OnInit, Input } from '@angular/core';
import {UiService } from '../../Services/ui.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() color:string;
  @Input() text:string;
  @Input() tab:string;
  showHide:boolean=false;
  constructor(private uiService:UiService) { }

  ngOnInit(): void {
    console.log(this.color);
  }
  //Check and decide to show/hide add details form
  showOrHide(){
    
    this.showHide = !this.showHide;
    let data = {tab:this.tab, showHide:this.showHide}
    this.uiService.showHideAdd(data);
  }

}
