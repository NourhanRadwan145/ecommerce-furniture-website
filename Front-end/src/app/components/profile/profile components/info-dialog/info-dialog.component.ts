import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { UserServiceService } from '../../../../services/user-service.service';
import { OrderServiceService } from '../../../../services/order-service.service';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  providers: [UserServiceService, OrderServiceService],
})
export class InfoDialogComponent implements OnInit {
  personalInfoForm!: FormGroup;
  selectedFile: File | null = null;
  userInfo: any;
  password: any;
  hidePassword: boolean = true; // Keeps track of whether the password is hidden or not
  id: any;
  imageUrl: any;
  showIcon: string = '../../../../../assets/visibility-icon-16.jpg';
  hideIcon: string = '../../../../../assets/visible-icon-28.jpg';
  imageFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserServiceService,
    private router: Router,
    private dialog: MatDialog,
    private http: HttpClient,
    private orderService: OrderServiceService
  ) {}

  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['password'].value ===
      frm.controls['confirmPassword'].value
      ? null
      : { mismatch: true };
  }
  ngOnInit() {
    this.authSingleProducts();
    this.personalInfoForm = this.fb.group(
      {
        fullName: ['', Validators.required], // Ensure validators are properly set
        email: ['', [Validators.required, Validators.email]],
        image: [''],
        password: [''],
        confirmPassword: [''],
      },
      { validator: this.passwordMatchValidator }
    );
    //this.loadUserInfo();
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  authSingleProducts() {
    this.http
      .get<any>('http://localhost:7000/api/users/user/user', {
        withCredentials: true,
      })
      .subscribe({
        next: (response) => {
          this.id = response.data._id;
          console.log(this.id);
          this.userInfo = response.data;
          this.password = response.data.password;
          // Use patchValue to update form values
          this.personalInfoForm.patchValue({
            fullName: response.data.username, // assuming 'username' is the correct field
            email: response.data.email,
            image: response.data.image,
            //password: data.password
          });
        },
        error: (error) => {},
      });
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file.name);
      this.imageFile = file;
      console.log(this.imageFile);

      // Handle the file here. You can add it to a FormData object if you're sending it to a server.
    }
  }

  updateUser() {
    if (this.personalInfoForm.valid) {
      // Creating a FormData object to send the data
      const updatePayload = new FormData();
      updatePayload.append('username', this.personalInfoForm.value.fullName);
      updatePayload.append('email', this.personalInfoForm.value.email);
      if (this.personalInfoForm.value.password) {
        updatePayload.append('password', this.personalInfoForm.value.password);
      }
      if (this.imageFile) {
        updatePayload.append('image', this.imageFile);
      }
      //
      const updatedName = { username: this.personalInfoForm.value.fullName };
      console.log('Form Data:', updatePayload.get('username'));
      console.log('Form Data:', updatePayload.get('email'));
      console.log('Form Data:', updatePayload.get('password'));
      console.log('Form Data:', updatePayload.get('image'));

      // Passing the id and the updatePayload to the service
      this.userService.updateUser(this.id, updatePayload).subscribe({
        next: (response: any) => {
          console.log('Update successful', response);
          this.dialog.closeAll();
          this.router
            .navigateByUrl('/home', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/profile']); // Navigate back to the profile
            });
        },
        error: (error: any) => {
          console.error('Failed to update user:', error);
        },
      });
    } else {
      console.error('Form is not valid');
    }
  }
}
