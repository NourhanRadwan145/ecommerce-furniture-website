import { Component, Inject } from '@angular/core';
import { UserService } from '../../../Services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css',
  providers: [UserService],
})
export class CreateUserComponent {
  user: any;
  count: number = 0;
  users: any;
  newUserId: any;
  createForm: any;
  imageFile: File | null = null;
  constructor(
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialogRef<any>,
    private router: Router
  ) {}

  ngOnInit() {
    this.createForm = new FormGroup({
      username: new FormControl(''),
      email: new FormControl(''),
      gender: new FormControl(''),
      password: new FormControl(''),
      passwordConfirmation: new FormControl(''),
    });
  }
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file.name);
      this.imageFile = file;
      // Handle the file here. You can add it to a FormData object if you're sending it to a server.
    }
  }
  sumbitForm() {
    this.user = new FormData();
    this.user.append('username', this.createForm.value.username);
    this.user.append('email', this.createForm.value.email);
    this.user.append('image', this.imageFile);
    this.user.append('gender', this.createForm.value.gender);
    this.user.append('password', this.createForm.value.password);
    console.log(this.user); // id is undefunded

    this.userService.createUser(this.user).subscribe((data) => {
      console.log(data); // id has a random value now
      this.dialog.close();
      // Alert the user that the user has been added successfully
      Swal.fire({
        icon: 'success',
        title: 'Your review added successfully',
      }).then(() => {
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['/admin/users']);
          });
      }),
        (error: any) => {
          // Explicitly specify the type of 'error' as 'any'
          console.log(error);
        };
    });
  }
}
