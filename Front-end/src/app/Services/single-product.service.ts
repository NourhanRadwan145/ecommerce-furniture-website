import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SingleProductService {

  constructor(private http:HttpClient) { }

  DB_Config = "http://localhost:7000/api/products/";
  DB_Config_order = "http://localhost:7000/api/orders";
  

  getProductById(id:number)
  {
      return this.http.get(this.DB_Config+id);
  }

  getAllProducts(){
    return this.http.get(this.DB_Config);
  }

  addReview(id:number,review:any)
  {
    return this.http.post(this.DB_Config+id+"/reviews",review);
  }

  getUserToken()
  {
    return this.http.get(this.DB_Config+"user/product/token", { withCredentials: true });
  }

  addProductToCart(user_id: number, product: number, quantity: number)
  {
    return this.http.post(`${this.DB_Config}product/addtocart`, { user_id, product, quantity })
  }

  getOrderById(id:any){
    return this.http.get(this.DB_Config_order+"/"+id);
  }

}
