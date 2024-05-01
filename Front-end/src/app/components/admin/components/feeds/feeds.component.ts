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
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-feeds',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './feeds.component.html',
  styleUrl: './feeds.component.css',
  providers: [OrderService, UserService],
})
export class FeedsComponent implements OnInit {
  feeds: any;
  orders: any;
  rejected = 0;
  @Input() pending = 0;
  @Input() accepted = 0;
  order_no = 0;
  users: any;

  constructor(
    private myorderService: OrderService,
    private userService: UserService
  ) {}
  ngOnInit() {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.log(error);
      }
    );
    this.myorderService.getOrders().subscribe(
      (data) => {
        this.orders = data;
        this.accepted = this.orders.filter(
          (item: any) => item.status === 'accepted'
        ).length;
        this.rejected = this.orders.filter(
          (item: any) => item.status === 'rejected'
        ).length;
        this.pending = this.orders.filter(
          (item: any) => item.status === 'pending'
        ).length;
        this.order_no = this.orders.length;
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
            task: this.rejected + ' rejected orders.',
            time: '30 May',
          },
          {
            class: 'bg-primary',
            icon: 'bi bi-person',
            task: 'Total Users Number ' + this.users.length,
            time: '21 May',
          },
        ];
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
