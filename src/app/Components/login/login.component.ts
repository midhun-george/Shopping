import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms'
import { DialogComponent } from '../../Components/dialog/dialog.component';
import { Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GlobalsService } from '../../Services/globals.service'

import { LoginService } from '../../Services/login.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Password:string;
  Username;
  users;
  
  constructor(private logService:LoginService, private route:Router, private dialog:MatDialog, private globals:GlobalsService) { }

  ngOnInit(): void {
    this.globals.showLoader = false;
  }

  //check authentication of the user
  validateAndMove(f){
    this.globals.showLoader = true;
    this.logService.getUsers().subscribe(res=>{
      
      this.users = res;
      let scope = this;
      res.find(function(val){
        if(val.username == scope.Username){
          if(val.password == scope.Password){
            //login success
            localStorage.setItem("token", JSON.stringify(val))
            scope.globals.showLoader = false;
            scope.route.navigate(['/header']);
          }
          else{
            scope.errorMessage()
            scope.globals.showLoader = false;
          }
        }
      })
    })
  }
  showMe(){}
  //show error message
  errorMessage(){
    const confirmDialog = this.dialog.open(DialogComponent, {
      data: {
        title: 'Error',
        message: 'Username or Password is incorrect. Please try again later.'
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      
      if (result === true) {
        
        //this.employeeList = this.employeeList.filter(item => item.employeeId !== employeeObj.employeeId);
      }
    });
  }
  testUser(){
    this.logService.addUser()
    .subscribe({
      next:(res)=>{
        console.log(res);
      }
    })
  }
}
