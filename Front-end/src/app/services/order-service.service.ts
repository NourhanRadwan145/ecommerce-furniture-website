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
    return this.getOrdersByStatusAndUserId('Pending', userId);
  }

  getAcceptedOrders(userId: string) {
    return this.getOrdersByStatusAndUserId('Accepted', userId);
  }

  getRejectedOrders(userId: string) {
    return this.getOrdersByStatusAndUserId('Rejected', userId);
  }

  getOrderById(id: string) {
    const url = `${this.URL_API}/${id}`;
    return this.myClient.get<any>(url);
  }

  deleteOrderById(id: string) {
    const url = `${this.URL_API}/${id}`;
    return this.myClient.delete<any>(url);
  }

  updateOrder(id: string, OrderData: any){
    const url = `${this.URL_API}/${id}`;
    console.log(OrderData);
    return this.myClient.put(url, OrderData);
  }

  // updateOrdersByUserId(userId: string, updateData: any) {
  //   const url = `${this.URL_API}/user/${userId}`;
  //   return this.myClient.put(url, updateData);
  // }

  updateOrdersByUserId(userId: string, orderId: string, orderData: any) {
    const url = `${this.URL_API}/users/${userId}/orders/${orderId}`;
    console.log(orderData);
    return this.myClient.put(url, orderData);
  }
}


