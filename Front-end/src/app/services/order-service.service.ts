import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  constructor(private readonly myClient: HttpClient) { }
  private readonly URL_API = "http://localhost:7000/api/orders";

  // Get orders by status and user ID
  getOrdersByStatusAndUserId(status: string, userId: string) {
    return this.myClient.get<any[]>(this.URL_API).pipe(
      map(orders => orders.filter(order => order.status === status && order.userId === userId))
    );
  }

  // methods for each status
  getPendingOrders(userId: string) {
    return this.getOrdersByStatusAndUserId('pending', userId);
  }

  getAcceptedOrders(userId: string) {
    return this.getOrdersByStatusAndUserId('accepted', userId);
  }

  getRejectedOrders(userId: string) {
    return this.getOrdersByStatusAndUserId('rejected', userId);
  }

  getOrderById(id: string) {
    const url = `${this.URL_API}/${id}`;
    return this.myClient.get<any>(url);
  }

  deleteOrderById(id: string) {
    const url = `${this.URL_API}/${id}`;
    return this.myClient.delete<any>(url);
  }
}
