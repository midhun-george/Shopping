import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  url='http://localhost:5001/users';
  getUsers():Observable<any>{
    return this.http.get(this.url);
  }
}
