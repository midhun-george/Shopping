import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '../../Services/globals.service'
import { LoginService } from '../../Services/login.service'
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private globals:GlobalsService, private login:LoginService, private snackbar:MatSnackBar,
  private fb:FormBuilder, private route:Router
  ) { }
  RegsistrationForm:FormGroup;
  users
  ngOnInit(): void {
    this.initializeRegForm();
  }
  initializeRegForm(){
    this.RegsistrationForm = this.fb.group({
      name:['', Validators.required],
      username:['', Validators.required],
      password:['', Validators.required],
      role:['2']
    })
    this.globals.showLoader = false;
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
  
  saveUserData(){
    var userData = this.RegsistrationForm.value;
    var roles={"1":"Admin", "2":"General User"};
    
    userData["role"] = roles["2"];
    userData["roleID"] = 2;
    var scope = this;
    this.login.addUser(userData)

    .subscribe({
      next:(res)=>{
        let snackBarRef = scope.snackbar.open("You have successfully registered!", "Go to Login",{
          duration:2000
        });
        snackBarRef.onAction().subscribe(() => {
          console.log('The snackbar action was triggered!');
          scope.getUsersList();
          scope.route.navigate(['/login']);
    
        });
        
      }
    })

  }

}
