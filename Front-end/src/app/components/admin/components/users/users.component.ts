import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ViewUserComponent } from './view-user/view-user.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterModule, HttpClientModule, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  providers: [UserService],
})
export class UsersComponent {
  constructor(private myuserService: UserService, private dialog: MatDialog) {}

  users: any;
  ngOnInit() {
    this.myuserService.getUsers().subscribe((data) => {
      this.users = data;
      console.log(this.users);
    });
  }

  deleteUser(id: any) {
    this.myuserService.deleteUser(id).subscribe((data) => {
      console.log(data);
      this.users = this.users.filter((user: any) => user.id !== id);
    });
  }

  editUser(id: any) {
    this.myuserService.getUserById(id).subscribe((data) => {
      const user = data;
      console.log(user);
    });
  }

  createUser() {}

  viewUser(id: any) {
    this.myuserService.getUserById(id).subscribe((data) => {
      const user = data;
      console.log(user);

      this.dialog.open(ViewUserComponent, {
        width: '500px',
        data: {
          userFromParent: user,
        },
      });
    });
  }
}
