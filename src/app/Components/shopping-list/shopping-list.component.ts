import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { CartService } from '../../Services/cart.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { GlobalsService } from '../../Services/globals.service'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  products;
  public filterCategory : any;
  filterVal="";
  searchTerm:string='';
  constructor(private api:ProductService, private cart:CartService,
    private snackbar:MatSnackBar, private globals:GlobalsService
  
  ) { }

  ngOnInit(): void {
    this.getAllProduct();
    this.cart.search.subscribe(res=>{
      this.searchTerm = res;
      
    })
  }

  getAllProduct(){
    this.api.getProduct().subscribe(res=>{
      this.products = res;
      this.filterCategory = res;
      this.products.forEach((a:any) => {
        if(a.category ==="women's clothing" || a.category ==="men's clothing"){
          a.category ="fashion"
        }
        Object.assign(a,{quantity:1,total:a.price});
        this.globals.showLoader = false;
      });
      console.log(this.products)
    })
   
  }
  addtocart(item){
    this.cart.addtoCart(item);
    this.openSnackBar();
  }
  openSnackBar() {
    // this.snackbar.openFromComponent(AddedCartComponent, {

    //   duration: 2000,
    // });
    this.snackbar.open('Item added to cart!', '', {
      panelClass: 'my-custom-snackbar',
      duration:2000
    });
    
  }

  filter(category){
    
    this.filterCategory = this.products
    .filter((a:any)=>{
      if(a.category == category || category==''){
        return a;
      }
    })
  }
}

@Component({
  selector: 'added-cart',
  templateUrl: 'added-cart.html',
  styles: [
    `
    .added-cart {
      color: green;
    }
  `,
  ],
})
export class AddedCartComponent {}