import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
// import { OrderServiceService } from '../../../../Services/order-service.service';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';
import { OrderServiceService } from '../../../../services/order-service.service';

@Component({
  selector: 'app-rejected-orders',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [
    OrderServiceService
  ],
  templateUrl: './rejected-orders.component.html',
  styleUrls: ['./rejected-orders.component.css'] // Corrected from 'styleUrl' to 'styleUrls'
})
export class RejectedOrdersComponent implements OnInit {
  rejectedOrders: any[] = [];

  constructor(private orderService: OrderServiceService, private matDialog: MatDialog) {}

  ngOnInit() {
    this.loadRejectedOrders(); // Corrected method name to reflect the actual function
  }

  loadRejectedOrders() {
    const userId = '662c061826005f17952ca8f7'; // Replace 'your-user-id' with actual user ID
    this.orderService.getRejectedOrders(userId).subscribe({
      next: (orders) => {
        this.rejectedOrders = orders;
        console.log('Rejected Orders:', this.rejectedOrders);
      },
      error: (error) => console.error('Error fetching rejected orders', error)
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
}
