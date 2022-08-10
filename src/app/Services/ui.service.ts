import { Injectable } from '@angular/core';
import {Subject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor() { }
  subject = new Subject();
  showHideAdd(t){
    
    this.subject.next(t)

  }
  getShowHideVal(){
    
    return this.subject.asObservable();
  }
}
