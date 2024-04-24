import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  URL_DB = 'http://localhost:7000/api/users';

  getUsers() {
    return this.http.get(this.URL_DB);
  }

  getUserById(id: any) {
    return this.http.get(`${this.URL_DB}/${id}`);
  }

}
