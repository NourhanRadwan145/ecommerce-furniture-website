import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  message: string = "";

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.authProducts()

  }

  
  authProducts(){
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
        else if(response.data.isAdmin == false){
          this.message = `User Logged In Successfully ${JSON.stringify(response.data)}`;
        }
        // console.log("User Logged In Successfully", response);
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
