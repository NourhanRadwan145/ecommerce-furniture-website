import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  form:FormGroup
  constructor(private http: HttpClient, private formBuilder: FormBuilder, private router: Router){}

  ngOnInit() {
    // this.checkLogin();
    this.form = this.formBuilder.group({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      gender: ''
    });
  }

// ----------------------------- Login function --------------------------------  
  login() {
    let user = this.form.getRawValue();
    const emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!emailRegex.test(user.email)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid email!',
      });
      return;
    } else if (user.password.length < 8) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password must be at least 8 characters long!',
      });
      return;
    } 
    this.http.post<any>('http://localhost:7000/api/users/login', user, { withCredentials: true })
      .subscribe({ next:(response) => {
          let loggedInUser = response.user;
          if(loggedInUser && loggedInUser.isAdmin == true){
            Swal.fire({
              icon: 'success',
              title: `Welcome ${loggedInUser.username}!`,
              text: 'You are logged in successfully!',
            })
            this.router.navigate(['/admin']);
          }
          else if(loggedInUser && loggedInUser.isAdmin == false){
            Swal.fire({
              icon: 'success',
              title: `Welcome ${loggedInUser.username}!`,
              text: 'You are logged in successfully!',
            })
            this.router.navigate(['/home']);
          }

        },
        error:(error) => {
          Swal.fire("Error", error.error.message, "error");
        }
  });
  }
// ----------------------------- Check if user is already logged in --------------------------------
  checkLogin(){
    this.http.get<any>('http://localhost:7000/api/users/user/user', { withCredentials: true }).subscribe({
      next: (response) => {
        if(response.data){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You Are Already Logged In!',  
          })
          this.router.navigate(['/home']);
        }
        else{
          this.router.navigate(['/login']);
        }
      }
    })
  }
}
