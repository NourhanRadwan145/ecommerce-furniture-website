import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { OrderServiceService } from '../../../../Services/order-service.service';
//import { HomeProductService } from '../../../../Services/home-product.service';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';
import { HomeProductService } from '../../../../Services/home-product.service';

@Component({
  selector: 'app-pending-orders',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [OrderServiceService, HomeProductService],
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.css'] // Corrected to 'styleUrls'
})
export class PendingOrdersComponent implements OnInit {
  pendingOrders: any[] = [];

  constructor(
    private orderService: OrderServiceService,
    private matDialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadPendingOrders();
  }

  loadPendingOrders() {
    const userId ="662c061826005f17952ca8f7"; // Replace with actual logic to obtain user ID
    this.orderService.getPendingOrders(userId).subscribe({
      next: (orders) => {
        this.pendingOrders = orders;
        console.log('Pending Orders:', this.pendingOrders);
      },
      error: (error) => console.error('Error fetching pending orders', error)
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
      error: (error) => console.error('Error fetching order by id', error)
    });
  }

  deleteOrder(orderId: string) {
    this.orderService.deleteOrderById(orderId).subscribe({
      next: () => {
        console.log('Order deleted successfully');
        this.loadPendingOrders(); // Refresh the list of pending orders after deletion
      },
      error: (error) => console.error('Error deleting order', error)
    });
  }
}
