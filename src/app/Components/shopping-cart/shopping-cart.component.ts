import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { GlobalsService } from '../../Services/globals.service'
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cartItmes=[];
  grandTotal:number=100
  constructor(private api: CartService, private globals:GlobalsService) { }

  ngOnInit(): void {
    this.api.getProducts()
    .subscribe(res=>{
      this.cartItmes = res;
      console.log(res);
      this.grandTotal = this.api.getTotalPrice();
    })
    
    this.globals.showLoader = false;
  }
  
  removeItem(item){
    this.api.removeCartItem(item);
    //this.grandTotal = this.api.getTotalPrice();
  }
  emptycart(){
    this.api.removeAllCart();
  }

}
