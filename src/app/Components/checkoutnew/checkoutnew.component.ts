import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '../../Services/globals.service'
import { LoginService } from '../../Services/login.service'
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkoutnew',
  templateUrl: './checkoutnew.component.html',
  styleUrls: ['./checkoutnew.component.css']
})
export class CheckoutnewComponent implements OnInit {

  deliverTypeList = [{"name":"Standard", "type":"Free"}, {"name":"Express", "type":"CAD 40:00"}];
  constructor(private globals:GlobalsService, private login:LoginService, private snackbar:MatSnackBar,
    private fb:FormBuilder, private route:Router
    ) { }
    CheckoutForm:FormGroup;
  ngOnInit(): void {
    this.globals.showLoader=false;
    this.initiateForm();
  }

  initiateForm(){
    this.CheckoutForm = this.fb.group({
      
    })
  }
}
