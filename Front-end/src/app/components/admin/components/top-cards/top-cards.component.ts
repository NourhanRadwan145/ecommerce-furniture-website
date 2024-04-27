import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../Services/order.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-top-cards',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [OrderService],
  templateUrl: './top-cards.component.html',
  styleUrl: './top-cards.component.css',
})
export class TopCardsComponent implements OnInit {
  // bgcolor: any;
  // icon: string = '';
  // title: string = '';
  // subtitle: string = '';
  // topcards: any;
  orders: any;
  totalSales = 0;
  rejected = 0;
  accepted = 0;
  pending = 0;
  constructor(private myorderService: OrderService) {}
  ngOnInit() {
    this.myorderService.getOrders().subscribe(
      (data) => {
        this.orders = data;
        for (let order of this.orders) {
          // Added type annotation 'let'
          this.totalSales += order.total_price;
          if (order.state == 'Accepted') {
            this.accepted += 1;
          } else if (order.state == 'Rejected') {
            this.rejected += 1;
          } else if (order.state == 'Pending') {
            this.pending += 1;
          } else if (order.state == 'Delivered') {
            this.topcards[3].title = order.total_price;
          }
        }
        this.totalSales = parseFloat(this.totalSales.toFixed(2));
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // this.myorderService.getOrders().subscribe(
  //     (data) => {
  //       this.orders = data;
  //       for (let order of this.orders) {
  //         // Added type annotation 'let'
  //         this.totalSales += order.total;
  //       }
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );

  topcards = [
    {
      bgcolor: 'success',
      icon: 'bi bi-wallet',
      title: '$21k',
      subtitle: 'Weekly Sales',
    },
    {
      bgcolor: 'danger',
      icon: 'bi bi-coin',
      title: '$1k',
      subtitle: 'Daily Sales',
    },
    {
      bgcolor: 'warning',
      icon: 'bi bi-basket3',
      title: '456',
      subtitle: 'weekly Orders',
    },
    {
      bgcolor: 'info',
      icon: 'bi bi-bag',
      title: '210',
      subtitle: 'Daily Orders',
    },
  ];
}
