import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';
import { CommonModule } from '@angular/common';
import { OrderServiceService } from '../../../../services/order-service.service';

@Component({
  selector: 'app-accepted-orders',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [OrderServiceService],
  templateUrl: './accepted-orders.component.html',
  styleUrls: ['./accepted-orders.component.css'] // Corrected to 'styleUrls'
})
export class AcceptedOrdersComponent implements OnInit {
  acceptedOrders: any[] = [];
  id:any;

  constructor(
    private orderService: OrderServiceService,
    private matDialog: MatDialog,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.authSingleProducts();

  }

  loadAcceptedOrders() {
    const userId = this.id;
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

  authSingleProducts(){
    this.http.get<any>("http://localhost:7000/api/users/user/user", { withCredentials: true })
    .subscribe({
      next: (response) => {
          this.id = response.data._id;
          console.log(this.id);
          this.loadAcceptedOrders();
      },
      error: (error) => {
      }
    });
  }

}
