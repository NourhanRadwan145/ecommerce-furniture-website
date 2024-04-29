import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  private readonly URL_DB = 'http://localhost:7000/api/users';

  getUsers() {
    return this.http.get(this.URL_DB);
  }

  getUserById(id: any) {
    return this.http.get(`${this.URL_DB}/${id}`);
  }
  increaseProductQuantity(userid: any, productid: any) {
    return this.http.put(`${this.URL_DB}/cart/increase`, { userid, productid });
  }
  decreaseProductQuantity(userid: any, productid: any) {
    return this.http.put(`${this.URL_DB}/cart/decrease`, { userid, productid });
  }
  removeProductFromCart(userid: string, productid: string) {
    return this.http.delete(`${this.URL_DB}/cart/remove`, { body: { userid, productid } });
  }
}
