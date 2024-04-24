import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { Validators } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      gender: ''
    });
  }

  submit() {
    let user = this.form.getRawValue();
    const emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (user.username.length < 3) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Username must be at least 3 characters long!',
      });
      return;
    } else if (!emailRegex.test(user.email)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid email!',
      });
      return;
    } else if (user.password !== user.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Passwords do not match!',
      });
      return;
    } else if (user.password.length < 8) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password must be at least 8 characters long!',
      });
      return;
    } else if (
      !user.gender ||
      !['male', 'female'].includes(user.gender.toLowerCase())
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Gender must be 'male' or 'female'!",
      });
      return;
    }
    this.http.post('http://localhost:7000/api/users/register', user, 
    {
        withCredentials: true,
      })
      .subscribe({complete: () => this.router.navigate(['/products']), error: (err) => {
        Swal.fire("Error", err.error.message, "error")}

      });
  }
}
