import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from '../product';
import { map } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  url='http://localhost:5001/products';
  producturl = 'http://localhost:5001/productsList';
  getProducts():Observable<any>{
    return this.http.get(this.url);
  }
  addProduct(product:Products): Observable<Products> {
    return this.http.post<Products>(this.url, product, httpOptions);
  }
  deleteProduct(product:Products):Observable<Products>{
    const url = `${this.url}/${product.id}`;
    return this.http.delete<Products>(url);
  }

  getProductsList(){
    return this.http.get(this.producturl);
  }
  addProductsList(product): Observable<Products> {
    return this.http.post<any>(this.producturl, product, httpOptions);
  }
  putProductList(data:any, id: number){
    return this.http.put<any>(this.producturl+"/"+id, data)
  }
  deleteProductList(id:number){
    return this.http.delete<any>(this.producturl+"/"+id)
  }

  getProduct(){
    return this.http.get<any>("https://fakestoreapi.com/products")
  }
}

