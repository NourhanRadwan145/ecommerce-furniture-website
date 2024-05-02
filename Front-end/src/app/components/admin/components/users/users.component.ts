import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ViewUserComponent } from './view-user/view-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterModule, HttpClientModule, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  providers: [UserService],
})
export class UsersComponent {
  constructor(
    private myuserService: UserService,
    private dialog: MatDialog,
    private router: Router,
    private http: HttpClient
  ) {}

  users: any;
  userId: any;
  ngOnInit() {
    this.myuserService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  deleteUser(id: any) {
    this.myuserService.deleteUser(id).subscribe((data) => {
      console.log(data);
      this.users = this.users.filter((user: any) => user.id !== id);
      Swal.fire({
        icon: 'success',
        title: 'User was Deleted successfully',
      }).then(() => {
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['/admin/users']);
          });
      });
    });
    this.router.navigate(['/admin/users']);
  }

  editUser(id: any) {
    this.myuserService.getUserById(id).subscribe((data) => {
      const user = data;
      this.dialog.open(EditUserComponent, {
        width: '500px',
        data: {
          userFromParent: user,
        },
      });
    });
  }

  createUser() {
    this.dialog.open(CreateUserComponent, {
      width: '500px',
    });
  }

  viewUser(id: any) {
    this.myuserService.getUserById(id).subscribe((data) => {
      const user = data;

      this.dialog.open(ViewUserComponent, {
        width: '500px',
        data: {
          userFromParent: user,
        },
      });
    });
  }
  logout(): void {
    this.http
      .post(
        'http://localhost:7000/api/users/user/logout',
        {},
        { withCredentials: true }
      )
      .subscribe({
        complete: () => this.router.navigate(['/login']),
      });
  }
}
