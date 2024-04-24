import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../Services/order.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
  providers: [OrderService],
})
export class OrdersComponent implements OnInit {
  orders: any;
  image = 'assets/images/users/user1.jpg';
  constructor(private myorderService: OrderService) {}

  ngOnInit() {
    this.myorderService.getOrders().subscribe(
      (data) => {
        this.orders = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  accepted(orderID: number) {
    let order = this.orders.find((order: { id: any }) => order.id === orderID);
    order.state = 'accepted';
    this.myorderService.acceptOrder(order).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  rejected(orderID: number) {
    let order = this.orders.find((order: { id: any }) => order.id === orderID);
    order.state = 'rejected';
    this.myorderService.acceptOrder(order).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
