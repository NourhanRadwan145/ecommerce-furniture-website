import { Component} from '@angular/core';
import { TopCardsComponent } from './components/top-cards/top-cards.component';
import { FeedsComponent } from './components/feeds/feeds.component';
import { SalesSummaryComponent } from './components/sales-summary/sales-summary.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderService } from './Services/order.service';
import { RouterModule } from '@angular/router';


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
export class AdminComponent{
  constructor() {}
}
