import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../../Services/user-service.service';

@Component({
  selector: 'app-user-picture',
  standalone: true,
  imports: [HttpClientModule],
  providers:[UserServiceService],
  templateUrl: './user-picture.component.html',
  styleUrl: './user-picture.component.css'
})
export class UserPictureComponent implements OnInit{
  userInfo: any;;
  constructor(private userService: UserServiceService){} // Corrected the naming of matDialog


  ngOnInit() {
    this.loadUserInfo();
  }

  loadUserInfo() {
    const userId ="662c061826005f17952ca8f7"; // Replace with actual logic to obtain user ID
    this.userService.getUserById(userId).subscribe({
      next: (data) => {
        this.userInfo = data;
        console.log('User Info:', this.userInfo);
      },
      error: (error) => console.error('Error fetching pending orders', error)
    });
  }



}
