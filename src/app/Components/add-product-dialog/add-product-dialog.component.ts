import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService} from '../../Services/product.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.css']
})
export class AddProductDialogComponent implements OnInit {
freshnessList = ["Brand New", "Second Hand", "Refurbished"];
ProductForm:FormGroup;
buttonTxt="Save";
  constructor(private fb:FormBuilder, private api:ProductService,
  @Inject(MAT_DIALOG_DATA) public editData:any,
  private dialogRef:MatDialogRef<AddProductDialogComponent>
  ) { }

  ngOnInit(): void {
    this.ProductForm = this.fb.group({
      productName:['', Validators.required],
      productCategory:['', Validators.required],
      selectedDate:['', Validators.required],
      freshness:[Validators.required],
      price:['', Validators.required],
      comment:[''],
    })

    console.log(this.editData);
    if(this.editData){
      this.ProductForm.controls['productName'].setValue(this.editData.productName);
      this.ProductForm.controls['productCategory'].setValue(this.editData.productCategory);
      this.ProductForm.controls['selectedDate'].setValue(this.editData.selectedDate);
      this.ProductForm.controls['freshness'].setValue(this.editData.freshness);
      this.ProductForm.controls['price'].setValue(this.editData.price);
      this.ProductForm.controls['comment'].setValue(this.editData.comment);
      this.buttonTxt = "Update";
    }
  }
  saveData(){
    if(!this.editData){
    this.api.addProductsList(this.ProductForm.value)
    .subscribe({
      next:(res)=>{
        this.ProductForm.reset();
        this.dialogRef.close('save');
      },
      error:()=>{
        alert("Error occured");
      }
    })
  }else{
    this.updateData();
  }
  }

  updateData(){
    this.api.putProductList(this.ProductForm.value, this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("success!!");
        this.ProductForm.reset;
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Error!!");
      }
    })
  }


}
