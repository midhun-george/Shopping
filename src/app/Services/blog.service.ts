import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http:HttpClient) { }
  url='http://localhost:5001/blogs';
  getBlogs():Observable<any>{
    return this.http.get(this.url);
  }

  addBlogs(blog): Observable<any> {
    return this.http.post(this.url, blog);
  }

  updateBlog(blog):Observable<any>{
    const url = `${this.url}/${blog.id}`;
    return this.http.put<Task>(url, blog);
  }
  deleteBlog(blog):Observable<any>{
    const url = `${this.url}/${blog.id}`;
    return this.http.delete(url);
  }

}
