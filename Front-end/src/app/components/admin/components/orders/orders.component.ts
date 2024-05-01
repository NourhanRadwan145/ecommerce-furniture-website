import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { OrderService } from '../../Services/order.service';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatIconModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
  providers: [OrderService],
})
export class OrdersComponent implements OnInit {
  orders: any;
  image = 'assets/images/users/user1.jpg';
  dateFormat: any;
  constructor(private myorderService: OrderService) {}

  getOrderDateDifference(date: any): number {
    const orderDate: number = new Date(date).getTime();
    const currentDate: number = new Date().getTime();
    const timeDifference: number = currentDate - orderDate;
    const daysDifference: number = Math.floor(
      timeDifference / (1000 * 60 * 60 * 24)
    );
    return daysDifference;
  }

  ngOnInit() {
    this.myorderService.getOrders().subscribe(
      (data) => {
        console.log(data);
        this.orders = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  accepted(orderID: number) {
    let order = this.orders.find(
      (order: { _id: any }) => order._id === orderID
    );
    order.status = 'accepted';
    this.myorderService.updateOrder(order).subscribe(
      (data: any) => {
        console.log(data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  rejected(orderID: number) {
    let order = this.orders.find(
      (order: { _id: any }) => order._id === orderID
    );
    order.status = 'rejected';
    this.myorderService.updateOrder(order).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  pending(orderID: number) {
    let order = this.orders.find(
      (order: { _id: any }) => order._id === orderID
    );
    order.status = 'pending';
    this.myorderService.updateOrder(order).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
