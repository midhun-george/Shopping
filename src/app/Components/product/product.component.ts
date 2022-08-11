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

  //get products for products menu
  getProducts(){
    this.ps.getProducts()
    .subscribe({
      next:(res)=>{
        this.products = res;
        if(this.products.length){
          this.productsEmpty = false;
        }
      },
      error:()=>{
        alert("Error occured!");
      }
    })
  }
  onDoubleClick(){

  }
  deleteProd(ind){
    this.openDialog("0","0", ind, "Are you sure to delete?")
  }
  //add a new product
  saveProduct(item){  
    this.products.push(item);
    this.ps.addProduct(item).subscribe({
      next:(res)=>{

      },
      error:()=>{
        alert("Error occured!")
      }
      
    })
  }
  
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, ind, message): void {
    this.message = message;
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '250px',
      data: {message: this.message, title:"Alert", nothanks:true, color:'red'},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      let scope = this;
      if(result){
          this.ps.deleteProduct(ind).subscribe(res=>{

            const dialogRef = this.dialog.open(ProductDialogComponent, {
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


//dialog Component

@Component({
  templateUrl: 'dialog.html',
})
export class ProductDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}