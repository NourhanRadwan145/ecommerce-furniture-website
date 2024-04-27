import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private API_URL = 'http://localhost:3200/products';
  constructor(private http: HttpClient) {}
  getProducts() {
    return this.http.get(this.API_URL);
  }
  getProductById(id: string) {
    return this.http.get(this.API_URL + `/${id}`);
  }
  createProduct(product: any) {
    return this.http.post(this.API_URL, product);
  }
  updateProduct(product: any) {
    return this.http.put(this.API_URL + `/${product.id}`, product);
  }
  deleteProduct(id: string) {
    return this.http.delete(this.API_URL + `/${id}`);
  }
}
