import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { OrderServiceService } from '../../../../Services/order-service.service';
//import { HomeProductService } from '../../../../Services/home-product.service';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';
import { HomeProductService } from '../../../../Services/home-product.service';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../../../../services/user-service.service';

@Component({
  selector: 'app-pending-orders',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [OrderServiceService, HomeProductService,UserServiceService],
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.css'] // Corrected to 'styleUrls'
})
export class PendingOrdersComponent implements OnInit {
  pendingOrders: any[] = [];
  orders: any[] = [];
  updatedOrders: any[] = [];
  orderAfterDelete:any[]=[];

  id:any;
  updatedUserInfo:any;


  constructor(
    private orderService: OrderServiceService,
    private matDialog: MatDialog,
    private http: HttpClient,
    private usersSerive:UserServiceService
  ) {}

  ngOnInit() {
    this.authSingleProducts();
  }

  // loadPendingOrders() {
  //   const userId =this.id; // Replace with actual logic to obtain user ID
  //   this.orderService.getPendingOrders(userId).subscribe({
  //     next: (orders) => {
  //       this.pendingOrders = orders;
  //       console.log('Pending Orders:', this.pendingOrders);
  //     },
  //     error: (error) => console.error('Error fetching pending orders', error)
  //   });
  // }

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
          this.orders=response.data.orders;
          console.log('Order Info before:', this.orders);
          console.log(this.id);
          this.loadPendingOrders();
          //response.data.orders=this.updatedOrders;
      },
      error: (error) => {
      }
    });
  }

  deleteOrder(orderId: string): void {
    this.orderService.deleteOrderById(orderId).subscribe({
      next: (data) => {
        console.log('Order deleted successfully:', data);
        // Refresh orders from the server to ensure we are operating on the most current data
        this.loadPendingOrders(() => {
          // Ensure this function only executes after orders have been refreshed
          const updatedOrders = this.orders.filter(order => order !== orderId);
          console.log('Orders after delete:', updatedOrders);
          this.usersSerive.updateUser(this.id, { orders: updatedOrders }).subscribe({
            next: (userData) => {
              this.orders = updatedOrders; // Ensure the main orders array is updated.
              this.updatedUserInfo = userData;
              console.log('User Info updated:', this.updatedUserInfo);
            },
            error: (error) => console.error('Error updating user info', error)
          });
        });
      },
      error: (error) => console.error('Error deleting order', error)
    });
  }

  loadPendingOrders(callback?: Function) {
    const userId = this.id;
    this.orderService.getPendingOrders(userId).subscribe({
      next: (orders) => {
        this.pendingOrders = orders;
        //this.orders = orders; // Assuming this should also refresh the main orders array
        console.log('Pending Orders:', this.pendingOrders);
        if (callback) callback(); // Call the callback if provided
      },
      error: (error) => console.error('Error fetching pending orders', error)
    });
  }

}
