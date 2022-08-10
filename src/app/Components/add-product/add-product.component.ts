import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ProductService } from '../../Services/product.service'
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private fb:FormBuilder, private ps:ProductService) { }
  @Output() addProductDetails = new EventEmitter();
  addForm: FormGroup;
  
  ngOnInit(): void {
    this.initilizeForm()
  }

  initilizeForm(){
    this.addForm = this.fb.group({
      productName:['', [Validators.required]],
      brand:[''],
      price:['', [Validators.required]],
      favorite:[true]
    })
  }
  addProduct(f){
    
    this.addProductDetails.emit(f.value)
    //this.ps.addProduct()
  }
}
