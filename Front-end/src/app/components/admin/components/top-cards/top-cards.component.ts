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
  orders: any;
  totalSales = 0;
  rejected = 0;
  accepted = 0;
  pending = 0;
  weekly: any;
  weeklyOrders: any;
  daily: any;
  dailyOrders: any;
  topcards: any;
  dailySales: any;
  totalDailySales = 0;
  constructor(private myorderService: OrderService) {}

  ngOnInit() {
    this.myorderService.weeklyOrders().subscribe(
      (data) => {
        this.weekly = data;
        this.weeklyOrders = this.weekly[0].totalOrders;
      },
      (error) => {
        console.log(error);
      }
    );

    this.myorderService.dailyOrders().subscribe(
      (data) => {
        if (data) {
          this.daily = data;
          if (this.daily[0] === undefined) {
            this.dailyOrders = 0;
          }
        }
        // this.daily = data;
        // this.dailyOrders = this.daily[0].totalOrders;
      },
      (error) => {
        console.log(error);
      }
    );

    this.myorderService.weeklySales().subscribe(
      (data) => {
        this.weekly = data;
        this.totalSales = this.weekly[0].totalSales;
      },
      (error) => {
        console.log(error);
      }
    );

    this.myorderService.dailySales().subscribe(
      (data) => {
        this.dailySales = data;
        if (this.dailySales[0] === undefined) {
          this.totalDailySales = 0;
        } else {
          this.dailySales = data;
          this.totalDailySales = this.dailySales[0].totalSales;
        }
      },
      (error) => {
        console.log(error);
      }
    );

    this.topcards = [
      {
        bgcolor: 'success',
        icon: 'bi bi-wallet',
        title: this.totalSales,
        subtitle: 'Weekly Sales',
      },
      {
        bgcolor: 'danger',
        icon: 'bi bi-coin',
        title: this.dailyOrders,
        subtitle: 'Daily Sales',
      },
      {
        bgcolor: 'warning',
        icon: 'bi bi-basket3',
        title: this.weeklyOrders,
        subtitle: 'Weekly Orders',
      },
      {
        bgcolor: 'info',
        icon: 'bi bi-bag',
        title: '210',
        subtitle: 'Daily Orders',
      },
    ];
  }
}
