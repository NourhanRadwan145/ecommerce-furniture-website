import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private API_URL = 'http://localhost:3000/orders';

  constructor(private http: HttpClient) {}

  getOrders() {
    return this.http.get(this.API_URL);
  }

  getOrderById(id: string) {
    return this.http.get(this.API_URL + `/${id}`);
  }

  createOrder(order: any) {
    return this.http.post(this.API_URL, order);
  }

  updateOrder(order: any) {
    return this.http.put(this.API_URL + `/${order.id}`, order);
  }

  deleteOrder(id: string) {
    return this.http.delete(this.API_URL + `/${id}`);
  }

  acceptOrder(order: any) {
    return this.http.put(this.API_URL + `/${order.id}`, order);
  }
}
