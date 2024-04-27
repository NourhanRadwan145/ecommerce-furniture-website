import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private readonly myClient: HttpClient) { }
  private readonly URL_API = "http://localhost:7000/api/users";


  getUserById(id: string) {
    const url = `${this.URL_API}/${id}`;
    return this.myClient.get<any>(url);
  }

  updateUser(id: string, userData: any){
    const url = `${this.URL_API}/${id}`;
    console.log(userData);
    return this.myClient.patch(url, userData);
  }
}
