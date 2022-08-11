import { Component, OnInit } from '@angular/core';
import {GlobalsService  } from '../../Services/globals.service';
import { CartService } from  '../../Services/cart.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
interface users {
  name: string;
  password: string;
  username: string;
  roleID:number;
  role:string
  }
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit {
  addressForm:FormGroup;
  myAddress = 1;
  addressType="home";
  userData:users;
  addNewAddress:boolean = false;
  upiChecked:boolean = false;
  phonePe:boolean = false;
  myUPI:boolean = false;
  addressTypeList=[{type:"Home", label:"Home (All day delivery)"},{type:"Work", label:"Work (Delivery between 10 AM - 5 PM)"} ]
  address=[{"id":1,"Name":"Midhun George", "type":"Home", "Mobile":"9544476777","Pin":670633, "Locality":"Payyavoor", "City":"Kannur","Landmark":"", "Address":"Nagathinkal(h), Payyavoor(po), Kannur, Kerala, 670633", "primary":true},
  {"id":2,"Name":"Divya Devasia", "type":"Home", "Mobile":"7406867647", "Pin":670632, "Locality":"Chemperi", "City":"Kannur","Landmark":"", "Address":"Muthukulathil(h), Chemperi(po), Kannur, Kerala, 670632", "primary":false},
  {"id":3,"Name":"Divya Devasia", "type":"Home", "Mobile":"7406867647","Pin":560037, "Locality":"Doddanakundi", "City":"Bangalore","Landmark":"Post Office", "Address":"#25/26, Aprameya, Nisarga Layout, Doddanakundi", "primary":false}]
  orders=[];
  step:number=2;
  total:number=0;
  discount:number=0;
  totalCost:number=0;
  deliveryCharge:string = "Free";
  properties =["Finish Color - BLACK, DIY(Do-It-Yourself)"]

  savedCards = [{"id":1, selected:false,"image":"https://img1a.flixcart.com/www/linchpin/fk-cp-pay/axis-78501b36.svg", "BankName":"Axis Bank Credit Card", "cardNumber":"xxxx xxxx xxx 6329"},
  {"id":2, selected:false, "image":"data:image/png;base64,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", "BankName":"HDFC Bank Credit Card", "cardNumber":"xxxx xxxx xxx 3764"}
]

  constructor(private globals:GlobalsService, private cart:CartService, private fb:FormBuilder, private _snackBar: MatSnackBar, private route : Router) { }

  ngOnInit(): void {
    this.globals.showLoader = false;
    this.userData = JSON.parse(localStorage.getItem('token'))
    this.orders = [{"id":3,"title":"Mens Cotton Jacket","actualPrice":100,"price":55.99,"description":"great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.","category":"fashion","image":"https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg","rating":{"rate":4.7,"count":500},"quantity":1,"total":55.99},{"id":2,"title":"Mens Casual Premium Slim Fit T-Shirts ","actualPrice":30,"price":22.3,"description":"Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.","category":"fashion","image":"https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg","rating":{"rate":4.1,"count":259},"quantity":1,"total":22.3},{"id":1,"title":"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops","actualPrice":220,"price":109.95,"description":"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday","category":"fashion","image":"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg","rating":{"rate":3.9,"count":120},"quantity":1,"total":109.95}];
    for(var i=0; i<this.orders.length; i++){
      this.orders[i]["profit"] = this.getHTML(this.orders[i]);
      this.orders[i]["deliveryDate"] = this.randomDate(); 
    }
    this.calculateAmount();
    this.initializeAddressForm();
    
  }
  //Update change cards details
  selectedOption(j){
    
    for(let i=0; i<this.savedCards.length; i++){
      if(i==j){
        this.savedCards[i]["selected"] = true;
      }else{
        this.savedCards[i]["selected"] = false;
      }
    }
  }
  //To calculate the amount
  calculateAmount(){
    this.total = this.orders.reduce(function(a,b){
      
      return Number(a)+Number(b["actualPrice"])
    },0)

    this.discount = this.orders.reduce(function(a,b){
      debugger;
      return Number(a)+Number(b["actualPrice"] - b["price"])
    },0)
    
    this.totalCost = this.total - this.discount;
  }
  //to make address primary
  makePrimary(j){
    for(let i=0; i<this.address.length; i++){
      
      if(i==j){
        this.myAddress = this.address[i]["id"];
        this.address[i]["primary"]=true;
      }else{
        this.address[i]["primary"]=false;
      }
    }

    console.log(this.myAddress);
    
  }

  //show order section
  order(){
    this.step = 3;
    // this.cart.getProducts().subscribe(res=>{
    //   console.log(res)
    //   //this.orders = [{"id":3,"title":"Mens Cotton Jacket","actualPrice":100,"price":55.99,"description":"great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.","category":"fashion","image":"https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg","rating":{"rate":4.7,"count":500},"quantity":1,"total":55.99},{"id":2,"title":"Mens Casual Premium Slim Fit T-Shirts ","actualPrice":30,"price":22.3,"description":"Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.","category":"fashion","image":"https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg","rating":{"rate":4.1,"count":259},"quantity":1,"total":22.3},{"id":1,"title":"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops","actualPrice":220,"price":109.95,"description":"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday","category":"fashion","image":"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg","rating":{"rate":3.9,"count":120},"quantity":1,"total":109.95}];
    // })
  }
  getHTML(o){

    var actualPrice = o.actualPrice;
    var sellingPrice = o.price;
    var discount = actualPrice - sellingPrice;
    var profit = (discount/actualPrice)*100;
    profit = Math.round(profit * 100) / 100;
    var offers = Math.floor(Math.random() * 10) + 1;
    return profit +' % Off '+offers +' offer(s) applied';

  }
  //To display a random date
  randomDate() {
    var start = new Date();
    var end = new Date(2022, 10,1);
    return 'Delivered by'+ new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
  placeOrder(){
    this.step = 4;
  }
  initializeAddressForm(){
    this.addressForm = this.fb.group({
      Name:['', Validators.required],
      Mobile:['', Validators.required],
      Pin:['', Validators.required],
      Locality:['', Validators.required],
      Address:['', Validators.required],
      City:['', Validators.required],
      type:['home', Validators.required],
      Landmark:[''],
      
    })
  }
  saveAddressData(){
    console.log(this.addressForm.value);
    this.address.push(this.addressForm.value)
  }

  addEditAddress(v){
    this.addNewAddress=true;
    console.log(v);
    if(v){
      this.addressForm.controls['Name'].setValue(v.Name);
      this.addressForm.controls['Address'].setValue(v.Address);
      this.addressForm.controls['City'].setValue(v.City);
      this.addressForm.controls['Landmark'].setValue(v.Landmark);
      this.addressForm.controls['Locality'].setValue(v.Locality);
      this.addressForm.controls['Mobile'].setValue(v.Mobile);
      this.addressForm.controls['Pin'].setValue(v.Pin);
      this.addressForm.controls['type'].setValue(v.type);
      
    }
  }

  complete(){
    this.globals.showLoader = true;
    let scope = this;
  setTimeout(function(){
    scope.globals.showLoader = false;
    let snackBarRef = scope._snackBar.open("Order placed successfully", "Shop More");
    snackBarRef.onAction().subscribe(() => {
      console.log('The snackbar action was triggered!');
      
      scope.route.navigate(['/shopping']);

    });

  },2000)
    
  }
}
