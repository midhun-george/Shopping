import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '../../Services/globals.service'
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  constructor(public globals:GlobalsService) { }

  ngOnInit(): void {
  }

}
