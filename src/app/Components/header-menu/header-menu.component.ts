import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import { AddProductDialogComponent } from '../../Components/add-product-dialog/add-product-dialog.component';
import { ProductService } from '../../Services/product.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { GlobalsService } from '../../Services/globals.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-headermenu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css']
})
export class HeadermenuComponent implements OnInit {
  page = "prod-tab";
  p=0;
  
  displayedColumns: string[] = ['productName', 'productCategory', 'selectedDate', 'freshness', 'price', 'comment', 'Actions'];
  dataSource: MatTableDataSource<any>;
  allProducts:any = [];
  selectedValue:string = 'table';
  showGridList=false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private api:ProductService, private router:Router, private globals:GlobalsService) { }

ngOnInit(){
  this.getAllProduct();
  this.globals.showLoader = false;
}

getAllProduct(){
  this.api.getProductsList()
  .subscribe({
    next:(res)=>{
      console.log(res);
      this.allProducts =  res;
      this.dataSource = new MatTableDataSource(res as {productName: string, productCategory: string,selectedDate: string, price: number,comment: string}[]);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  })
}
addProductDialog(): void {
  const dialogRef = this.dialog.open(AddProductDialogComponent, {
    width: '30%'
    //data: {name: this.name, animal: this.animal},
  }).afterClosed().subscribe(val=>{
    if(val){
      this.getAllProduct()
    }
  });
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
editProduct(r){
  this.dialog.open(AddProductDialogComponent,{
    width:'30%',
    data:r
  }).afterClosed().subscribe(value=>{
    debugger;
    if(value){
      this.getAllProduct()
    }
  })
}
deleteProduct(r){
  
  this.api.deleteProductList(r.id)
  .subscribe({
    next:(res)=>{
      alert("Deleted successfully!!");
      this.getAllProduct();
    },
    error:()=>{
      alert("Error occured!");
    }
  })
}
logout(){
  localStorage.removeItem("token");
  this.router.navigate(['/'])
}
listViewToggle(){
  this.p=0;
  this.showGridList=!this.showGridList;
}
subMenuExpanded(value) {
  var bannersubmenu = document.getElementById('bannersubmenu');
  bannersubmenu.style.zIndex = value
}
}
