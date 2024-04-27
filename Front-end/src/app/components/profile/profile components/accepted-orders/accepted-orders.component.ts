import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { OrderServiceService } from '../../../../Services/order-service.service';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';

@Component({
  selector: 'app-accepted-orders',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [OrderServiceService],
  templateUrl: './accepted-orders.component.html',
  styleUrls: ['./accepted-orders.component.css'] // Corrected to 'styleUrls'
})
export class AcceptedOrdersComponent implements OnInit {
  acceptedOrders: any[] = [];

  constructor(
    private orderService: OrderServiceService,
    private matDialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadAcceptedOrders();
  }

  loadAcceptedOrders() {
    const userId = '662c061826005f17952ca8f7';
    this.orderService.getAcceptedOrders(userId).subscribe({
      next: (orders) => {
        this.acceptedOrders = orders;
        console.log('Accepted Orders:', this.acceptedOrders);
      },
      error: (error) => console.error('Error fetching accepted orders', error)
    });
  }

  openDialog(orderId: string) {
    this.orderService.getOrderById(orderId).subscribe({
      next: (order) => {
        this.matDialog.open(OrderDialogComponent, {
          width: '1000px',
          data: { order }
        });
      },
      error: (error) => console.error('Error fetching order by ID', error)
    });
  }
}
