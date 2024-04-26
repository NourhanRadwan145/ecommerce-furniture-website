import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient){}

  ngOnInit(): void {

    this.authCart()
    
  }

  authCart(){
    this.http.get<any>("http://localhost:7000/api/users/user/user", { withCredentials: true })
    .subscribe({
      next: (response) => {
        if(response.data.isAdmin == true){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You Must Login As A User Not Admin!',
          });
          this.router.navigate(['/login']);
        }
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'You Need To Login First!',
        });
        this.router.navigate(['/login']);
      }
    });
  }

}
