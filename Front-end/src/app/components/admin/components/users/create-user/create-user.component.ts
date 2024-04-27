import { Component, Inject } from '@angular/core';
import { UserService } from '../../../Services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

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
  constructor(
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialogRef<any>,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((data) => {
      this.users = Object.values(data);
      this.count = this.users.length;
      this.newUserId = String(this.count + 1);
      console.log(this.newUserId);

      this.createForm = new FormGroup({
        id: new FormControl({ value: this.newUserId, disabled: true }),
        username: new FormControl(''),
        email: new FormControl(''),
        password: new FormControl(''),
        passwordConfirmation: new FormControl(''),
      });
    });
    this.createForm = new FormGroup({
      id: new FormControl({ value: this.newUserId, disabled: true }),
      username: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      passwordConfirmation: new FormControl(''),
    });
  }

  sumbitForm() {
    this.user = {
      id: this.createForm.controls['id'].value,
      username: this.createForm.controls['username'].value,
      email: this.createForm.controls['email'].value,
      password: this.createForm.controls['password'].value,
      image: this.createForm.controls['passwordConfirmation'].value,
    };
    console.log(this.user); // id is undefunded

    this.userService.createUser(this.user).subscribe(
      (data) => {
        console.log(data); // id has a random value now
        this.dialog.close();
        this.router.navigate(['/admin/users']);
      },
      (error) => {
        // Explicitly specify the type of 'error' as 'any'
        console.log(error);
      }
    );
  }
}
