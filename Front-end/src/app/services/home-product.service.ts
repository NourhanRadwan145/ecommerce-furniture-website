import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeProductService {

  constructor(private readonly myClient: HttpClient) { }
  private readonly URL_API ="http://localhost:7000/api/products";

  GetAllProduct(){
    return this.myClient.get(this.URL_API);
  }

  getProductById(id: string){
    const url = `${this.URL_API}/${id}`;
    return this.myClient.get<any>(url);
  }

  getFourProducts() {
    return this.myClient.get<{ "All Products": any[] }>(this.URL_API).pipe(
      map(response => response["All Products"].slice(0, 4))
    );
  }
}
