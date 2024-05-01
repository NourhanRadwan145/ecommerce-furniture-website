import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { OrderServiceService } from '../../../../Services/order-service.service';
import { UserServiceService } from '../../../../Services/user-service.service';

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
  providers: [UserServiceService, OrderServiceService]
})
export class InfoDialogComponent implements OnInit {
  personalInfoForm!: FormGroup;
  selectedFile: File | null = null;
  userInfo:any;
  password:any;
  hidePassword: boolean = true; // Keeps track of whether the password is hidden or not
  id:any;
  imageUrl: any;
  showIcon: string = '../../../../../assets/visibility-icon-16.jpg';
  hideIcon: string = '../../../../../assets/visible-icon-28.jpg';
  imageFile: File| null=null;





  constructor(
    private fb: FormBuilder,
    private userService: UserServiceService,
    private router: Router,
    private dialog:MatDialog,
    private http: HttpClient,
    private orderService: OrderServiceService
) {}


passwordMatchValidator(frm: FormGroup) {
  return frm.controls['password'].value === frm.controls['confirmPassword'].value
         ? null : {'mismatch': true};
}
  ngOnInit() {
    this.authSingleProducts();
    this.personalInfoForm = this.fb.group({
      fullName: ['', Validators.required],  // Ensure validators are properly set
      email: ['', [Validators.required, Validators.email]],
      image: [''],
      password: ['',Validators.minLength(8)],
      confirmPassword: ['']}, { validator: this.passwordMatchValidator }
  );
    //this.loadUserInfo();
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  // loadUserInfo() {
  //   this.userService.getUserById(this.id).subscribe({
  //     next: (data) => {
  //       this.userInfo = data;
  //       // Use patchValue to update form values
  //       this.personalInfoForm.patchValue({
  //         fullName: data.username, // assuming 'username' is the correct field
  //         email: data.email,
  //         image: data.image,
  //         //password: data.password
  //       });
  //     },
  //     error: (error) => console.error('Error fetching user info', error)
  //   });
  // }



  authSingleProducts(){
    this.http.get<any>("http://localhost:7000/api/users/user/user", { withCredentials: true })
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
      error: (error) => {
      }
    });
  }

  onFileSelected(event: Event): void {
    const element = event.target as HTMLInputElement;
    if (element.files && element.files.length) {
      const file = element.files[0];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.imageUrl = e.target?.result;  // This is now the data URL
      };
      reader.readAsDataURL(file); // Reads the file as a data URL
    }
  }



  // onFileSelected(event: Event) {
  //   const element = event.target as HTMLInputElement;
  //   if (element.files && element.files.length) {
  //     this.selectedFile = element.files[0];
  //     this.name = this.selectedFile.name;
  //     console.log('Selected file:', this.name);
  //   }
  // }
  // onFileSelected(event: any) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     console.log(file.name);
  //     this.imageFile = file;
  //     // Handle the file here. You can add it to a FormData object if you're sending it to a server.
  //   }
  // }
  updateUser() {
    if (this.personalInfoForm.valid) {
      const updatePayload = {
        username: this.personalInfoForm.value.fullName,
        email: this.personalInfoForm.value.email,
        image: this.imageUrl,
        password: this.personalInfoForm.value.password ? this.personalInfoForm.value.password : this.password,

      };

      const updatedName = {username:this.personalInfoForm.value.fullName};
      console.log('Form Data:', updatePayload);
      this.userService.updateUser(this.id, updatePayload).subscribe({
        next: (response:any) => {
          console.log('Update successful', response);
          this.dialog.closeAll();
          this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/profile']);  // Navigate back to the profile
          });;
        },
        error: (error:any) => {
          console.error('Failed to update user:', error);
        }
      });
    } else {
      console.error('Form is not valid');
    }
  }


}
