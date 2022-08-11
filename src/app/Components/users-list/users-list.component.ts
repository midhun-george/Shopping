import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '../../Services/globals.service'
import { LoginService } from '../../Services/login.service'
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  constructor(private globals:GlobalsService, private login:LoginService) { }
  users;
  ngOnInit(): void {
    
    this.getUsersList()
  }

  getUsersList(){
    this.login.getUsers().subscribe({
      next:(res)=>{
      this.users = res;
      let scope = this;
      },error:()=>{
        alert("Error occured!");
      }
    })
    this.globals.showLoader=false;
  }
  addNew(){
    
  }
}
