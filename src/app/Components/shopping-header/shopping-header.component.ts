import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CartService } from '../../Services/cart.service';
@Component({
  selector: 'app-shopping-header',
  templateUrl: './shopping-header.component.html',
  styleUrls: ['./shopping-header.component.css']
})
export class ShoppingHeaderComponent implements OnInit {
  @Output() filterVal = new EventEmitter();
  
  searchTerm:string="";
  totalItem:number=0;

  constructor(private cart:CartService) { }

  ngOnInit(): void {
    this.getCartCount();
  }

  getCartCount(){
    this.cart.getProducts()
    .subscribe(res=>{
      this.totalItem = res.length;
    })
  }
  search(ev){
    console.log(ev)
    this.cart.search.next(this.searchTerm);
  }
  signin(){

  }
  becomeapartner(){


  }
  filter(v){
    
    this.filterVal.emit(v)
  }
  subMenuExpanded(value) {
    var bannersubmenu = document.getElementById('bannersubmenu');
    bannersubmenu.style.zIndex = value
  }
  signOut(){

  }

  
}
