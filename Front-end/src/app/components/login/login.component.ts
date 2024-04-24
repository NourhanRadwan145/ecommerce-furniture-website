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
    this.form = this.formBuilder.group({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      gender: ''
    });
  }


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
    this.http.post('http://localhost:7000/api/users/login', user, 
    {
        withCredentials: true,
      })
      .subscribe( {complete: () => this.router.navigate(['/products']), error: (err) => {
        Swal.fire("Error", err.error.message, "error")}

      });
  }

}
