import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService} from './auth.service';
const ENUM_RESTRICTED_ROUTES = ['user', 'partnerdashboard', 'airTMDDashboard'];

const PermissionMap = {
  "admin": [0, 1, 2],
  "user": [1, 2],
 
};
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router:Router){}
  canActivate(){
    if(this.auth.IsLoggedIn()){
      return true;
    }else{
      this.router.navigate(['login']);
      return false;
      
    } 
   
  }
  
}

@Injectable({
  providedIn: 'root'
})


export class RoleGuard implements CanActivate {
  constructor( private route: Router, private auth: AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot, ): boolean {
    let isAllowed = -1;
    try {
      //let user = this.auth.IsAllowed();
      //console.log(user);
      debugger;
      let navigateTo = state.url.replace('/', '');
      let routeIndex = ENUM_RESTRICTED_ROUTES.indexOf(navigateTo);
      let user = JSON.parse(localStorage.getItem("token")).role;

      isAllowed = PermissionMap[user].findIndex(function(val){
        return val == routeIndex
      });
      if(isAllowed>-1){
        return true;
      }else{
        alert("Sorry.., you don't have permission to view this page!")
        return false;
      }
      
    }
    catch (e) {
      return false;
    }
  }
}

@Injectable({
  providedIn:'root'
})

export class LoginGuard implements CanActivate {
  constructor(private auth: AuthService, private router:Router){}
  canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean {
      // redirect logic goes here
      let user = JSON.parse(localStorage.getItem("token"))
      if(user){
        this.router.navigate(['header']);
        return false
      }else{
        return true;
      }
  }
}