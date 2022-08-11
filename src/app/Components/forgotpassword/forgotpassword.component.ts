import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '../../Services/globals.service'
import { LoginService } from '../../Services/login.service'
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  RegsistrationForm:FormGroup;
  users
  ngOnInit(): void {
    this.initializeRegForm();
  }
  constructor(private globals:GlobalsService, private login:LoginService, private snackbar:MatSnackBar,
    private fb:FormBuilder, private route:Router
  ){}
  initializeRegForm(){
    this.RegsistrationForm = this.fb.group({
      name:['', Validators.required],
      username:['', Validators.required],    
    })
    this.globals.showLoader = false;
  }

}
