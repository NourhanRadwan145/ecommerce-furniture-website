import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { OrderServiceService } from '../../../../Services/order-service.service';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../../../../Services/user-service.service';

@Component({
  selector: 'app-rejected-orders',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [
    OrderServiceService,UserServiceService
  ],
  templateUrl: './rejected-orders.component.html',
  styleUrls: ['./rejected-orders.component.css']
})
export class RejectedOrdersComponent implements OnInit {
  rejectedOrders: any[] = [];
  id:any;

  constructor(
    private user:UserServiceService,
    private orderService: OrderServiceService,
    private matDialog: MatDialog,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.authSingleProducts();

  }

  loadRejectedOrders() {
    const userId = this.id; // Replace 'your-user-id' with actual user ID
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

  authSingleProducts(){
    this.http.get<any>("http://localhost:7000/api/users/user/user", { withCredentials: true })
    .subscribe({
      next: (response) => {
          this.id = response.data._id;
          console.log(this.id);
          console.log(response.data._id);
          this.loadRejectedOrders();
      },
      error: (error) => {
      }
    });
  }

}
