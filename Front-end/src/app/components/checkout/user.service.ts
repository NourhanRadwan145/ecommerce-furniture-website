import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:7000/api/users/';

  constructor(private http: HttpClient) { }
  
  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(this.apiUrl + userId);
  }

  getCartByUserId(userId: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + userId + '/cart');
  }

  addProductToOrder(userId: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + userId + '/order', {});
  }

  addProductToCart(userId: string, productId: string, quantity: number): Observable<any> {
    const body = {
      user_id: userId,
      product: productId,
      quantity: quantity
    };
    return this.http.post<any>(`${this.apiUrl}${userId}/cart`, body);
  }
}