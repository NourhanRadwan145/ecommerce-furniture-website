import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_URL = 'http://localhost:7000/api/users';
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(this.API_URL);
  }

  getUserById(id: string) {
    return this.http.get(this.API_URL + `/${id}`);
  }

  createUser(user: any) {
    return this.http.post(this.API_URL, user);
  }

  updateUser(user: any) {
    return this.http.put(this.API_URL + `/${user._id}`, user);
  }

  deleteUser(id: string) {
    return this.http.delete(this.API_URL + `/${id}`);
  }
}
