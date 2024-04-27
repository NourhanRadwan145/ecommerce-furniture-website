import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',
  providers: [UserService],
})
export class EditUserComponent {
  user: any;
  editForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    passwordConfirm: new FormControl(''),
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private dialogRef: MatDialogRef<any>,
    private router: Router
  ) {
    console.log(data.userFromParent);
    this.user = data.userFromParent;

    // Set default values for form controls based on product data
    this.editForm.patchValue({
      username: this.user.username,
      email: this.user.email,
      password: this.user.password,
      passwordConfirm: null,
    });
  }

  editFormSubmit() {
    const editedUser = {
      id: this.user.id,
      username: this.editForm.controls['username'].value,
      email: this.editForm.controls['email'].value,
      password: this.user.password,
    };

    this.userService.updateUser(editedUser).subscribe((data) => {
      console.log(data);
      // After successfully updating the user, navigate to the same route
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/admin/users']);
      });
    });

    this.dialogRef.close();
  }
}
