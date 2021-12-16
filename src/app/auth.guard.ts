import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginService } from './services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;

  constructor(private loginService: LoginService, private router: Router) {}  
  // canActivate(): boolean 
  // {  
  //   if (!this.authservice.gettoken()) {  
  //       this.router.navigateByUrl("/login");  
  //   }  
  //   return this.authservice.gettoken();
  // }

  canActivate(): boolean {
    if (!this.loginService.getAuthStatus()) {
      this.router.navigate(['/login'])
    }
    return true;
  }
  
}
