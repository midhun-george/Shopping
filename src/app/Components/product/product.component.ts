import { Component, OnInit, Inject } from '@angular/core';
import {ProductService} from '../../Services/product.service'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormsModule, NgForm } from '@angular/forms'

import {UiService } from '../../Services/ui.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-products',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products;
  addFlag=false;
  deleteMessage=""
  productsEmpty:boolean = true;
  message:string = "";
  subscription:Subscription;
  constructor(private ps:ProductService, public dialog: MatDialog, private uiService:UiService) { }
  ngOnInit(): void {
    this.getProducts();

    this.subscription = this.uiService
    .getShowHideVal()
    .subscribe((value) => {
      
      console.log(value)
      this.addFlag = value["showHide"];
      })
  }

  getProducts(){
    debugger;
    this.ps.getProducts().subscribe(res=>{
      debugger;
      this.products = res;
      if(this.products.length){
        this.productsEmpty = false;
      }
    })
  }
  onDoubleClick(){

  }
  deleteProd(ind){
    this.openDialog("0","0", ind, "Are you sure to delete?")
  }
  saveProduct(item){  
    this.products.push(item);
    this.ps.addProduct(item).subscribe(res=>{
      debugger;
    })
      // this.taskService.addTask(t).subscribe(res=>{
      //   debugger;
      //   if(res){
      //     this.taskDetails.push(res);
      //   }
  
       
      // })
      // this.taskService.addTask(t.value).subscribe(res=>{
      //   this.taskDetails.push(t.value);
      // })
  }
  
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, ind, message): void {
    this.message = message;
    const dialogRef = this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      data: {message: this.message, title:"Alert", nothanks:true, color:'red'},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      let scope = this;
      if(result){
          this.ps.deleteProduct(ind).subscribe(res=>{

            const dialogRef = this.dialog.open(DialogAnimationsExampleDialog, {
              width: '250px',
              data: {message: "product deleted successfully", title:"Success", nothanks:false, color:'green'},
            });
          })

          debugger;
          var i = this.products.findIndex(function(val){
            return val.id===ind.id
          });

          this.products.splice(i,1);
        }
    });
  }
}

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'dialog.html',
})
export class DialogAnimationsExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<ProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}