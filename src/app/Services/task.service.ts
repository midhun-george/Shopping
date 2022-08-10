import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../Task';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  constructor(private http:HttpClient) { }
  url='http://localhost:5001/tasks';
  getTasks():Observable<Task[]>{
    return this.http.get<Task[]>(this.url);
  }

  updateReminder(task:Task):Observable<Task>{
    const url = `${this.url}/${task.id}`;
    
    return this.http.put<Task>(url, task, httpOptions);
  }
  deleteTask(task:Task):Observable<Task>{
    const url = `${this.url}/${task.id}`;
    return this.http.delete<Task>(url);
  }
  
  addTask(task: Task): Observable<Task> {
    
    return this.http.post<Task>(this.url, task, httpOptions);
  }
}
