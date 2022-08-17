import { Component, OnInit } from '@angular/core';
import {GlobalsService  } from '../../Services/globals.service';
@Component({
  selector: 'app-alterblogs',
  templateUrl: './alterblogs.component.html',
  styleUrls: ['./alterblogs.component.css']
})
export class AlterblogsComponent implements OnInit {

  constructor(private gs:GlobalsService) { }

  ngOnInit(): void {
    //this.gs.showLoader = false;
  }

}
