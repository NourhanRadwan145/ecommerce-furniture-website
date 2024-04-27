import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { OrderService } from '../../Services/order.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-feeds',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './feeds.component.html',
  styleUrl: './feeds.component.css',
  providers: [OrderService],
})
export class FeedsComponent implements OnInit, OnChanges {
  feeds: any;
  orders: any;
  rejected = 0;
  @Input() pending = 0;
  @Input() accepted = 0;
  order_no = 0;

  constructor(private myorderService: OrderService) {}
  ngOnInit() {
    this.myorderService.getOrders().subscribe(
      (data) => {
        this.orders = data;
        this.accepted = this.orders.filter(
          (item: any) => item.state === 'accepted'
        ).length;
        this.rejected = this.orders.filter(
          (item: any) => item.state === 'rejected'
        ).length;
        this.pending = this.orders.filter(
          (item: any) => item.state === 'pending'
        ).length;
        this.feeds = [
          {
            class: 'bg-info',
            icon: 'bi bi-bell',
            task: 'You have ' + this.pending + ' pending orders.',
            time: 'Just Now',
          },
          {
            class: 'bg-success',
            icon: 'bi bi-hdd',
            task: 'Total Orders ' + this.order_no + ' orders',
            time: '2 Hours ago',
          },
          {
            class: 'bg-warning',
            icon: 'bi bi-bag-check',
            task: this.accepted + ' order accepted.',
            time: '31 May',
          },
          {
            class: 'bg-danger',
            icon: 'bi bi-person',
            task: 'New user registered.',
            time: '30 May',
          },
          {
            class: 'bg-primary',
            icon: 'bi bi-person',
            task: 'Total Users Number.',
            time: '21 May',
          },
        ];
      },
      (error) => {
        console.log(error);
      }
    );
    this.myorderService.pendingCounter(this.orders);
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.myorderService.getOrders().subscribe(
      (data) => {
        this.orders = data;
        for (let order of this.orders) {
          if (order.state == 'accepted') {
            this.accepted += 1;
            this.order_no += 1;
          } else if (order.state == 'rejected') {
            this.rejected += 1;
            this.order_no += 1;
          } else if (order.state == 'pending') {
            // this.pending += 1;
            this.order_no += 1;
          } else if (order.state == 'delivered') {
            // Handle delivered orders if needed
          }
        }
        this.feeds = [
          {
            class: 'bg-info',
            icon: 'bi bi-bell',
            task: 'You have ' + this.pending + ' pending orders.',
            time: 'Just Now',
          },
          {
            class: 'bg-success',
            icon: 'bi bi-hdd',
            task: 'Total Orders ' + this.order_no + ' orders',
            time: '2 Hours ago',
          },
          {
            class: 'bg-warning',
            icon: 'bi bi-bag-check',
            task: 'New order received.',
            time: '31 May',
          },
          {
            class: 'bg-danger',
            icon: 'bi bi-person',
            task: 'New user registered.',
            time: '30 May',
          },
          {
            class: 'bg-primary',
            icon: 'bi bi-person',
            task: 'Total Users Number.',
            time: '21 May',
          },
        ];
      },
      (error) => {
        console.log(error);
      }
    );
    console.log('Changes', changes);
  }
}
