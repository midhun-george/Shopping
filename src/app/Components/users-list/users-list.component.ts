import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '../../Services/globals.service'
import { LoginService } from '../../Services/login.service'
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

interface user{
  id?:number;
  name:string;
  role:string;
  username:string;
  password:string;
}

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  constructor(private globals:GlobalsService, private login:LoginService, private fb:FormBuilder, private _snackBar: MatSnackBar,) { }
  users;
  addNewFlg:boolean=false;
  RegsistrationForm:FormGroup;
  ngOnInit(): void {
    
    this.getUsersList();
    this.initializeRegForm();
  }
  initializeRegForm(){
    this.RegsistrationForm = this.fb.group({
      name:['', Validators.required],
      username:['', Validators.required],
      password:['', Validators.required],
      role:['']
    })
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
    this.addNewFlg = true;
  }
  saveUserData(){
    var userData = this.RegsistrationForm.value;
    var roles={"1":"Admin", "2":"General User"};
    // userData = userData.map(function(val){
    //   return {
    //     "name":val.name,
    //     "username":val.username,
    //     "password":val.password,
    //     "role":roles[val.role],
    //     "roleID":val.role
    //   }
    // })
    userData["role"] = roles[userData["role"]];
    userData["roleID"] = userData["role"];
    var scope = this;
    this.login.addUser(userData)

    .subscribe({
      next:(res)=>{
        let snackBarRef = scope._snackBar.open("User registered successfully!", "",{
          duration:2000
        });
        scope.addNewFlg=false;
        scope.getUsersList();
      }
    })

  }
}
