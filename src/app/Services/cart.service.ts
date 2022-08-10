import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItemList : any =[]
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor() { }
  getProducts(){
    return this.productList.asObservable();
  }

  setProduct(product : any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }
  addtoCart(product : any){
    debugger;
    let itemInd=-1;
    if(this.cartItemList.length){
      itemInd =  this.cartItemList.findIndex(function(val){
        return val.id==product.id
  })
  if(itemInd>-1){
    this.cartItemList[itemInd]["quantity"]+=1;
    this.cartItemList[itemInd]["total"] = this.cartItemList[itemInd]["quantity"]* this.cartItemList[itemInd]["price"]
  }
  else{
    this.cartItemList.push(product);
  }
}else{
  this.cartItemList.push(product);
}
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList)
  }
  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.total;
    })
    return grandTotal;
  }
  removeCartItem(product: any){
    debugger;
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id=== a.id){
        if(this.cartItemList[index].quantity>1){
          this.cartItemList[index].quantity-=1;
          this.cartItemList[index].total = this.cartItemList[index].total - this.cartItemList[index].price;
        }else{
          this.cartItemList.splice(index,1);
        }
        
      }
      this.getTotalPrice();
    })
    this.productList.next(this.cartItemList);
  }
  removeAllCart(){
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }
}
