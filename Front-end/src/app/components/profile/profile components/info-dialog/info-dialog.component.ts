import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserServiceService } from '../../../../Services/user-service.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [UserServiceService]
})
export class InfoDialogComponent implements OnInit {
  personalInfoForm!: FormGroup;
  selectedFile: File | null = null;
  userInfo:any;
  name:any;
  userId = "662c061826005f17952ca8f7";

  constructor(
    private fb: FormBuilder,
    private userService: UserServiceService,
    private router: Router,
    private dialog:MatDialog
) {}

  ngOnInit() {
    this.personalInfoForm = this.fb.group({
      fullName: ['', Validators.required],  // Ensure validators are properly set
      email: ['', [Validators.required, Validators.email]],
      image: ['', Validators.required]
    });
    this.loadUserInfo();
  }

  loadUserInfo() {
    this.userService.getUserById(this.userId).subscribe({
      next: (data) => {
        this.userInfo = data;
        // Use patchValue to update form values
        this.personalInfoForm.patchValue({
          fullName: data.username, // assuming 'username' is the correct field
          email: data.email,
          image: data.image
        });
      },
      error: (error) => console.error('Error fetching user info', error)
    });
  }






  // onFileSelected(event: Event) {
  //   const element = event.target as HTMLInputElement;
  //   if (element.files && element.files.length) {
  //     this.selectedFile = element.files[0];
  //     this.name = this.selectedFile.name;
  //   }
  // }

  updateUser() {
    if (this.personalInfoForm.valid) {
      const updatePayload = {
        username: this.personalInfoForm.value.fullName,
        email: this.personalInfoForm.value.email,
        image: this.personalInfoForm.value.image
      };

      console.log('Form Data:', updatePayload);
      this.userService.updateUser(this.userId, updatePayload).subscribe({
        next: (response) => {
          console.log('Update successful', response);
          this.dialog.closeAll();
          this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/profile']);  // Navigate back to the profile
          });;
          //.router.navigate(['/profile']);
        },
        error: (error) => {
          console.error('Failed to update user:', error);
        }
      });
    } else {
      console.error('Form is not valid');
    }
  }


}
