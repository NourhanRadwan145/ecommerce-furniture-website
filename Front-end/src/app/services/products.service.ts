import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(public http: HttpClient) { }

  URL_DB = 'http://localhost:3000/Products';

  getProducts() {
    return this.http.get(this.URL_DB);
  }
  getProductById(id:any) {
    return this.http.get(`${this.URL_DB}/${id}`);
  }

}
