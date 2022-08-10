import { Component, OnInit, Input } from '@angular/core';
import {UiService } from '../../Services/ui.service';
import {Subscription} from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() tab:string;
  subscription:Subscription;
  addFlag;

  constructor(private uiService:UiService, private route:Router) { }
  title = "Test Tracker"
  ngOnInit(): void {
    console.log(this.tab);
    this.subscription = this.uiService
    .getShowHideVal()
    .subscribe((value) => (this.addFlag = value));
  }

  homeFlag(){
    
    return this.route.url == "/header";
  }
}
