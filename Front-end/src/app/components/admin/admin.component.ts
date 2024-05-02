import { Component } from '@angular/core';
import { TopCardsComponent } from './components/top-cards/top-cards.component';
import { FeedsComponent } from './components/feeds/feeds.component';
import { SalesSummaryComponent } from './components/sales-summary/sales-summary.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderService } from './Services/order.service';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    TopCardsComponent,
    FeedsComponent,
    SalesSummaryComponent,
    OrdersComponent,
    RouterModule,
  ],
  providers: [OrderService],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  constructor(private router: Router, private http: HttpClient) {}
  logout(): void {
    this.http
      .post(
        'http://localhost:7000/api/users/user/logout',
        {},
        { withCredentials: true }
      )
      .subscribe({
        complete: () => this.router.navigate(['/login']),
      });
  }
}
