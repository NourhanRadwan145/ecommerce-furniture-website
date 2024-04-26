import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) { }

  checkUserAuthorization() {
    this.http.get("http://localhost:7000/api/users/user/user", { withCredentials: true })
  }
}
