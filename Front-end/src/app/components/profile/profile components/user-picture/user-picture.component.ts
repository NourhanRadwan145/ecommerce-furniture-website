import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../../services/user-service.service';

@Component({
  selector: 'app-user-picture',
  standalone: true,
  imports: [HttpClientModule],
  providers:[UserServiceService],
  templateUrl: './user-picture.component.html',
  styleUrl: './user-picture.component.css'
})
export class UserPictureComponent implements OnInit{
  userInfo: any;
  id:any;
  image:any;
  constructor(private userService: UserServiceService,private http: HttpClient){} // Corrected the naming of matDialog


  ngOnInit() {
    this.authSingleProducts(); // Now this will call loadUserInfo() after completing.
  }

  // loadUserInfo() {
  //   if (!this.id) {
  //     console.error('User ID is undefined.');
  //     return;
  //   }
  //   this.userService.getUserById(this.id).subscribe({
  //     next: (data) => {
  //       this.userInfo = data;
  //       console.log('User Info:', this.userInfo);
  //     },
  //     error: (error) => console.error('Error fetching user info', error)
  //   });
  // }

  authSingleProducts(){
    this.http.get<any>("http://localhost:7000/api/users/user/user", { withCredentials: true })
    .subscribe({
      next: (response) => {
          this.id = response.data._id;
          this.image=response.data.image;
          this.userInfo=response.data;
          console.log('User Info:', this.userInfo);
      },
      error: (error) => {
          console.error('Error fetching user data', error);
      }
    });
  }



}
