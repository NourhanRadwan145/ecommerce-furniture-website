import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(private http: HttpClient, private router: Router) { }

  // -------------------------------------- logout function --------------------------------------------
  logout() : void{
    this.http.post("http://localhost:7000/api/users/user/logout", {},{ withCredentials: true }).subscribe({
      complete:()=> this.router.navigate(["/login"])
    })
  }
  // ---------------------------------------------------------------------------------------------------

}
