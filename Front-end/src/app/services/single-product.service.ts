import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SingleProductService {

  constructor(private http:HttpClient) { }

  DB_Config = "http://localhost:7000/api/products/";

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

}
