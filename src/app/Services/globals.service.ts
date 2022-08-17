import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  userDetails: any;
  isSignedIn: boolean;
  showLoader = true;
  constructor(private router:Router) { }


logout(){
  localStorage.removeItem("token");
  this.router.navigate(['/'])
}

}