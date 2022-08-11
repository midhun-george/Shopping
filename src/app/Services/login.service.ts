import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  url='http://localhost:5001/users';
  getUsers():Observable<any>{
    return this.http.get(this.url);
  }

  addUser(user): Observable<any> {
    return this.http.post(this.url, user);
  }
}
