import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AllProductsGuard implements CanActivate {

  constructor(private http: HttpClient, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.http.get<any>("http://localhost:7000/api/users/user/user", { withCredentials: true })
      .pipe(
        map(response => {
          if (!response.data) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: "You Need To Login First!",
            });
            this.router.navigate(['/login']);
            return false;
          }
          else{
            return true;
          }
        }),
        catchError(error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You Need To Login First!',
          });
          this.router.navigate(['/login']);
          return of(false);
        })
      );
  }
}
