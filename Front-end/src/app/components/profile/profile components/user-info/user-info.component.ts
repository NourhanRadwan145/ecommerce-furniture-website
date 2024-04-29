import { Component, OnInit } from '@angular/core';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialog } from '@angular/material/dialog'; // Import MatDialog here
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserServiceService } from '../../../../services/user-service.service';


@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule,

  ],
  providers:[UserServiceService],
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'] // Correct styleUrl to styleUrls
})
export class UserInfoComponent implements OnInit{
  userInfo: any;
  id:any;
  constructor(private matDialog: MatDialog,private userService: UserServiceService,private http: HttpClient){} // Corrected the naming of matDialog


  ngOnInit() {
    this.authSingleProducts();
  }

  // loadUserInfo() {
  //   const userId =this.id; // Replace with actual logic to obtain user ID
  //   this.userService.getUserById(userId).subscribe({
  //     next: (data) => {
  //       this.userInfo = data;
  //       console.log('User Info:', this.userInfo);
  //     },
  //     error: (error) => console.error('Error fetching pending orders', error)
  //   });
  // }


  openDialog(){
    this.matDialog.open(InfoDialogComponent, { // Use the open method of MatDialog
      width: '1200px', height: '650px'
    });
  }

  authSingleProducts(){
    this.http.get<any>("http://localhost:7000/api/users/user/user", { withCredentials: true })
    .subscribe({
      next: (response) => {
          this.id = response.data._id;
          this.userInfo=response.data;
      },
      error: (error) => {


      }
    });
  }
}
